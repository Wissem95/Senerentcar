<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'minimum_amount',
        'valid_from',
        'valid_until',
        'usage_limit',
        'usage_count',
        'usage_limit_per_user',
        'applicable_categories',
        'applicable_vehicles',
        'is_active',
        'is_public',
        'conditions',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'minimum_amount' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'applicable_categories' => 'array',
        'applicable_vehicles' => 'array',
        'is_active' => 'boolean',
        'is_public' => 'boolean',
        'conditions' => 'array',
    ];

    public function isValid()
    {
        return $this->is_active 
            && now()->between($this->valid_from, $this->valid_until)
            && ($this->usage_limit === null || $this->usage_count < $this->usage_limit);
    }

    public function calculateDiscount($amount)
    {
        if ($this->type === 'percentage') {
            return $amount * ($this->value / 100);
        }
        return min($this->value, $amount);
    }
}
