<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'user_id',
        'vehicle_id',
        'rating',
        'comment',
        'cleanliness_rating',
        'condition_rating',
        'service_rating',
        'value_rating',
        'photos',
        'is_verified',
        'is_published',
        'admin_response',
        'admin_response_at',
    ];

    protected $casts = [
        'photos' => 'array',
        'is_verified' => 'boolean',
        'is_published' => 'boolean',
        'admin_response_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
