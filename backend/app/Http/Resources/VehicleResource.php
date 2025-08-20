<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category' => $this->whenLoaded('category', function () {
                return new CategoryResource($this->category);
            }),
            'name' => $this->name,
            'brand' => $this->brand,
            'model' => $this->model,
            'year' => $this->year,
            'license_plate' => $this->license_plate,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'seats' => $this->seats,
            'doors' => $this->doors,
            'air_conditioning' => $this->air_conditioning,
            'price_per_day' => number_format($this->price_per_day, 2),
            'images' => $this->formatImages($this->images ?? []),
            'description' => $this->description,
            'features' => $this->features ?? [],
            'location' => $this->location,
            'status' => $this->status,
            'mileage' => $this->mileage,
            'color' => $this->color,
            'insurance_cost' => $this->insurance_cost ? number_format($this->insurance_cost, 2) : null,
            'deposit_amount' => $this->deposit_amount ? number_format($this->deposit_amount, 2) : null,
            'is_featured' => $this->is_featured,
            'availability' => [
                'is_available' => $this->status === 'available',
                'next_available_date' => $this->status === 'available' ? null : 'N/A',
            ],
            'rating' => [
                'average' => 0, // TODO: Implement rating system
                'count' => 0,
            ],
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
    
    /**
     * Format images URLs to include the full frontend URL
     *
     * @param array $images
     * @return array
     */
    private function formatImages(array $images): array
    {
        return array_map(function ($image) {
            // If the image starts with http, it's already a full URL
            if (str_starts_with($image, 'http')) {
                return $image;
            }
            // Otherwise, prepend the frontend URL
            $frontendUrl = env('FRONTEND_URL', 'https://senerentcar.vercel.app');
            return $frontendUrl . $image;
        }, $images);
    }
}
