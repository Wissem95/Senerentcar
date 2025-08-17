<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;

class CloudinaryService
{
    /**
     * Upload an image to Cloudinary.
     */
    public function uploadImage(UploadedFile $file, string $folder = 'senerentcar'): array
    {
        try {
            $result = Cloudinary::upload($file->getRealPath(), [
                'folder' => $folder,
                'transformation' => [
                    'width' => 1200,
                    'height' => 800,
                    'crop' => 'fill',
                    'quality' => 'auto:best',
                    'format' => 'webp'
                ],
                'overwrite' => true,
                'unique_filename' => true,
            ]);

            return [
                'success' => true,
                'public_id' => $result->getPublicId(),
                'url' => $result->getSecurePath(),
                'width' => $result->getWidth(),
                'height' => $result->getHeight(),
                'format' => $result->getExtension(),
                'size' => $result->getSize(),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Upload multiple images to Cloudinary.
     */
    public function uploadMultipleImages(array $files, string $folder = 'senerentcar'): array
    {
        $results = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile && $file->isValid()) {
                $results[] = $this->uploadImage($file, $folder);
            }
        }

        return $results;
    }

    /**
     * Generate a thumbnail URL from Cloudinary.
     */
    public function generateThumbnail(string $publicId, int $width = 300, int $height = 200): string
    {
        return Cloudinary::getUrl($publicId, [
            'transformation' => [
                'width' => $width,
                'height' => $height,
                'crop' => 'fill',
                'quality' => 'auto:good',
                'format' => 'webp'
            ]
        ]);
    }

    /**
     * Generate various sizes for responsive images.
     */
    public function generateResponsiveSizes(string $publicId): array
    {
        $sizes = [
            'thumbnail' => ['width' => 300, 'height' => 200],
            'small' => ['width' => 600, 'height' => 400],
            'medium' => ['width' => 900, 'height' => 600],
            'large' => ['width' => 1200, 'height' => 800],
        ];

        $urls = [];
        
        foreach ($sizes as $size => $dimensions) {
            $urls[$size] = Cloudinary::getUrl($publicId, [
                'transformation' => [
                    'width' => $dimensions['width'],
                    'height' => $dimensions['height'],
                    'crop' => 'fill',
                    'quality' => 'auto:best',
                    'format' => 'webp'
                ]
            ]);
        }

        return $urls;
    }

    /**
     * Delete an image from Cloudinary.
     */
    public function deleteImage(string $publicId): bool
    {
        try {
            $result = Cloudinary::destroy($publicId);
            return $result['result'] === 'ok';
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get image details from Cloudinary.
     */
    public function getImageDetails(string $publicId): array
    {
        try {
            $result = Cloudinary::admin()->asset($publicId);
            
            return [
                'success' => true,
                'public_id' => $result['public_id'],
                'url' => $result['secure_url'],
                'width' => $result['width'],
                'height' => $result['height'],
                'format' => $result['format'],
                'size' => $result['bytes'],
                'created_at' => $result['created_at'],
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Generate optimized URL with transformations.
     */
    public function getOptimizedUrl(string $publicId, array $transformations = []): string
    {
        $defaultTransformations = [
            'quality' => 'auto:best',
            'format' => 'webp',
            'fetch_format' => 'auto',
        ];

        $transformations = array_merge($defaultTransformations, $transformations);

        return Cloudinary::getUrl($publicId, [
            'transformation' => $transformations
        ]);
    }

    /**
     * Upload vehicle images with specific transformations.
     */
    public function uploadVehicleImage(UploadedFile $file, string $vehicleId): array
    {
        return $this->uploadImage($file, "senerentcar/vehicles/{$vehicleId}");
    }

    /**
     * Upload user avatar with specific transformations.
     */
    public function uploadUserAvatar(UploadedFile $file, string $userId): array
    {
        try {
            $result = Cloudinary::upload($file->getRealPath(), [
                'folder' => "senerentcar/avatars/{$userId}",
                'transformation' => [
                    'width' => 400,
                    'height' => 400,
                    'crop' => 'fill',
                    'gravity' => 'face',
                    'quality' => 'auto:best',
                    'format' => 'webp'
                ],
                'overwrite' => true,
                'unique_filename' => false,
            ]);

            return [
                'success' => true,
                'public_id' => $result->getPublicId(),
                'url' => $result->getSecurePath(),
                'thumbnail_url' => $this->generateThumbnail($result->getPublicId(), 150, 150),
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}