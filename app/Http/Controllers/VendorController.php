<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function dashboard(){
        return Inertia::render('Vendor/Dashboard');
    }
    public function technicians(){
        return Inertia::render('Vendor/Technicians');
    }
    public function bookings(){
        return Inertia::render('Vendor/Bookings');
    }
    public function services(){
        return Inertia::render('Vendor/Services');
    }
    public function reports(){
        return Inertia::render('Vendor/Reports');
    }
    public function settings(){
        return Inertia::render('Vendor/Settings');
    }
}
