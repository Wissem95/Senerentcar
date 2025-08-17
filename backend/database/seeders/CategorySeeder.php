<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Économique',
                'description' => 'Véhicules économiques et pratiques pour vos déplacements quotidiens en ville',
                'image_url' => 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Compact',
                'description' => 'Véhicules compacts parfaits pour naviguer dans le trafic urbain de Dakar',
                'image_url' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Berline',
                'description' => 'Berlines confortables pour vos trajets d\'affaires et longs voyages',
                'image_url' => 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'SUV',
                'description' => 'SUVs robustes adaptés aux routes sénégalaises et aux familles nombreuses',
                'image_url' => 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
                'is_active' => true,
            ],
            [
                'name' => '4x4',
                'description' => 'Véhicules tout-terrain pour vos aventures vers Saint-Louis, Saly ou la Casamance',
                'image_url' => 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Minibus',
                'description' => 'Minibus et vans pour le transport de groupes et événements',
                'image_url' => 'https://images.unsplash.com/photo-1570733292481-86e45b52d2c5?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Luxe',
                'description' => 'Véhicules de luxe pour vos occasions spéciales et voyages VIP',
                'image_url' => 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Utilitaire',
                'description' => 'Véhicules utilitaires pour vos besoins de transport et déménagement',
                'image_url' => 'https://images.unsplash.com/photo-1586185777557-b0c4516db602?w=400',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }

        $this->command->info('Catégories créées avec succès!');
    }
}
