<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(): JsonResponse
    {
        $categories = Category::withCount(['vehicles'])
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return response()->json([
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Store a newly created category (admin only).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:categories'],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'url'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Catégorie créée avec succès',
            'category' => new CategoryResource($category),
        ], 201);
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category): JsonResponse
    {
        $category->load(['vehicles' => function ($query) {
            $query->available()->limit(10);
        }]);

        return response()->json([
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified category (admin only).
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:100', 'unique:categories,name,' . $category->id],
            'description' => ['sometimes', 'nullable', 'string'],
            'image_url' => ['sometimes', 'nullable', 'url'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Catégorie mise à jour avec succès',
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Remove the specified category (admin only).
     */
    public function destroy(Category $category): JsonResponse
    {
        if ($category->vehicles()->count() > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer une catégorie contenant des véhicules',
                'error' => 'category_has_vehicles',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès',
        ]);
    }
}
