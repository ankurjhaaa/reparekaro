<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['vendor_id', 'name', 'slug', 'image', 'image_url'];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function rates()
    {
        return $this->hasMany(ServiceRate::class);
    }
}
