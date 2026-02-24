<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnicianController extends Controller
{
    public function dashboard()
    {
        $technicianId = auth()->id();

        $jobsCount = \App\Models\Booking::where('assigned_to', $technicianId)->count();
        $completedJobs = \App\Models\Booking::where('assigned_to', $technicianId)->where('status', 'completed')->count();
        $pendingJobs = \App\Models\Booking::where('assigned_to', $technicianId)->whereIn('status', ['assigned', 'in_progress'])->count();
        $earnings = \App\Models\Booking::where('assigned_to', $technicianId)->where('status', 'completed')->sum('total_amount'); // Consider percentage later

        $todayJobs = \App\Models\Booking::with(['user'])
            ->where('assigned_to', $technicianId)
            ->whereIn('status', ['assigned', 'in_progress'])
            ->whereDate('created_at', today())
            ->get();

        $stats = [
            'totalJobs' => $jobsCount,
            'completedJobs' => $completedJobs,
            'pendingJobs' => $pendingJobs,
            'earnings' => $earnings,
            'rating' => auth()->user()->rating ?? 5.0
        ];

        return Inertia::render('Technician/Dashboard', [
            'stats' => $stats,
            'todayJobs' => $todayJobs
        ]);
    }
    public function jobs()
    {
        $technicianId = auth()->id();
        $jobs = \App\Models\Booking::with(['user', 'vendor'])
            ->where('assigned_to', $technicianId)
            ->latest()
            ->get();

        return Inertia::render('Technician/Jobs', [
            'jobs' => $jobs
        ]);
    }
    public function jobDetails($id)
    {
        $job = \App\Models\Booking::with(['user', 'vendor', 'requirements'])
            ->where('assigned_to', auth()->id())
            ->findOrFail($id);

        return Inertia::render('Technician/JobDetails', ['job' => $job]);
    }
    public function completeJob(Request $request, $id)
    {
        $request->validate([
            'otp' => 'required|string|size:4'
        ]);

        $job = \App\Models\Booking::where('assigned_to', auth()->id())
            ->whereIn('status', ['assigned', 'in_progress'])
            ->findOrFail($id);

        if ($job->otp !== $request->otp) {
            return back()->withErrors(['otp' => 'Invalid OTP. Please check with customer.']);
        }

        $job->update([
            'status' => 'completed',
            'is_paid' => true // Assuming payment is confirmed via OTP
        ]);

        return redirect()->route('technician.jobs')->with('success', 'Job completed successfully.');
    }
    public function storeRequirement(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'qty' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0'
        ]);

        $booking = \App\Models\Booking::where('assigned_to', auth()->id())
            ->where('status', '!=', 'completed')
            ->findOrFail($id);

        $total_price = $request->qty * $request->price;

        $booking->requirements()->create([
            'name' => $request->name,
            'qty' => $request->qty,
            'price' => $request->price,
            'total_price' => $total_price
        ]);

        return back()->with('success', 'Requirement added successfully.');
    }

    public function wallet()
    {
        return Inertia::render('Technician/Wallet', [
            'earnings' => \App\Models\Booking::where('assigned_to', auth()->id())->where('status', 'completed')->sum('total_amount')
        ]);
    }
    public function profile()
    {
        $technician = auth()->user();
        $completedJobs = \App\Models\Booking::where('assigned_to', $technician->id)->where('status', 'completed')->count();

        return Inertia::render('Technician/Profile', [
            'user' => $technician,
            'stats' => [
                'jobs' => $completedJobs,
                'rating' => $technician->rating ?? 5.0
            ]
        ]);
    }
    public function notifications()
    {
        return Inertia::render('Technician/Notifications');
    }
    public function support()
    {
        return Inertia::render('Technician/Support');
    }
    public function settings()
    {
        return Inertia::render('Technician/Settings', [
            'user' => auth()->user()
        ]);
    }
    public function editProfile()
    {
        return Inertia::render('Technician/EditProfile');
    }
    public function changePassword()
    {
        return Inertia::render('Technician/ChangePassword');
    }
    public function bankDetails()
    {
        return Inertia::render('Technician/BankDetails');
    }
    public function terms()
    {
        return Inertia::render('Technician/Terms');
    }
    public function chat($id)
    {
        return Inertia::render('Technician/Chat', ['id' => $id]);
    }
    public function serviceArea()
    {
        return Inertia::render('Technician/ServiceArea');
    }
    public function documents()
    {
        return Inertia::render('Technician/Documents');
    }
    public function reviews()
    {
        return Inertia::render('Technician/Reviews');
    }
    public function skills()
    {
        return Inertia::render('Technician/Skills');
    }
}
