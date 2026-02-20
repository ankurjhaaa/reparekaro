<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            $table->string('booking_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->timestamp('date')->nullable();
            $table->string('time')->nullable();

            //new
            $table->json('service_ids')->nullable();
            $table->string('payment_method')->nullable();
            $table->decimal('total_amount', 10, 2)->default(0);


            $table->string('name')->nullable();
            $table->string('mobile')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('landmark')->nullable();

            $table->boolean('is_paid')->default(false);
            $table->enum('status', [
                'pending',
                'confirmed',
                'assigned',
                'in_progress',
                'completed',
                'payment_pending',
                'cancelled',
                'failed',
                'rescheduled'
            ])->default('pending');
            $table->enum('source', ['app', 'web'])->default('app');

            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('start_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('admin_note')->nullable();
            $table->text('user_note')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('cancel_reason')->nullable();

            $table->string('otp')->nullable();
            $table->timestamp('otp_verified_at')->nullable();

            $table->json('additional_info')->nullable();
            

            $table->json('requirements')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
