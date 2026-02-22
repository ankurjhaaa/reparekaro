<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(PublicController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/book-now', 'bookNow')->name('book-now');
    Route::post('/book-now', 'storeBooking')->name('book-now.store');
    Route::get('/services', 'services')->name('services');
    Route::get('/about', 'about')->name('about');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/help', 'help')->name('help');
    Route::get('/terms', 'terms')->name('terms');
    Route::get('/profile', 'profile')->name('profile');

    // Private Routes
    Route::middleware('auth')->group(function () {
        Route::get('/my-bookings', 'myBookings')->name('my-bookings');
        Route::get('/booking/{id}', 'bookingDetails')->name('booking.details');
        Route::get('/saved-services', 'savedServices')->name('saved-services');
        Route::get('/notifications', 'notifications')->name('notifications');
        Route::get('/settings', 'settings')->name('settings');
        Route::get('/chat/{id}', 'chat')->name('chat');
        Route::get('/edit-profile', 'editProfile')->name('edit-profile');
        Route::get('/change-password', 'changePassword')->name('change-password');

        // Dynamic Profile Updates
        Route::post('/edit-profile', 'updateProfile')->name('update-profile');

        // Address CRUD
        Route::get('/addresses', 'addresses')->name('addresses');
        Route::post('/addresses', 'storeAddress')->name('addresses.store');
        Route::put('/addresses/{id}', 'updateAddress')->name('addresses.update');
        Route::delete('/addresses/{id}', 'deleteAddress')->name('addresses.destroy');
    });
});

Route::controller(TechnicianController::class)->middleware(['auth', 'role:technician'])->prefix('technician')->group(function () {
    Route::get('/dashboard', 'dashboard')->name('technician.dashboard');
    Route::get('/jobs', 'jobs')->name('technician.jobs');
    Route::get('/job/{id}', 'jobDetails')->name('technician.job.details');
    Route::get('/wallet', 'wallet')->name('technician.wallet');
    Route::get('/profile', 'profile')->name('technician.profile');
    Route::get('/notifications', 'notifications')->name('technician.notifications');
    Route::get('/support', 'support')->name('technician.support');
    Route::get('/settings', 'settings')->name('technician.settings');
    Route::get('/edit-profile', 'editProfile')->name('technician.edit-profile');
    Route::get('/change-password', 'changePassword')->name('technician.change-password');
    Route::get('/bank-details', 'bankDetails')->name('technician.bank-details');
    Route::get('/terms', 'terms')->name('technician.terms');
    Route::get('/chat/{id}', 'chat')->name('technician.chat');
    Route::get('/service-area', 'serviceArea')->name('technician.service-area');
    Route::get('/documents', 'documents')->name('technician.documents');
    Route::get('/reviews', 'reviews')->name('technician.reviews');
    Route::get('/skills', 'skills')->name('technician.skills');
});

Route::controller(VendorController::class)->middleware(['auth', 'role:vendor'])->prefix('vendor')->group(function () {
    Route::get('/dashboard', 'dashboard')->name('vendor.dashboard');
    Route::get('/technicians', 'technicians')->name('vendor.technicians');
    Route::get('/bookings', 'bookings')->name('vendor.bookings');
    Route::get('/services', 'services')->name('vendor.services');
    Route::get('/reports', 'reports')->name('vendor.reports');
    Route::get('/settings', 'settings')->name('vendor.settings');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'login')->name('login');
    Route::post('/login', 'authenticate');
    Route::get('/signup', 'signup')->name('signup');
    Route::post('/signup', 'store');
    Route::post('/logout', 'logout')->name('logout');
});

// Route::get('/login', function () {
//     return Inertia::render('Auth/Login');
// })->name('login');

// Route::get('/signup', function () {
//     return Inertia::render('Auth/Signup');
// })->name('signup');

// Vendor Routes
Route::prefix('vendor')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Vendor/Dashboard');
    })->name('vendor.dashboard');
    Route::get('/bookings', function () {
        return Inertia::render('Vendor/Bookings');
    })->name('vendor.bookings');
    Route::get('/technicians', function () {
        return Inertia::render('Vendor/Technicians');
    })->name('vendor.technicians');
    Route::get('/services', function () {
        return Inertia::render('Vendor/Services');
    })->name('vendor.services');
    Route::get('/customers', function () {
        return Inertia::render('Vendor/Customers');
    })->name('vendor.customers');
    Route::get('/reports', function () {
        return Inertia::render('Vendor/Reports');
    })->name('vendor.reports');
});

// SuperAdmin Routes
Route::prefix('superadmin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('superadmin.dashboard');
    Route::get('/vendors', function () {
        return Inertia::render('SuperAdmin/Vendors');
    })->name('superadmin.vendors');
    Route::get('/subscriptions', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('superadmin.subscriptions'); // Placeholder
    Route::get('/plans', function () {
        return Inertia::render('SuperAdmin/Plans');
    })->name('superadmin.plans');
    Route::get('/platform-settings', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('superadmin.settings'); // Placeholder
});


