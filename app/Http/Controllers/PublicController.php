<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use App\Models\ServiceRate;
use App\Models\Booking;

class PublicController extends Controller
{
    public function home()
    {
        $services = Service::all();
        return Inertia::render('Public/Home', ['services' => $services]);
    }

    public function bookNow()
    {
        // Give frontend 'Services' grouped with their corresponding 'ServiceRates'
        $categories = Service::with('rates')->get();
        return Inertia::render('Public/BookNow', ['categories' => $categories]);
    }

    public function storeBooking(Request $request)
    {
        $request->validate([
            'selectedServices' => 'required|array',
            'date' => 'required|string',
            'time' => 'required|string',
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'landmark' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $serviceIds = collect($request->selectedServices)->pluck('id')->toArray();
        $totalAmount = collect($request->selectedServices)->sum('price');

        // Pick the vendor from the first service rate
        $firstService = ServiceRate::find($serviceIds[0]);
        $vendorId = $firstService ? $firstService->vendor_id : null;

        $booking = new Booking();
        $booking->vendor_id = $vendorId;
        $booking->booking_id = 'RK-' . strtoupper(uniqid());
        $booking->user_id = auth()->id();
        $booking->date = $request->date;
        $booking->time = $request->time;
        // Save the raw, rich objects array requested by the user instead of flat ids
        $booking->service_ids = json_encode($request->selectedServices);
        $booking->total_amount = $totalAmount;

        // New Schema Fields
        $booking->name = $request->name;
        $booking->mobile = $request->mobile;
        $booking->address = $request->address;
        $booking->city = $request->city;
        $booking->landmark = $request->landmark;
        $booking->user_note = $request->notes;
        $booking->status = 'pending';
        // Source defaults to web if we are coming from the website frontend
        $booking->source = 'web';
        $booking->save();

        return redirect()->back()->with('success', 'Booking Confirmed!');
    }

    public function services()
    {
        $serviceRates = ServiceRate::with('service')->get();
        return Inertia::render('Public/Services', ['serviceRates' => $serviceRates]);
    }

    public function profile()
    {
        return Inertia::render('Public/Profile');
    }

    public function about()
    {
        return Inertia::render('Public/About');
    }
    public function contact()
    {
        return Inertia::render('Public/Contact');
    }
    public function help()
    {
        return Inertia::render('Public/Help');
    }
    public function myBookings()
    {
        return Inertia::render('Public/MyBookings');
    }
    public function bookingDetails($id)
    {
        return Inertia::render('Public/BookingDetails', ['id' => $id]);
    }
    public function savedServices()
    {
        return Inertia::render('Public/SavedServices');
    }
    public function notifications()
    {
        return Inertia::render('Public/Notifications');
    }
    public function settings()
    {
        return Inertia::render('Public/Settings');
    }
    public function chat($id)
    {
        return Inertia::render('Public/Chat', ['id' => $id]);
    }
    public function editProfile()
    {
        return Inertia::render('Public/EditProfile');
    }
    public function changePassword()
    {
        return Inertia::render('Public/ChangePassword');
    }
    public function terms()
    {
        return Inertia::render('Public/Terms');
    }
}
