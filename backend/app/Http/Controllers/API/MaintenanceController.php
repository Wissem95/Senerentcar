<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaintenanceResource;
use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of maintenances.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Maintenance::with(['vehicle'])
            ->when($request->filled('vehicle_id'), function ($q) use ($request) {
                return $q->where('vehicle_id', $request->vehicle_id);
            })
            ->when($request->filled('type'), function ($q) use ($request) {
                return $q->where('type', $request->type);
            })
            ->when($request->filled('status'), function ($q) use ($request) {
                return $q->where('status', $request->status);
            })
            ->when($request->filled('date_from'), function ($q) use ($request) {
                return $q->where('scheduled_date', '>=', $request->date_from);
            })
            ->when($request->filled('date_to'), function ($q) use ($request) {
                return $q->where('scheduled_date', '<=', $request->date_to);
            })
            ->when($request->has('overdue_only'), function ($q) {
                return $q->where('scheduled_date', '<', now())
                        ->where('status', '!=', 'completed');
            });

        $sortBy = $request->get('sort_by', 'scheduled_date');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $maintenances = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'maintenances' => MaintenanceResource::collection($maintenances),
            'pagination' => [
                'current_page' => $maintenances->currentPage(),
                'last_page' => $maintenances->lastPage(),
                'per_page' => $maintenances->perPage(),
                'total' => $maintenances->total(),
            ],
        ]);
    }

    /**
     * Store a newly created maintenance record.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'type' => ['required', 'in:routine,repair,inspection,emergency'],
            'description' => ['required', 'string', 'max:1000'],
            'scheduled_date' => ['required', 'date', 'after:now'],
            'cost' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'notes' => ['nullable', 'string'],
            'performed_by' => ['nullable', 'string', 'max:255'],
            'mileage_at_maintenance' => ['nullable', 'integer', 'min:0'],
            'next_maintenance_mileage' => ['nullable', 'integer', 'min:0'],
        ]);

        $maintenance = Maintenance::create($validated);

        // If it's an emergency maintenance, update vehicle status
        if ($validated['type'] === 'emergency') {
            Vehicle::where('id', $validated['vehicle_id'])
                ->update(['status' => 'maintenance']);
        }

        return response()->json([
            'message' => 'Maintenance programmée avec succès',
            'maintenance' => new MaintenanceResource($maintenance->load('vehicle')),
        ], 201);
    }

    /**
     * Display the specified maintenance.
     */
    public function show(Maintenance $maintenance): JsonResponse
    {
        $maintenance->load('vehicle');

        return response()->json([
            'maintenance' => new MaintenanceResource($maintenance),
        ]);
    }

    /**
     * Update the specified maintenance.
     */
    public function update(Request $request, Maintenance $maintenance): JsonResponse
    {
        $validated = $request->validate([
            'type' => ['sometimes', 'in:routine,repair,inspection,emergency'],
            'description' => ['sometimes', 'string', 'max:1000'],
            'scheduled_date' => ['sometimes', 'date'],
            'cost' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:999999.99'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'performed_by' => ['sometimes', 'nullable', 'string', 'max:255'],
            'mileage_at_maintenance' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'next_maintenance_mileage' => ['sometimes', 'nullable', 'integer', 'min:0'],
        ]);

        $maintenance->update($validated);

        return response()->json([
            'message' => 'Maintenance mise à jour avec succès',
            'maintenance' => new MaintenanceResource($maintenance->load('vehicle')),
        ]);
    }

    /**
     * Mark maintenance as completed.
     */
    public function complete(Request $request, Maintenance $maintenance): JsonResponse
    {
        if ($maintenance->status === 'completed') {
            return response()->json([
                'message' => 'Cette maintenance est déjà terminée',
                'error' => 'maintenance_already_completed',
            ], 422);
        }

        $validated = $request->validate([
            'cost' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'notes' => ['nullable', 'string'],
            'performed_by' => ['required', 'string', 'max:255'],
            'mileage_at_maintenance' => ['nullable', 'integer', 'min:0'],
            'next_maintenance_mileage' => ['nullable', 'integer', 'min:0'],
        ]);

        $maintenance->update([
            'status' => 'completed',
            'completed_date' => now(),
            'cost' => $validated['cost'] ?? $maintenance->cost,
            'notes' => $validated['notes'] ?? $maintenance->notes,
            'performed_by' => $validated['performed_by'],
            'mileage_at_maintenance' => $validated['mileage_at_maintenance'],
            'next_maintenance_mileage' => $validated['next_maintenance_mileage'],
        ]);

        // Update vehicle status back to available if it was in maintenance
        if ($maintenance->vehicle->status === 'maintenance') {
            $maintenance->vehicle->update(['status' => 'available']);
            
            // Update vehicle mileage if provided
            if (isset($validated['mileage_at_maintenance'])) {
                $maintenance->vehicle->update(['mileage' => $validated['mileage_at_maintenance']]);
            }
        }

        return response()->json([
            'message' => 'Maintenance terminée avec succès',
            'maintenance' => new MaintenanceResource($maintenance->load('vehicle')),
        ]);
    }

    /**
     * Remove the specified maintenance.
     */
    public function destroy(Maintenance $maintenance): JsonResponse
    {
        if ($maintenance->status === 'in_progress') {
            return response()->json([
                'message' => 'Impossible de supprimer une maintenance en cours',
                'error' => 'maintenance_in_progress',
            ], 422);
        }

        $maintenance->delete();

        return response()->json([
            'message' => 'Maintenance supprimée avec succès',
        ]);
    }

    /**
     * Get upcoming maintenances.
     */
    public function upcoming(): JsonResponse
    {
        $upcomingMaintenances = Maintenance::with('vehicle')
            ->where('status', 'scheduled')
            ->where('scheduled_date', '>=', now())
            ->where('scheduled_date', '<=', now()->addDays(30))
            ->orderBy('scheduled_date')
            ->get();

        return response()->json([
            'maintenances' => MaintenanceResource::collection($upcomingMaintenances),
        ]);
    }

    /**
     * Get overdue maintenances.
     */
    public function overdue(): JsonResponse
    {
        $overdueMaintenances = Maintenance::with('vehicle')
            ->where('status', '!=', 'completed')
            ->where('scheduled_date', '<', now())
            ->orderBy('scheduled_date')
            ->get();

        return response()->json([
            'maintenances' => MaintenanceResource::collection($overdueMaintenances),
        ]);
    }
}
