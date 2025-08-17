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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('name');
            $table->string('brand');
            $table->string('model');
            $table->integer('year');
            $table->string('license_plate')->unique();
            $table->enum('fuel_type', ['gasoline', 'diesel', 'hybrid', 'electric'])->default('gasoline');
            $table->enum('transmission', ['manual', 'automatic'])->default('manual');
            $table->integer('seats')->default(5);
            $table->integer('doors')->default(4);
            $table->boolean('air_conditioning')->default(false);
            $table->decimal('price_per_day', 10, 2);
            $table->json('images')->nullable(); // URLs des images Cloudinary
            $table->text('description')->nullable();
            $table->json('features')->nullable(); // GPS, Bluetooth, etc.
            $table->string('location')->default('Dakar'); // Lieu de prise en charge
            $table->enum('status', ['available', 'rented', 'maintenance', 'inactive'])->default('available');
            $table->integer('mileage')->default(0); // Kilométrage
            $table->string('color')->nullable();
            $table->decimal('insurance_cost', 8, 2)->default(0);
            $table->decimal('deposit_amount', 10, 2)->default(0);
            $table->boolean('is_featured')->default(false);
            $table->softDeletes(); // Soft deletes pour les véhicules
            $table->timestamps();
            
            $table->index(['status', 'location']);
            $table->index(['category_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
