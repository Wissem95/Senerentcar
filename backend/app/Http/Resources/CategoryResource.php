<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'is_active' => $this->is_active,
            'vehicles_count' => $this->whenCounted('vehicles'),
            'available_vehicles_count' => $this->when(
                $this->relationLoaded('vehicles'),
                function () {
                    return $this->vehicles->where('status', 'available')->count();
                }
            ),
            'price_range' => $this->when(
                $this->relationLoaded('vehicles'),
                function () {
                    $prices = $this->vehicles->pluck('price_per_day');
                    if ($prices->isEmpty()) {
                        return null;
                    }
                    return [
                        'min' => number_format($prices->min(), 2),
                        'max' => number_format($prices->max(), 2),
                        'currency' => 'XOF',
                    ];
                }
            ),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
