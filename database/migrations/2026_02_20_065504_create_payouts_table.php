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
        Schema::create('payouts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('vendor_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('technician_id')->nullable()->constrained()->nullOnDelete();

            $table->decimal('amount', 10, 2);
            $table->enum('type', ['vendor', 'technician']);

            $table->enum('status', ['pending', 'processed', 'failed'])
                ->default('pending');

            $table->string('transaction_reference')->nullable();
            $table->timestamp('processed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};
