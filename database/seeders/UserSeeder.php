<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Superadmin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@repairkaro.com',
            'phone' => '9999999999',
            'password' => Hash::make('password123'),
            'role' => 'superadmin',
            'email_verified_at' => now(),
        ]);

        // 2. Vendor
        User::create([
            'name' => 'Demo Vendor',
            'email' => 'vendor@repairkaro.com',
            'phone' => '8888888888',
            'password' => Hash::make('password123'),
            'role' => 'vendor',
            'email_verified_at' => now(),
        ]);

        // 3. Technicians
        User::create([
            'name' => 'Technician One',
            'email' => 'tech1@repairkaro.com',
            'phone' => '7777777771',
            'password' => Hash::make('password123'),
            'role' => 'technician',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Technician Two',
            'email' => 'tech2@repairkaro.com',
            'phone' => '7777777772',
            'password' => Hash::make('password123'),
            'role' => 'technician',
            'email_verified_at' => now(),
        ]);

        // 4. Regular Users (Customers)
        User::create([
            'name' => 'Test Customer',
            'email' => 'test@example.com',
            'phone' => '6666666666',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
