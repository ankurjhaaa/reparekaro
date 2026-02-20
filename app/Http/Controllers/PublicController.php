<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home(){
        return Inertia::render('public/Home');
    }
    public function bookNow(){
        return Inertia::render('public/BookNow');
    }
    public function services(){
        return Inertia::render('public/Services');
    }
    public function profile(){
        return Inertia::render('public/Profile');
    }
    
    public function about(){
        return Inertia::render('public/About');
    }
    public function contact(){
        return Inertia::render('public/Contact');
    }
    public function help(){
        return Inertia::render('public/Help');
    }
    public function myBookings(){
        return Inertia::render('public/MyBookings');
    }
    public function bookingDetails($id){
        return Inertia::render('public/BookingDetails', ['id' => $id]);
    }
    public function savedServices(){
        return Inertia::render('public/SavedServices');
    }
    public function notifications(){
        return Inertia::render('public/Notifications');
    }
    public function settings(){
        return Inertia::render('public/Settings');
    }
    public function chat($id){
        return Inertia::render('public/Chat', ['id' => $id]);
    }
    public function editProfile(){
        return Inertia::render('public/EditProfile');
    }
    public function changePassword(){
        return Inertia::render('public/ChangePassword');
    }
    public function terms(){
        return Inertia::render('public/Terms');
    }
}
