<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'brand',
        'model',
        'year',
        'license_plate',
        'fuel_type',
        'transmission',
        'seats',
        'doors',
        'air_conditioning',
        'price_per_day',
        'images',
        'description',
        'features',
        'location',
        'status',
        'mileage',
        'color',
        'insurance_cost',
        'deposit_amount',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected function casts(): array
    {
        return [
            'air_conditioning' => 'boolean',
            'images' => 'array',
            'features' => 'array',
            'is_featured' => 'boolean',
            'price_per_day' => 'decimal:2',
            'insurance_cost' => 'decimal:2',
            'deposit_amount' => 'decimal:2',
        ];
    }

    /**
     * Get the category that owns the vehicle
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get all bookings for this vehicle
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get all maintenance records for this vehicle
     */
    public function maintenances(): HasMany
    {
        return $this->hasMany(Maintenance::class);
    }

    /**
     * Check if vehicle is available for given dates
     */
    public function isAvailableForDates($startDate, $endDate): bool
    {
        if ($this->status !== 'available') {
            return false;
        }

        $conflictingBookings = $this->bookings()
            ->whereIn('status', ['confirmed', 'in_progress'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                      ->orWhereBetween('end_date', [$startDate, $endDate])
                      ->orWhere(function ($query) use ($startDate, $endDate) {
                          $query->where('start_date', '<=', $startDate)
                                ->where('end_date', '>=', $endDate);
                      });
            })
            ->exists();

        return !$conflictingBookings;
    }

    /**
     * Scope to get only available vehicles
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope to get featured vehicles
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope to filter by location
     */
    public function scopeInLocation($query, $location)
    {
        return $query->where('location', $location);
    }

    /**
     * Scope to filter by price range
     */
    public function scopePriceBetween($query, $min, $max)
    {
        return $query->whereBetween('price_per_day', [$min, $max]);
    }

    /**
     * Get the main image URL
     */
    public function getMainImageAttribute(): ?string
    {
        return $this->images && count($this->images) > 0 ? $this->images[0] : null;
    }

    /**
     * Get full vehicle name
     */
    public function getFullNameAttribute(): string
    {
        return $this->brand . ' ' . $this->model . ' ' . $this->year;
    }
}
