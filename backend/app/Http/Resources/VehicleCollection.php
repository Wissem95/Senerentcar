<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VehicleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'filters_applied' => [
                    'category' => $request->get('category'),
                    'location' => $request->get('location'),
                    'price_min' => $request->get('price_min'),
                    'price_max' => $request->get('price_max'),
                    'seats_min' => $request->get('seats_min'),
                    'fuel_type' => $request->get('fuel_type'),
                    'transmission' => $request->get('transmission'),
                ],
                'statistics' => [
                    'total_vehicles' => $this->collection->count(),
                    'available_count' => $this->collection->where('status', 'available')->count(),
                    'price_range' => [
                        'min' => $this->collection->min('price_per_day'),
                        'max' => $this->collection->max('price_per_day'),
                        'currency' => 'XOF',
                    ],
                ],
            ],
        ];
    }
}
