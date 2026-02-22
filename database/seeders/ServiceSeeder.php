<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get our demo vendor
        $vendor = User::where('role', 'vendor')->first();

        if (!$vendor) {
            return;
        }

        $services = [
            [
                'vendor_id' => $vendor->id,
                'name' => 'AC Repair & Service',
                'slug' => Str::slug('AC Repair & Service'),
                'image_url' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=500',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'vendor_id' => $vendor->id,
                'name' => 'Plumbing Works',
                'slug' => Str::slug('Plumbing Works'),
                'image_url' => 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=500',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'vendor_id' => $vendor->id,
                'name' => 'Electrical Setup',
                'slug' => Str::slug('Electrical Setup'),
                'image_url' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'vendor_id' => $vendor->id,
                'name' => 'Home Cleaning',
                'slug' => Str::slug('Home Cleaning'),
                'image_url' => 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('services')->insert($services);
    }
}
