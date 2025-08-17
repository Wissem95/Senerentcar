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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // SUV, Berline, Citadine, Pick-up, Utilitaire
            $table->string('slug')->unique()->nullable();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable(); // URL de l'image
            $table->string('icon')->nullable(); // Icône pour l'affichage
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
