<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FixImageUrls extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:image-urls {--dry-run : Voir les changements sans les appliquer}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Corriger les URLs d\'images des véhicules pour pointer vers le bon domaine Vercel';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $oldDomain = 'https://senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app';
        $newDomain = 'https://senerentcar.vercel.app';
        
        $vehicles = \DB::table('vehicles')
            ->whereRaw('images::text LIKE ?', ['%' . $oldDomain . '%'])
            ->get(['id', 'name', 'images']);
            
        if ($vehicles->isEmpty()) {
            $this->info('✅ Aucune URL à corriger trouvée.');
            return;
        }
        
        $this->info("🔍 Trouvé {$vehicles->count()} véhicules avec des URLs à corriger:");
        
        foreach ($vehicles as $vehicle) {
            $oldImages = $vehicle->images;
            $newImages = str_replace($oldDomain, $newDomain, $oldImages);
            
            $this->line("📝 {$vehicle->name} (ID: {$vehicle->id})");
            $this->line("   Ancien: {$oldImages}");
            $this->line("   Nouveau: {$newImages}");
            $this->newLine();
        }
        
        if ($this->option('dry-run')) {
            $this->warn('🧪 Mode dry-run: Aucune modification appliquée.');
            return;
        }
        
        if ($this->confirm('Appliquer ces corrections ?')) {
            // Utiliser PostgreSQL REPLACE avec cast JSON
            $updated = \DB::statement("
                UPDATE vehicles 
                SET images = REPLACE(images::text, ?, ?)::json
                WHERE images::text LIKE ?
            ", [$oldDomain, $newDomain, "%{$oldDomain}%"]);
            
            $count = \DB::table('vehicles')
                ->whereRaw('images::text LIKE ?', ['%' . $newDomain . '%'])
                ->count();
                
            $this->success("✅ {$count} véhicules mis à jour avec succès !");
        } else {
            $this->info('❌ Opération annulée.');
        }
    }
}
