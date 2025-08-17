<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Http\Resources\VehicleCollection;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles with filtering and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Vehicle::with(['category'])
            ->when($request->has('available_only'), function ($q) {
                return $q->available();
            })
            ->when($request->filled('category'), function ($q) use ($request) {
                return $q->where('category_id', $request->category);
            })
            ->when($request->filled('location'), function ($q) use ($request) {
                return $q->where('location', 'like', '%' . $request->location . '%');
            })
            ->when($request->filled('price_min'), function ($q) use ($request) {
                return $q->where('price_per_day', '>=', $request->price_min);
            })
            ->when($request->filled('price_max'), function ($q) use ($request) {
                return $q->where('price_per_day', '<=', $request->price_max);
            })
            ->when($request->filled('seats_min'), function ($q) use ($request) {
                return $q->where('seats', '>=', $request->seats_min);
            })
            ->when($request->filled('fuel_type'), function ($q) use ($request) {
                return $q->where('fuel_type', $request->fuel_type);
            })
            ->when($request->filled('transmission'), function ($q) use ($request) {
                return $q->where('transmission', $request->transmission);
            })
            ->when($request->filled('features'), function ($q) use ($request) {
                $features = is_array($request->features) ? $request->features : explode(',', $request->features);
                foreach ($features as $feature) {
                    $q->whereJsonContains('features', trim($feature));
                }
                return $q;
            })
            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                return $q->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                          ->orWhere('brand', 'like', '%' . $search . '%')
                          ->orWhere('model', 'like', '%' . $search . '%')
                          ->orWhere('description', 'like', '%' . $search . '%');
                });
            });

        // Check date availability if dates are provided
        if ($request->filled(['start_date', 'end_date'])) {
            $startDate = Carbon::parse($request->start_date);
            $endDate = Carbon::parse($request->end_date);
            
            $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
                $q->where('status', '!=', 'cancelled')
                  ->where(function ($dateQuery) use ($startDate, $endDate) {
                      $dateQuery->whereBetween('start_date', [$startDate, $endDate])
                               ->orWhereBetween('end_date', [$startDate, $endDate])
                               ->orWhere(function ($overlapQuery) use ($startDate, $endDate) {
                                   $overlapQuery->where('start_date', '<=', $startDate)
                                               ->where('end_date', '>=', $endDate);
                               });
                  });
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if ($sortBy === 'popularity') {
            // Sort by booking count (most popular first)
            $query->withCount('bookings')->orderBy('bookings_count', 'desc');
        } elseif ($sortBy === 'price_asc') {
            $query->orderBy('price_per_day', 'asc');
        } elseif ($sortBy === 'price_desc') {
            $query->orderBy('price_per_day', 'desc');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = min($request->get('per_page', 12), 50);
        $vehicles = $query->paginate($perPage);

        return response()->json(new VehicleCollection($vehicles));
    }

    /**
     * Store a newly created vehicle.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $vehicle = Vehicle::create($request->validated());

        return response()->json([
            'message' => 'Véhicule créé avec succès',
            'vehicle' => new VehicleResource($vehicle->load('category')),
        ], 201);
    }

    /**
     * Display the specified vehicle.
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        $vehicle->load(['category', 'maintenances' => function ($query) {
            $query->latest()->take(5);
        }]);

        return response()->json([
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /**
     * Update the specified vehicle.
     */
    public function update(StoreVehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle->update($request->validated());

        return response()->json([
            'message' => 'Véhicule mis à jour avec succès',
            'vehicle' => new VehicleResource($vehicle->load('category')),
        ]);
    }

    /**
     * Remove the specified vehicle.
     */
    public function destroy(Vehicle $vehicle): JsonResponse
    {
        // Check if vehicle has active bookings
        $activeBookings = $vehicle->bookings()
            ->whereIn('status', ['pending', 'confirmed', 'in_progress'])
            ->count();

        if ($activeBookings > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer un véhicule avec des réservations actives',
                'error' => 'active_bookings_exist',
            ], 422);
        }

        $vehicle->delete();

        return response()->json([
            'message' => 'Véhicule supprimé avec succès',
        ]);
    }

    /**
     * Get featured vehicles.
     */
    public function featured(): JsonResponse
    {
        $vehicles = Vehicle::with('category')
            ->where('is_featured', true)
            ->available()
            ->limit(8)
            ->get();

        return response()->json([
            'vehicles' => VehicleResource::collection($vehicles),
        ]);
    }

    /**
     * Check availability for specific dates.
     */
    public function checkAvailability(Request $request, Vehicle $vehicle): JsonResponse
    {
        $request->validate([
            'start_date' => ['required', 'date', 'after:today'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        $isAvailable = $vehicle->isAvailableForDates(
            $request->start_date,
            $request->end_date
        );

        $response = [
            'available' => $isAvailable,
            'vehicle_id' => $vehicle->id,
            'dates' => [
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ],
        ];

        if (!$isAvailable) {
            $nextAvailable = $vehicle->getNextAvailableDate();
            if ($nextAvailable) {
                $response['next_available_date'] = $nextAvailable;
            }
            $response['message'] = 'Le véhicule n\'est pas disponible pour ces dates';
        }

        return response()->json($response);
    }

    /**
     * Get vehicle statistics (admin only).
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_vehicles' => Vehicle::count(),
            'available_vehicles' => Vehicle::available()->count(),
            'rented_vehicles' => Vehicle::where('status', 'rented')->count(),
            'maintenance_vehicles' => Vehicle::where('status', 'maintenance')->count(),
            'inactive_vehicles' => Vehicle::where('status', 'inactive')->count(),
            'revenue_this_month' => Vehicle::join('bookings', 'vehicles.id', '=', 'bookings.vehicle_id')
                ->where('bookings.status', 'completed')
                ->whereMonth('bookings.created_at', Carbon::now()->month)
                ->sum('bookings.total_amount'),
            'most_popular_category' => Vehicle::join('categories', 'vehicles.category_id', '=', 'categories.id')
                ->join('bookings', 'vehicles.id', '=', 'bookings.vehicle_id')
                ->selectRaw('categories.name, COUNT(bookings.id) as bookings_count')
                ->groupBy('categories.name')
                ->orderByDesc('bookings_count')
                ->first()?->name,
        ];

        return response()->json(['statistics' => $stats]);
    }
}
