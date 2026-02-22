<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceRate extends Model
{
    protected $fillable = [
        'vendor_id',
        'service_id',
        'title',
        'duration',
        'price',
        'discount_price',
        'includes'
    ];

    protected $casts = [
        'includes' => 'array',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
