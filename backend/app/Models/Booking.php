<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'booking_number',
        'user_id',
        'vehicle_id',
        'start_date',
        'end_date',
        'pickup_location',
        'dropoff_location',
        'daily_rate',
        'number_of_days',
        'subtotal',
        'insurance_cost',
        'additional_fees',
        'discount_amount',
        'total_amount',
        'status',
        'payment_status',
        'driver_license_number',
        'driver_license_expiry',
        'additional_drivers',
        'special_requests',
        'terms_accepted',
        'confirmed_at',
        'cancelled_at',
        'cancellation_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'confirmed_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'driver_license_expiry' => 'date',
            'additional_drivers' => 'array',
            'daily_rate' => 'decimal:2',
            'subtotal' => 'decimal:2',
            'insurance_cost' => 'decimal:2',
            'additional_fees' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    /**
     * Get the user that owns the booking
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the vehicle for this booking
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Calculate number of days between start and end date
     */
    public function calculateDays(): int
    {
        return Carbon::parse($this->start_date)->diffInDays(Carbon::parse($this->end_date)) ?: 1;
    }

    /**
     * Calculate total amount based on daily rate and additional costs
     */
    public function calculateTotal(): float
    {
        $subtotal = $this->daily_rate * $this->number_of_days;
        return $subtotal + $this->insurance_cost + $this->additional_fees - $this->discount_amount;
    }

    /**
     * Generate unique booking number
     */
    public function generateBookingNumber(): void
    {
        $prefix = 'SRC-';
        $date = now()->format('Ymd');
        $random = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        
        $this->booking_number = $prefix . $date . '-' . $random;
    }

    /**
     * Calculate pricing for the booking
     */
    public function calculatePricing(): void
    {
        $this->number_of_days = $this->calculateDays();
        $this->subtotal = $this->daily_rate * $this->number_of_days;
        $this->total_amount = $this->subtotal + $this->insurance_cost + $this->additional_fees - $this->discount_amount;
    }

    /**
     * Check if booking can be cancelled
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']) && 
               Carbon::parse($this->start_date)->isFuture();
    }

    /**
     * Scope to get active bookings
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['confirmed', 'in_progress']);
    }

    /**
     * Scope to get bookings by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get bookings for a specific date range
     */
    public function scopeInDateRange($query, $startDate, $endDate)
    {
        return $query->where(function ($query) use ($startDate, $endDate) {
            $query->whereBetween('start_date', [$startDate, $endDate])
                  ->orWhereBetween('end_date', [$startDate, $endDate])
                  ->orWhere(function ($query) use ($startDate, $endDate) {
                      $query->where('start_date', '<=', $startDate)
                            ->where('end_date', '>=', $endDate);
                  });
        });
    }

    /**
     * Check if booking is current (ongoing)
     */
    public function isCurrent(): bool
    {
        return $this->status === 'in_progress' && 
               now()->between($this->start_date, $this->end_date);
    }

    /**
     * Check if booking is upcoming
     */
    public function isUpcoming(): bool
    {
        return $this->status === 'confirmed' && 
               Carbon::parse($this->start_date)->isFuture();
    }
}
