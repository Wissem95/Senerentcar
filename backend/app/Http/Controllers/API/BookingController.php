<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Http\Resources\BookingCollection;
use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $query = $user->bookings()
            ->with(['vehicle.category', 'user'])
            ->when($request->filled('status'), function ($q) use ($request) {
                return $q->where('status', $request->status);
            })
            ->when($request->filled('vehicle_id'), function ($q) use ($request) {
                return $q->where('vehicle_id', $request->vehicle_id);
            })
            ->when($request->filled('date_from'), function ($q) use ($request) {
                return $q->where('start_date', '>=', $request->date_from);
            })
            ->when($request->filled('date_to'), function ($q) use ($request) {
                return $q->where('start_date', '<=', $request->date_to);
            });

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $bookings = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ]);
    }

    /**
     * Get all bookings (admin only).
     */
    public function all(Request $request): JsonResponse
    {
        $query = Booking::with(['vehicle.category', 'user'])
            ->when($request->filled('status'), function ($q) use ($request) {
                return $q->where('status', $request->status);
            })
            ->when($request->filled('user_id'), function ($q) use ($request) {
                return $q->where('user_id', $request->user_id);
            })
            ->when($request->filled('vehicle_id'), function ($q) use ($request) {
                return $q->where('vehicle_id', $request->vehicle_id);
            })
            ->when($request->filled('date_from'), function ($q) use ($request) {
                return $q->where('start_date', '>=', $request->date_from);
            })
            ->when($request->filled('date_to'), function ($q) use ($request) {
                return $q->where('start_date', '<=', $request->date_to);
            });

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $bookings = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'data' => BookingResource::collection($bookings),
            'meta' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        // Double-check availability
        if (!$vehicle->isAvailableForDates($request->start_date, $request->end_date)) {
            return response()->json([
                'message' => 'Le véhicule n\'est plus disponible pour ces dates',
                'error' => 'vehicle_not_available',
            ], 422);
        }

        DB::beginTransaction();
        try {
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'vehicle_id' => $request->vehicle_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'pickup_location' => $request->pickup_location,
                'dropoff_location' => $request->dropoff_location,
                'driver_license_number' => $request->driver_license_number,
                'driver_license_expiry' => $request->driver_license_expiry,
                'additional_drivers' => $request->additional_drivers,
                'special_requests' => $request->special_requests,
                'daily_rate' => $vehicle->price_per_day,
                'insurance_cost' => $vehicle->insurance_cost ?? 0,
                'additional_fees' => 0,
                'discount_amount' => 0,
                'terms_accepted' => $request->terms_accepted,
            ]);

            // Calculate pricing and generate booking number
            $booking->calculatePricing();
            $booking->generateBookingNumber();
            $booking->save();

            // Send confirmation email/SMS (TODO: implement with queue)
            
            DB::commit();

            return response()->json([
                'message' => 'Réservation créée avec succès',
                'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            
            return response()->json([
                'message' => 'Erreur lors de la création de la réservation',
                'error' => 'booking_creation_failed',
            ], 500);
        }
    }

    /**
     * Display the specified booking.
     */
    public function show(Booking $booking, Request $request): JsonResponse
    {
        // Check if user owns the booking or is admin
        if ($booking->user_id !== $request->user()->id && !$request->user()->hasRole(['admin', 'manager'])) {
            return response()->json([
                'message' => 'Non autorisé à voir cette réservation',
            ], 403);
        }

        $booking->load(['vehicle.category', 'user']);

        return response()->json([
            'booking' => new BookingResource($booking),
        ]);
    }

    /**
     * Update the specified booking.
     */
    public function update(Request $request, Booking $booking): JsonResponse
    {
        // Check authorization
        if ($booking->user_id !== $request->user()->id && !$request->user()->hasRole(['admin', 'manager'])) {
            return response()->json([
                'message' => 'Non autorisé à modifier cette réservation',
            ], 403);
        }

        // Only allow updates for pending bookings
        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Impossible de modifier une réservation ' . $booking->status,
                'error' => 'booking_not_modifiable',
            ], 422);
        }

        $validated = $request->validate([
            'pickup_location' => ['sometimes', 'string', 'max:255'],
            'dropoff_location' => ['sometimes', 'string', 'max:255'],
            'special_requests' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'pickup_time' => ['sometimes', 'nullable', 'date_format:H:i'],
            'dropoff_time' => ['sometimes', 'nullable', 'date_format:H:i'],
        ]);

        $booking->update($validated);

        return response()->json([
            'message' => 'Réservation mise à jour avec succès',
            'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
        ]);
    }

    /**
     * Cancel a booking.
     */
    public function cancel(Booking $booking, Request $request): JsonResponse
    {
        // Check authorization
        if ($booking->user_id !== $request->user()->id && !$request->user()->hasRole(['admin', 'manager'])) {
            return response()->json([
                'message' => 'Non autorisé à annuler cette réservation',
            ], 403);
        }

        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json([
                'message' => 'Impossible d\'annuler une réservation ' . $booking->status,
                'error' => 'booking_not_cancellable',
            ], 422);
        }

        $validated = $request->validate([
            'cancellation_reason' => ['required', 'string', 'max:500'],
        ]);

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $validated['cancellation_reason'],
        ]);

        // Handle refund logic based on cancellation policy (TODO: implement)

        return response()->json([
            'message' => 'Réservation annulée avec succès',
            'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
        ]);
    }

    /**
     * Confirm a booking (admin only).
     */
    public function confirm(Booking $booking): JsonResponse
    {
        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Seules les réservations en attente peuvent être confirmées',
                'error' => 'booking_not_confirmable',
            ], 422);
        }

        $booking->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);

        // Update vehicle status
        $booking->vehicle->update(['status' => 'rented']);

        return response()->json([
            'message' => 'Réservation confirmée avec succès',
            'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
        ]);
    }

    /**
     * Start a booking (admin only).
     */
    public function start(Booking $booking): JsonResponse
    {
        if ($booking->status !== 'confirmed') {
            return response()->json([
                'message' => 'Seules les réservations confirmées peuvent être démarrées',
                'error' => 'booking_not_startable',
            ], 422);
        }

        $booking->update([
            'status' => 'in_progress',
            'actual_start_date' => now(),
        ]);

        return response()->json([
            'message' => 'Location démarrée avec succès',
            'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
        ]);
    }

    /**
     * Complete a booking (admin only).
     */
    public function complete(Booking $booking, Request $request): JsonResponse
    {
        if ($booking->status !== 'in_progress') {
            return response()->json([
                'message' => 'Seules les locations en cours peuvent être terminées',
                'error' => 'booking_not_completable',
            ], 422);
        }

        $validated = $request->validate([
            'return_mileage' => ['required', 'integer', 'min:0'],
            'fuel_level' => ['required', 'in:empty,quarter,half,three_quarters,full'],
            'condition_notes' => ['nullable', 'string', 'max:1000'],
            'damages' => ['nullable', 'array'],
            'damages.*' => ['string'],
            'additional_charges' => ['nullable', 'numeric', 'min:0'],
        ]);

        $booking->update([
            'status' => 'completed',
            'completed_at' => now(),
            'actual_end_date' => now(),
            'return_mileage' => $validated['return_mileage'],
            'fuel_level' => $validated['fuel_level'],
            'condition_notes' => $validated['condition_notes'],
            'damages' => $validated['damages'] ?? [],
            'additional_charges' => $validated['additional_charges'] ?? 0,
        ]);

        // Update vehicle status back to available
        $booking->vehicle->update([
            'status' => 'available',
            'mileage' => $validated['return_mileage'],
        ]);

        // Calculate final amount if there are additional charges
        if ($validated['additional_charges'] > 0) {
            $booking->total_amount += $validated['additional_charges'];
            $booking->save();
        }

        return response()->json([
            'message' => 'Location terminée avec succès',
            'booking' => new BookingResource($booking->load(['vehicle.category', 'user'])),
        ]);
    }

    /**
     * Get booking statistics (admin only).
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
            'in_progress_bookings' => Booking::where('status', 'in_progress')->count(),
            'completed_bookings' => Booking::where('status', 'completed')->count(),
            'cancelled_bookings' => Booking::where('status', 'cancelled')->count(),
            'total_revenue' => Booking::where('status', 'completed')->sum('total_amount'),
            'revenue_this_month' => Booking::where('status', 'completed')
                ->whereMonth('created_at', Carbon::now()->month)
                ->sum('total_amount'),
            'average_booking_value' => Booking::where('status', 'completed')
                ->avg('total_amount'),
            'bookings_this_week' => Booking::where('created_at', '>=', Carbon::now()->startOfWeek())
                ->count(),
        ];

        return response()->json(['statistics' => $stats]);
    }
}
