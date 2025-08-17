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
        Schema::create('maintenance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->enum('type', ['routine', 'repair', 'inspection', 'cleaning', 'tire_change', 'oil_change', 'other']);
            $table->string('title'); // Titre de la maintenance
            $table->text('description')->nullable();
            $table->datetime('scheduled_date');
            $table->datetime('completed_date')->nullable();
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled');
            $table->decimal('cost', 10, 2)->default(0);
            $table->string('provider')->nullable(); // Garage, mécanicien, etc.
            $table->text('notes')->nullable();
            $table->json('parts_replaced')->nullable(); // Pièces remplacées
            $table->integer('mileage_at_maintenance')->nullable();
            $table->date('next_maintenance_date')->nullable(); // Prochaine maintenance prévue
            $table->boolean('is_recurring')->default(false);
            $table->integer('recurring_interval_days')->nullable();
            $table->timestamps();
            
            $table->index(['vehicle_id', 'status']);
            $table->index(['scheduled_date', 'status']);
            $table->index(['type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance');
    }
};
