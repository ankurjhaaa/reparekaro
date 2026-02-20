<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vendor_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('technician_id')->nullable()->constrained()->nullOnDelete();

            // Payment Details
            $table->string('transaction_id')->unique();
            $table->string('payment_gateway')->nullable(); // razorpay, stripe, etc
            $table->string('payment_method')->nullable();  // card, upi, wallet

            // Amounts
            $table->decimal('total_amount', 10, 2);
            $table->decimal('platform_commission', 10, 2)->default(0);
            $table->decimal('vendor_amount', 10, 2)->default(0);
            $table->decimal('technician_amount', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);

            // Status
            $table->enum('status', [
                'pending',
                'paid',
                'failed',
                'refunded',
                'partially_refunded'
            ])->default('pending');

            $table->timestamp('paid_at')->nullable();
            $table->text('gateway_response')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
