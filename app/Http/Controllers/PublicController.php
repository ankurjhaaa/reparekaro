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
        $addresses = auth()->check() ? auth()->user()->addresses : [];

        return Inertia::render('Public/BookNow', [
            'categories' => $categories,
            'addresses' => $addresses
        ]);
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

        if (auth()->check()) {
            $existingAddress = auth()->user()->addresses()
                ->where('address', $request->address)
                ->where('city', $request->city)
                ->first();

            if (!$existingAddress) {
                auth()->user()->addresses()->create([
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'city' => $request->city,
                    'landmark' => $request->landmark,
                    'address_type' => 'other',
                    'is_default' => false,
                ]);
            }
        }

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
        $bookings = Booking::where('user_id', auth()->id())->latest()->get();
        return Inertia::render('Public/MyBookings', ['bookings' => $bookings]);
    }
    public function bookingDetails($id)
    {
        $booking = Booking::with(['vendor'])->where('user_id', auth()->id())->where('booking_id', $id)->firstOrFail();
        return Inertia::render('Public/BookingDetails', ['booking' => $booking]);
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

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|string|max:20',
        ]);

        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully!');
    }

    public function changePassword()
    {
        return Inertia::render('Public/ChangePassword');
    }
    public function terms()
    {
        return Inertia::render('Public/Terms');
    }

    // --- Address CRUD ---
    public function addresses()
    {
        $addresses = auth()->user()->addresses()->latest()->get();
        return Inertia::render('Public/Addresses', ['addresses' => $addresses]);
    }

    public function storeAddress(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:6',
            'landmark' => 'nullable|string|max:255',
            'address_type' => 'required|in:home,office,other',
            'is_default' => 'boolean'
        ]);

        if ($request->is_default) {
            auth()->user()->addresses()->update(['is_default' => false]);
        }

        auth()->user()->addresses()->create($request->all());

        return redirect()->back()->with('success', 'Address added successfully.');
    }

    public function updateAddress(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:6',
            'landmark' => 'nullable|string|max:255',
            'address_type' => 'required|in:home,office,other',
            'is_default' => 'boolean'
        ]);

        $address = auth()->user()->addresses()->findOrFail($id);

        if ($request->is_default) {
            auth()->user()->addresses()->update(['is_default' => false]);
        }

        $address->update($request->all());

        return redirect()->back()->with('success', 'Address updated successfully.');
    }

    public function deleteAddress($id)
    {
        $address = auth()->user()->addresses()->findOrFail($id);
        $address->delete();

        return redirect()->back()->with('success', 'Address removed.');
    }
}
