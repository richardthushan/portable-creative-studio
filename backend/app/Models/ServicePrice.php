<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePrice extends Model
{
    protected $fillable = [
        'service_id',
        'pricing_type',
        'amount',
        'currency',
        'billing_interval',
        'label',
        'is_confirmed',
        'is_active',
    ];

    protected $casts = [
        'is_confirmed' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
