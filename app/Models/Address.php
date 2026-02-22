<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'mobile',
        'landmark',
        'address',
        'city',
        'state',
        'pincode',
        'address_type',
        'is_default'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
