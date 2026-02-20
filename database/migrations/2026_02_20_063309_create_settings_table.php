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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            
            // 🔹 Basic Website Info
            $table->string('site_name')->nullable();
            $table->string('site_tagline')->nullable();
            $table->string('site_logo')->nullable();
            $table->string('favicon')->nullable();

            // 🔹 Contact Info
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('support_email')->nullable();

            // 🔹 Address Info
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();

            // 🔹 Social Media Links
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('youtube_url')->nullable();

            // 🔹 SEO Settings
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();

            // 🔹 Business Settings
            $table->string('business_hours')->nullable();
            $table->boolean('maintenance_mode')->default(false);
            $table->boolean('registration_enabled')->default(true);

            // 🔹 Payment Settings
            $table->string('currency')->default('INR');
            $table->string('currency_symbol')->default('₹');

            // 🔹 Footer
            $table->text('footer_about')->nullable();
            $table->string('copyright_text')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
