<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function dashboard()
    {
        $vendorId = auth()->id();

        $bookingsCount = \App\Models\Booking::where('vendor_id', $vendorId)->count();
        $activeJobs = \App\Models\Booking::where('vendor_id', $vendorId)->whereIn('status', ['assigned', 'in_progress'])->count();
        $techniciansCount = \App\Models\User::where('role', 'technician')->where('vendor_id', $vendorId)->count();
        $revenue = \App\Models\Booking::where('vendor_id', $vendorId)->where('status', 'completed')->sum('total_amount');

        $recentBookings = \App\Models\Booking::with(['user', 'assignedTo'])
            ->where('vendor_id', $vendorId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Vendor/Dashboard', [
            'stats' => [
                'totalBookings' => $bookingsCount,
                'activeJobs' => $activeJobs,
                'techniciansCount' => $techniciansCount,
                'revenue' => $revenue
            ],
            'recentBookings' => $recentBookings
        ]);
    }
    public function technicians(Request $request)
    {
        $query = \App\Models\User::where('role', 'technician')
            ->where('vendor_id', auth()->id());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $technicians = $query->withCount('assignedJobs as jobs')->latest()->get();
        return Inertia::render('Vendor/Technicians', [
            'technicians' => $technicians,
            'filters' => $request->only(['search'])
        ]);
    }

    public function storeTechnician(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8',
        ]);

        \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'role' => 'technician',
            'vendor_id' => auth()->id(),
            'status' => 'Active',
            'rating' => 5.0,
        ]);

        return back()->with('success', 'Technician added successfully.');
    }

    public function updateTechnician(Request $request, $id)
    {
        $technician = \App\Models\User::where('role', 'technician')
            ->where('vendor_id', auth()->id())
            ->findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ];

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $technician->update($data);

        return back()->with('success', 'Technician updated successfully.');
    }

    public function destroyTechnician($id)
    {
        $technician = \App\Models\User::where('role', 'technician')
            ->where('vendor_id', auth()->id())
            ->findOrFail($id);

        $technician->delete();

        return back()->with('success', 'Technician removed successfully.');
    }
    public function bookings()
    {
        $bookings = \App\Models\Booking::with(['user', 'assignedTo'])
            ->where('vendor_id', auth()->id())
            ->latest()
            ->get();

        $technicians = \App\Models\User::where('role', 'technician')
            ->where('vendor_id', auth()->id())
            ->where('status', 'Active')
            ->get(['id', 'name']);

        return Inertia::render('Vendor/Bookings', [
            'bookings' => $bookings,
            'technicians' => $technicians
        ]);
    }

    public function assignBooking(Request $request, $id)
    {
        $booking = \App\Models\Booking::where('vendor_id', auth()->id())->findOrFail($id);

        $request->validate([
            'technician_id' => 'required|exists:users,id'
        ]);

        $booking->update([
            'assigned_to' => $request->technician_id,
            'status' => 'assigned'
        ]);

        return back()->with('success', 'Booking assigned successfully.');
    }

    public function updateBookingStatus(Request $request, $id)
    {
        $booking = \App\Models\Booking::where('vendor_id', auth()->id())->findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,assigned,in_progress,completed,cancelled'
        ]);

        $booking->update(['status' => $request->status]);

        return back()->with('success', 'Booking status updated successfully.');
    }

    public function customers()
    {
        // Get unique users who have booked with this vendor
        $customers = \App\Models\Booking::with('user')
            ->where('vendor_id', auth()->id())
            ->get()
            ->pluck('user')
            ->unique('id')
            ->filter()
            ->values();

        return Inertia::render('Vendor/Customers', ['customers' => $customers]);
    }
    public function services()
    {
        $services = \App\Models\Service::with('rates')
            ->where('vendor_id', auth()->id())
            ->get();
        return Inertia::render('Vendor/Services', ['services' => $services]);
    }

    // --- Service CRUD ---

    public function storeService(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'image_url' => 'nullable|url|max:255',
        ]);

        \App\Models\Service::create([
            'vendor_id' => auth()->id(),
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'image' => $request->image,
            'image_url' => $request->image_url,
        ]);

        return back()->with('success', 'Service category created successfully.');
    }

    public function updateService(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'image_url' => 'nullable|url|max:255',
        ]);

        $service = \App\Models\Service::where('vendor_id', auth()->id())->findOrFail($id);
        $service->update([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'image' => $request->image,
            'image_url' => $request->image_url,
        ]);

        return back()->with('success', 'Service category updated successfully.');
    }

    public function destroyService($id)
    {
        $service = \App\Models\Service::where('vendor_id', auth()->id())->findOrFail($id);
        $service->delete();

        return back()->with('success', 'Service category deleted successfully.');
    }

    // --- Service Rate CRUD ---

    public function storeServiceRate(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'title' => 'required|string|max:255',
            'duration' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'includes' => 'nullable|array',
        ]);

        // Ensure the service belongs to the vendor
        \App\Models\Service::where('vendor_id', auth()->id())->findOrFail($request->service_id);

        \App\Models\ServiceRate::create([
            'vendor_id' => auth()->id(),
            'service_id' => $request->service_id,
            'title' => $request->title,
            'duration' => $request->duration,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'includes' => $request->includes,
        ]);

        return back()->with('success', 'Service rate added successfully.');
    }

    public function updateServiceRate(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'includes' => 'nullable|array',
        ]);

        $rate = \App\Models\ServiceRate::where('vendor_id', auth()->id())->findOrFail($id);
        $rate->update([
            'title' => $request->title,
            'duration' => $request->duration,
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'includes' => $request->includes,
        ]);

        return back()->with('success', 'Service rate updated successfully.');
    }

    public function destroyServiceRate($id)
    {
        $rate = \App\Models\ServiceRate::where('vendor_id', auth()->id())->findOrFail($id);
        $rate->delete();

        return back()->with('success', 'Service rate deleted successfully.');
    }

    public function reports()
    {
        return Inertia::render('Vendor/Reports');
    }
    public function settings()
    {
        return Inertia::render('Vendor/Settings');
    }
}
