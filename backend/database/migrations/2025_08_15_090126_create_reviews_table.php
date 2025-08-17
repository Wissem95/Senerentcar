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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->integer('rating')->unsigned(); // 1-5
            $table->text('comment')->nullable();
            $table->integer('cleanliness_rating')->unsigned()->nullable();
            $table->integer('condition_rating')->unsigned()->nullable();
            $table->integer('service_rating')->unsigned()->nullable();
            $table->integer('value_rating')->unsigned()->nullable();
            $table->json('photos')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_published')->default(true);
            $table->text('admin_response')->nullable();
            $table->datetime('admin_response_at')->nullable();
            $table->timestamps();
            
            $table->index(['vehicle_id', 'is_published']);
            $table->index(['user_id', 'is_published']);
            $table->index('booking_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};