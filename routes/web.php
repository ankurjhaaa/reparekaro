<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('public/Home');
})->name('home');

Route::get('/book-now', function () {
    return Inertia::render('public/BookNow');
})->name('book-now');

Route::get('/services', function () {
    return Inertia::render('public/Services');
})->name('services');

Route::get('/profile', function () {
    return Inertia::render('public/Profile');
})->name('profile');

Route::get('/about', function () {
    return Inertia::render('public/About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('public/Contact');
})->name('contact');

Route::get('/help', function () {
    return Inertia::render('public/Help');
})->name('help');

Route::get('/my-bookings', function () {
    return Inertia::render('public/MyBookings');
})->name('my-bookings');

Route::get('/booking/{id}', function ($id) {
    return Inertia::render('public/BookingDetails', ['id' => $id]);
})->name('booking.details');

Route::get('/saved-services', function () {
    return Inertia::render('public/SavedServices');
})->name('saved-services');

Route::get('/notifications', function () {
    return Inertia::render('public/Notifications');
})->name('notifications');

Route::get('/settings', function () {
    return Inertia::render('public/Settings');
})->name('settings');

Route::get('/chat/{id}', function ($id) {
    return Inertia::render('public/Chat', ['id' => $id]);
})->name('chat');

Route::get('/edit-profile', function () {
    return Inertia::render('public/EditProfile');
})->name('edit-profile');

Route::get('/change-password', function () {
    return Inertia::render('public/ChangePassword');
})->name('change-password');

Route::get('/terms', function () {
    return Inertia::render('public/Terms');
})->name('terms');


// Technician Routes
Route::prefix('technician')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Technician/Home');
    })->name('technician.dashboard');

    Route::get('/jobs', function () {
        return Inertia::render('Technician/Jobs');
    })->name('technician.jobs');

    Route::get('/job/{id}', function ($id) {
        return Inertia::render('Technician/JobDetails', ['id' => $id]);
    })->name('technician.job.details');

    Route::get('/wallet', function () {
        return Inertia::render('Technician/Wallet');
    })->name('technician.wallet');

    Route::get('/profile', function () {
        return Inertia::render('Technician/Profile');
    })->name('technician.profile');

    Route::get('/notifications', function () {
        return Inertia::render('Technician/Notifications');
    })->name('technician.notifications');

    Route::get('/support', function () {
        return Inertia::render('Technician/Support');
    })->name('technician.support');

    Route::get('/settings', function () {
        return Inertia::render('Technician/Settings');
    })->name('technician.settings');

    Route::get('/edit-profile', function () {
        return Inertia::render('Technician/EditProfile');
    })->name('technician.edit-profile');

    Route::get('/change-password', function () {
        return Inertia::render('Technician/ChangePassword');
    })->name('technician.change-password');

    Route::get('/bank-details', function () {
        return Inertia::render('Technician/BankDetails');
    })->name('technician.bank-details');

    Route::get('/terms', function () {
        return Inertia::render('Technician/Terms');
    })->name('technician.terms');

    Route::get('/chat/{id}', function ($id) {
        return Inertia::render('Technician/Chat', ['id' => $id]);
    })->name('technician.chat');

    Route::get('/service-area', function () {
        return Inertia::render('Technician/ServiceArea');
    })->name('technician.service-area');

    Route::get('/documents', function () {
        return Inertia::render('Technician/Documents');
    })->name('technician.documents');

    Route::get('/reviews', function () {
        return Inertia::render('Technician/Reviews');
    })->name('technician.reviews');

    Route::get('/skills', function () {
        return Inertia::render('Technician/Skills');
    })->name('technician.skills');
});

// Vendor Routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->prefix('vendor')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Vendor/Dashboard');
    })->name('vendor.dashboard');

    Route::get('/technicians', function () {
        return Inertia::render('Vendor/Technicians');
    })->name('vendor.technicians');

    Route::get('/bookings', function () {
        return Inertia::render('Vendor/Bookings');
    })->name('vendor.bookings');

    Route::get('/services', function () {
        return Inertia::render('Vendor/Services');
    })->name('vendor.services');

    Route::get('/reports', function () {
        return Inertia::render('Vendor/Reports');
    })->name('vendor.reports');

    Route::get('/settings', function () {
        return Inertia::render('Vendor/Settings');
    })->name('vendor.settings');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/signup', function () {
    return Inertia::render('Auth/Signup');
})->name('signup');

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


