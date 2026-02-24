<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Service;
use App\Models\ServiceRate;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            'selectedServices' => 'required|array|min:1',
            'date' => 'required|string',
            'time' => 'required|string',
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'landmark' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            // 1. Handle User Authentication (Login or Register)
            if (Auth::check()) {
                $user = Auth::user();
            } else {
                // Check if user exists by phone (mobile)
                $user = User::where('phone', $request->mobile)->first();

                if (!$user) {
                    $user = User::create([
                        'name' => $request->name,
                        'phone' => $request->mobile,
                        'role' => 'user',
                        'password' => Hash::make('password'), // Direct password for guest
                    ]);
                }

                Auth::login($user);
            }

            $userId = $user->id;

            // 2. Handle Address Management
            $existingAddress = $user->addresses()
                ->where('address', $request->address)
                ->where('city', $request->city)
                ->first();

            if (!$existingAddress) {
                $user->addresses()->create([
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'city' => $request->city,
                    'landmark' => $request->landmark,
                    'address_type' => 'other',
                    'is_default' => $user->addresses()->count() === 0,
                ]);
            }

            // 3. Prepare Booking Data
            $serviceIds = collect($request->selectedServices)->pluck('id')->toArray();
            $totalAmount = collect($request->selectedServices)->sum('price');

            // Pick the vendor from the first service rate
            $firstService = ServiceRate::find($serviceIds[0]);
            $vendorId = $firstService ? $firstService->vendor_id : null;

            // Generate unique Booking ID
            do {
                $bookingId = 'RK-' . rand(100000, 999999);
            } while (Booking::where('booking_id', $bookingId)->exists());

            // 4. Create Booking
            $booking = Booking::create([
                'vendor_id' => $vendorId,
                'booking_id' => $bookingId,
                'user_id' => $userId,
                'date' => $request->date,
                'time' => $request->time,
                'service_ids' => json_encode($request->selectedServices),
                'total_amount' => $totalAmount,
                'name' => $request->name,
                'mobile' => $request->mobile,
                'address' => $request->address,
                'city' => $request->city,
                'landmark' => $request->landmark,
                'user_note' => $request->notes,
                'status' => 'pending',
                'source' => 'web',
                'otp' => rand(1000, 9999),
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Booking Confirmed! ID: ' . $bookingId);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Booking failed: ' . $e->getMessage()]);
        }
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
        $booking = Booking::with(['vendor', 'assignedTo', 'requirements'])->where('user_id', auth()->id())->where('booking_id', $id)->firstOrFail();
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
