<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Maintenance extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'vehicle_id',
        'type',
        'title',
        'description',
        'scheduled_date',
        'completed_date',
        'status',
        'cost',
        'provider',
        'notes',
        'parts_replaced',
        'mileage_at_maintenance',
        'next_maintenance_date',
        'is_recurring',
        'recurring_interval_days',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected function casts(): array
    {
        return [
            'scheduled_date' => 'datetime',
            'completed_date' => 'datetime',
            'next_maintenance_date' => 'date',
            'cost' => 'decimal:2',
            'parts_replaced' => 'array',
            'is_recurring' => 'boolean',
        ];
    }

    /**
     * Get the vehicle that owns this maintenance record
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Check if maintenance is overdue
     */
    public function isOverdue(): bool
    {
        return $this->status === 'scheduled' && 
               Carbon::parse($this->scheduled_date)->isPast();
    }

    /**
     * Check if maintenance is due soon (within 7 days)
     */
    public function isDueSoon(): bool
    {
        return $this->status === 'scheduled' && 
               Carbon::parse($this->scheduled_date)->isBetween(now(), now()->addDays(7));
    }

    /**
     * Mark maintenance as completed
     */
    public function markAsCompleted(?Carbon $completedDate = null): void
    {
        $this->update([
            'status' => 'completed',
            'completed_date' => $completedDate ?: now(),
        ]);

        // Schedule next maintenance if recurring
        if ($this->is_recurring && $this->recurring_interval_days) {
            $nextDate = Carbon::parse($this->completed_date)->addDays($this->recurring_interval_days);
            
            self::create([
                'vehicle_id' => $this->vehicle_id,
                'type' => $this->type,
                'title' => $this->title,
                'description' => $this->description,
                'scheduled_date' => $nextDate,
                'status' => 'scheduled',
                'is_recurring' => true,
                'recurring_interval_days' => $this->recurring_interval_days,
            ]);
        }
    }

    /**
     * Scope to get overdue maintenance
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'scheduled')
                    ->where('scheduled_date', '<', now());
    }

    /**
     * Scope to get maintenance due soon
     */
    public function scopeDueSoon($query, $days = 7)
    {
        return $query->where('status', 'scheduled')
                    ->whereBetween('scheduled_date', [now(), now()->addDays($days)]);
    }

    /**
     * Scope to get maintenance by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to get maintenance by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Get maintenance cost formatted
     */
    public function getFormattedCostAttribute(): string
    {
        return number_format($this->cost, 0, ',', ' ') . ' FCFA';
    }

    /**
     * Get days until scheduled maintenance
     */
    public function getDaysUntilScheduledAttribute(): int
    {
        return now()->diffInDays(Carbon::parse($this->scheduled_date), false);
    }
}
