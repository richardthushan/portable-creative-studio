<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactEnquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'service_id',
        'message',
        'status',
        'ip_address',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}