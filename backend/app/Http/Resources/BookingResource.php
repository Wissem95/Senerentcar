<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'booking_number' => $this->booking_number,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', function () {
                return new UserResource($this->user);
            }),
            'vehicle_id' => $this->vehicle_id,
            'vehicle' => $this->whenLoaded('vehicle', function () {
                return new VehicleResource($this->vehicle);
            }),
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'pickup_location' => $this->pickup_location,
            'dropoff_location' => $this->dropoff_location,
            'status' => $this->status,
            'duration' => [
                'days' => $this->duration_days,
                'label' => $this->duration_days . ' jour' . ($this->duration_days > 1 ? 's' : ''),
            ],
            'pricing' => [
                'daily_rate' => number_format($this->daily_rate, 2),
                'subtotal' => number_format($this->subtotal, 2),
                'insurance_cost' => number_format($this->insurance_cost, 2),
                'tax_amount' => number_format($this->tax_amount, 2),
                'total_amount' => number_format($this->total_amount, 2),
                'deposit_amount' => number_format($this->deposit_amount, 2),
                'currency' => 'XOF',
            ],
            'driver_info' => [
                'license_number' => $this->driver_license_number,
                'license_expiry' => $this->driver_license_expiry?->format('Y-m-d'),
            ],
            'additional_drivers' => $this->additional_drivers ?? [],
            'special_requests' => $this->special_requests,
            'pickup_time' => $this->pickup_time?->format('H:i'),
            'dropoff_time' => $this->dropoff_time?->format('H:i'),
            'confirmed_at' => $this->confirmed_at?->toISOString(),
            'cancelled_at' => $this->cancelled_at?->toISOString(),
            'completed_at' => $this->completed_at?->toISOString(),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
