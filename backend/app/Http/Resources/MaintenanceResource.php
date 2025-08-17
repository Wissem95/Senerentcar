<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaintenanceResource extends JsonResource
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
            'vehicle_id' => $this->vehicle_id,
            'vehicle' => $this->whenLoaded('vehicle', function () {
                return [
                    'id' => $this->vehicle->id,
                    'name' => $this->vehicle->name,
                    'license_plate' => $this->vehicle->license_plate,
                    'brand' => $this->vehicle->brand,
                    'model' => $this->vehicle->model,
                ];
            }),
            'type' => $this->type,
            'description' => $this->description,
            'status' => $this->status,
            'scheduled_date' => $this->scheduled_date?->format('Y-m-d H:i'),
            'completed_date' => $this->completed_date?->format('Y-m-d H:i'),
            'cost' => $this->cost ? number_format($this->cost, 2) : null,
            'notes' => $this->notes,
            'performed_by' => $this->performed_by,
            'mileage_at_maintenance' => $this->mileage_at_maintenance,
            'next_maintenance_mileage' => $this->next_maintenance_mileage,
            'duration' => $this->when(
                $this->scheduled_date && $this->completed_date,
                function () {
                    $duration = $this->completed_date->diffInHours($this->scheduled_date);
                    return [
                        'hours' => $duration,
                        'label' => $duration . ' heure' . ($duration > 1 ? 's' : ''),
                    ];
                }
            ),
            'is_overdue' => $this->scheduled_date && $this->scheduled_date->isPast() && $this->status !== 'completed',
            'priority' => match($this->type) {
                'emergency' => 'high',
                'repair' => 'medium',
                'routine' => 'low',
                default => 'medium',
            },
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
