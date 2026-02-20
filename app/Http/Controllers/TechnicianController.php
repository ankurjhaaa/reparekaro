<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnicianController extends Controller
{
    public function dashboard(){
        return Inertia::render('Technician/Dashboard');
    }
    public function jobs(){
        return Inertia::render('technician/Jobs');
    }
    public function jobDetails($id){
        return Inertia::render('technician/JobDetails', ['id' => $id]);
    }
    public function wallet(){
        return Inertia::render('technician/Wallet');
    }
    public function profile(){
        return Inertia::render('technician/Profile');
    }
    public function notifications(){
        return Inertia::render('technician/Notifications');
    }
    public function support(){
        return Inertia::render('technician/Support');
    }
    public function settings(){
        return Inertia::render('technician/Settings');
    }
    public function editProfile(){
        return Inertia::render('technician/EditProfile');
    }
    public function changePassword(){
        return Inertia::render('technician/ChangePassword');
    }
    public function bankDetails(){
        return Inertia::render('technician/BankDetails');
    }
    public function terms(){
        return Inertia::render('technician/Terms');
    }
    public function chat($id){
        return Inertia::render('technician/Chat', ['id' => $id]);
    }
    public function serviceArea(){
        return Inertia::render('technician/ServiceArea');
    }
    public function documents(){
        return Inertia::render('technician/Documents');
    }
    public function reviews(){
        return Inertia::render('technician/Reviews');
    }
    public function skills(){
        return Inertia::render('technician/Skills');
    }
}
