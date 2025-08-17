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
            $table->string('booking_number')->unique(); // Numéro de réservation unique
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->string('pickup_location');
            $table->string('dropoff_location');
            $table->decimal('daily_rate', 10, 2); // Prix par jour au moment de la réservation
            $table->integer('number_of_days');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('insurance_cost', 8, 2)->default(0);
            $table->decimal('additional_fees', 8, 2)->default(0);
            $table->decimal('discount_amount', 8, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'partial', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('driver_license_number');
            $table->date('driver_license_expiry');
            $table->json('additional_drivers')->nullable(); // Conducteurs supplémentaires
            $table->text('special_requests')->nullable();
            $table->text('terms_accepted')->nullable();
            $table->datetime('confirmed_at')->nullable();
            $table->datetime('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['vehicle_id', 'start_date', 'end_date']);
            $table->index(['status', 'start_date']);
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
