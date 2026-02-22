<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ServiceRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vendor = User::where('role', 'vendor')->first();

        if (!$vendor)
            return;

        $acService = DB::table('services')->where('slug', 'ac-repair-service')->first();
        $plumbing = DB::table('services')->where('slug', 'plumbing-works')->first();
        $electrical = DB::table('services')->where('slug', 'electrical-setup')->first();

        $rates = [];

        // AC Service Rates
        if ($acService) {
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $acService->id,
                'title' => 'Standard AC Regular Service',
                'duration' => '45 mins',
                'price' => 599.00,
                'discount_price' => 499.00,
                'includes' => json_encode(['Filter cleaning', 'Gas check', 'Coil wash']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $acService->id,
                'title' => 'AC Deep Cleaning (Jet Wash)',
                'duration' => '90 mins',
                'price' => 999.00,
                'discount_price' => 799.00,
                'includes' => json_encode(['Jet pump wash', 'Deep cooling coil cleaning', 'Outdoor unit wash']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Plumbing Rates
        if ($plumbing) {
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $plumbing->id,
                'title' => 'Tap/Faucet Repair & Replace',
                'duration' => '30 mins',
                'price' => 249.00,
                'discount_price' => 199.00,
                'includes' => json_encode(['Leakage fixing', 'Washer replacement']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $plumbing->id,
                'title' => 'Blockage Clearance',
                'duration' => '60 mins',
                'price' => 499.00,
                'discount_price' => 399.00,
                'includes' => json_encode(['Sink drainage clearing', 'Pipe blockage removal']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Electrical Rates
        if ($electrical) {
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $electrical->id,
                'title' => 'Fan Installation / Repair',
                'duration' => '30 mins',
                'price' => 299.00,
                'discount_price' => 249.00,
                'includes' => json_encode(['Ceiling fan installation', 'Regulator replacement']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $rates[] = [
                'vendor_id' => $vendor->id,
                'service_id' => $electrical->id,
                'title' => 'Switchboard Repair/Replace',
                'duration' => '40 mins',
                'price' => 349.00,
                'discount_price' => 299.00,
                'includes' => json_encode(['Switch replacement', 'Socket installation']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('service_rates')->insert($rates);
    }
}
