<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\CloudinaryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function __construct(
        private CloudinaryService $cloudinaryService
    ) {}

    /**
     * Upload vehicle images.
     */
    public function uploadVehicleImages(Request $request): JsonResponse
    {
        $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'images' => ['required', 'array', 'max:10'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'], // Max 5MB
        ]);

        $results = [];
        $vehicleId = $request->vehicle_id;
        
        foreach ($request->file('images') as $file) {
            $result = $this->cloudinaryService->uploadVehicleImage($file, $vehicleId);
            $results[] = $result;
        }

        $successful = collect($results)->where('success', true);
        $failed = collect($results)->where('success', false);

        return response()->json([
            'message' => 'Upload terminé',
            'uploaded_count' => $successful->count(),
            'failed_count' => $failed->count(),
            'images' => $successful->toArray(),
            'errors' => $failed->pluck('error')->toArray(),
        ], $failed->isEmpty() ? 200 : 207); // 207 Multi-Status if some failed
    }

    /**
     * Upload user avatar.
     */
    public function uploadUserAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], // Max 2MB
        ]);

        $user = $request->user();
        $result = $this->cloudinaryService->uploadUserAvatar($request->file('avatar'), $user->id);

        if (!$result['success']) {
            return response()->json([
                'message' => 'Erreur lors de l\'upload de l\'avatar',
                'error' => $result['error'],
            ], 500);
        }

        // Update user avatar URL in database
        $user->update([
            'avatar_url' => $result['url'],
            'avatar_thumbnail_url' => $result['thumbnail_url'],
        ]);

        return response()->json([
            'message' => 'Avatar mis à jour avec succès',
            'avatar' => [
                'url' => $result['url'],
                'thumbnail_url' => $result['thumbnail_url'],
                'public_id' => $result['public_id'],
            ],
        ]);
    }

    /**
     * Upload general images.
     */
    public function uploadImages(Request $request): JsonResponse
    {
        $request->validate([
            'images' => ['required', 'array', 'max:5'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:3072'], // Max 3MB
            'folder' => ['nullable', 'string', 'max:50'],
        ]);

        $folder = $request->get('folder', 'senerentcar/general');
        $results = $this->cloudinaryService->uploadMultipleImages($request->file('images'), $folder);

        $successful = collect($results)->where('success', true);
        $failed = collect($results)->where('success', false);

        return response()->json([
            'message' => 'Upload terminé',
            'uploaded_count' => $successful->count(),
            'failed_count' => $failed->count(),
            'images' => $successful->toArray(),
            'errors' => $failed->pluck('error')->toArray(),
        ], $failed->isEmpty() ? 200 : 207);
    }

    /**
     * Delete an image from Cloudinary.
     */
    public function deleteImage(Request $request): JsonResponse
    {
        $request->validate([
            'public_id' => ['required', 'string'],
        ]);

        $deleted = $this->cloudinaryService->deleteImage($request->public_id);

        if (!$deleted) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'image',
            ], 500);
        }

        return response()->json([
            'message' => 'Image supprimée avec succès',
        ]);
    }

    /**
     * Get image details.
     */
    public function getImageDetails(Request $request): JsonResponse
    {
        $request->validate([
            'public_id' => ['required', 'string'],
        ]);

        $details = $this->cloudinaryService->getImageDetails($request->public_id);

        if (!$details['success']) {
            return response()->json([
                'message' => 'Image non trouvée',
                'error' => $details['error'],
            ], 404);
        }

        return response()->json([
            'image' => $details,
        ]);
    }

    /**
     * Generate responsive image sizes.
     */
    public function getResponsiveSizes(Request $request): JsonResponse
    {
        $request->validate([
            'public_id' => ['required', 'string'],
        ]);

        $sizes = $this->cloudinaryService->generateResponsiveSizes($request->public_id);

        return response()->json([
            'responsive_urls' => $sizes,
        ]);
    }

    /**
     * Get optimized image URL with custom transformations.
     */
    public function getOptimizedUrl(Request $request): JsonResponse
    {
        $request->validate([
            'public_id' => ['required', 'string'],
            'width' => ['nullable', 'integer', 'min:50', 'max:2000'],
            'height' => ['nullable', 'integer', 'min:50', 'max:2000'],
            'quality' => ['nullable', 'in:auto:low,auto:good,auto:best,auto:eco'],
            'format' => ['nullable', 'in:webp,jpg,png,auto'],
            'crop' => ['nullable', 'in:fill,fit,scale,crop,thumb,pad'],
        ]);

        $transformations = array_filter([
            'width' => $request->width,
            'height' => $request->height,
            'quality' => $request->quality ?? 'auto:best',
            'format' => $request->format ?? 'webp',
            'crop' => $request->crop ?? 'fill',
        ]);

        $optimizedUrl = $this->cloudinaryService->getOptimizedUrl($request->public_id, $transformations);

        return response()->json([
            'optimized_url' => $optimizedUrl,
            'transformations' => $transformations,
        ]);
    }
}
