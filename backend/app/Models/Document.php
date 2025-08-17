<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'documentable_type',
        'documentable_id',
        'type',
        'name',
        'file_path',
        'file_type',
        'file_size',
        'description',
        'status',
        'verification_notes',
        'verified_at',
        'verified_by',
        'expiry_date',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'expiry_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function documentable()
    {
        return $this->morphTo();
    }
}
