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
        // Corriger les URLs d'images des véhicules
        DB::table('vehicles')
            ->where('images', 'LIKE', '%senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app%')
            ->update([
                'images' => DB::raw("REPLACE(images, 'https://senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app', 'https://senerentcar.vercel.app')")
            ]);
        
        echo "URLs d'images des véhicules mises à jour\n";
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restaurer les anciennes URLs si nécessaire
        DB::table('vehicles')
            ->where('images', 'LIKE', '%senerentcar.vercel.app%')
            ->update([
                'images' => DB::raw("REPLACE(images, 'https://senerentcar.vercel.app', 'https://senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app')")
            ]);
    }
};
