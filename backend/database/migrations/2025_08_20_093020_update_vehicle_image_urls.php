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
        // Corriger les URLs d'images des véhicules (syntaxe PostgreSQL)
        $oldDomain = 'https://senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app';
        $newDomain = 'https://senerentcar.vercel.app';
        
        // PostgreSQL: Convertir JSON → text → replace → JSON
        DB::statement("
            UPDATE vehicles 
            SET images = REPLACE(images::text, ?, ?)::json
            WHERE images::text LIKE ?
        ", [$oldDomain, $newDomain, "%{$oldDomain}%"]);
        
        echo "URLs d'images des véhicules mises à jour avec PostgreSQL\n";
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restaurer les anciennes URLs si nécessaire (PostgreSQL)
        $newDomain = 'https://senerentcar.vercel.app';
        $oldDomain = 'https://senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app';
        
        DB::statement("
            UPDATE vehicles 
            SET images = REPLACE(images::text, ?, ?)::json
            WHERE images::text LIKE ?
        ", [$newDomain, $oldDomain, "%{$newDomain}%"]);
    }
};
