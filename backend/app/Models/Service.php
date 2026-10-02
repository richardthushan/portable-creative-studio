<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'short_description',
        'description',
        'icon',
        'image',
        'service_type',
        'is_ai_available',
        'is_worker_available',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_ai_available' => 'boolean',
        'is_worker_available' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function prices()
    {
        return $this->hasMany(ServicePrice::class);
    }

    public function enquiries()
    {
        return $this->hasMany(ContactEnquiry::class);
    }
}