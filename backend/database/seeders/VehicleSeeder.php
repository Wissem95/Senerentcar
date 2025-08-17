<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = \App\Models\Category::all()->keyBy('name');

        $vehicles = [
            // Économique
            [
                'category_id' => $categories['Économique']->id,
                'name' => 'Renault Clio',
                'brand' => 'Renault',
                'model' => 'Clio',
                'year' => 2022,
                'license_plate' => 'DK-1234-AB',
                'fuel_type' => 'gasoline',
                'transmission' => 'manual',
                'seats' => 5,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 25000,
                'images' => [
                    'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800',
                    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
                ],
                'description' => 'Véhicule économique idéal pour vos déplacements en ville',
                'features' => ['Climatisation', 'Radio Bluetooth', 'Airbags', 'Verrouillage centralisé'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 15000,
                'color' => 'Blanc',
                'insurance_cost' => 2500,
                'deposit_amount' => 50000,
                'is_featured' => true,
            ],
            [
                'category_id' => $categories['Économique']->id,
                'name' => 'Peugeot 208',
                'brand' => 'Peugeot',
                'model' => '208',
                'year' => 2021,
                'license_plate' => 'DK-1235-AB',
                'fuel_type' => 'gasoline',
                'transmission' => 'manual',
                'seats' => 5,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 27000,
                'images' => [
                    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
                ],
                'description' => 'Peugeot 208 fiable et économique',
                'features' => ['Climatisation', 'GPS', 'USB', 'Direction assistée'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 22000,
                'color' => 'Rouge',
                'insurance_cost' => 2700,
                'deposit_amount' => 54000,
                'is_featured' => false,
            ],

            // Compact
            [
                'category_id' => $categories['Compact']->id,
                'name' => 'Hyundai i20',
                'brand' => 'Hyundai',
                'model' => 'i20',
                'year' => 2023,
                'license_plate' => 'DK-2234-CD',
                'fuel_type' => 'gasoline',
                'transmission' => 'automatic',
                'seats' => 5,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 30000,
                'images' => [
                    'https://images.unsplash.com/photo-1562141961-d378eecc73c8?w=800'
                ],
                'description' => 'Compact moderne avec boîte automatique',
                'features' => ['Boîte automatique', 'Climatisation auto', 'GPS intégré', 'Caméra de recul'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 8000,
                'color' => 'Gris',
                'insurance_cost' => 3000,
                'deposit_amount' => 60000,
                'is_featured' => true,
            ],

            // Berline
            [
                'category_id' => $categories['Berline']->id,
                'name' => 'Toyota Camry',
                'brand' => 'Toyota',
                'model' => 'Camry',
                'year' => 2022,
                'license_plate' => 'DK-3334-EF',
                'fuel_type' => 'gasoline',
                'transmission' => 'automatic',
                'seats' => 5,
                'doors' => 4,
                'air_conditioning' => true,
                'price_per_day' => 45000,
                'images' => [
                    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
                ],
                'description' => 'Berline de luxe pour vos déplacements d\'affaires',
                'features' => ['Intérieur cuir', 'GPS premium', 'Climatisation bi-zone', 'Sièges chauffants'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 12000,
                'color' => 'Noir',
                'insurance_cost' => 4500,
                'deposit_amount' => 90000,
                'is_featured' => true,
            ],

            // SUV
            [
                'category_id' => $categories['SUV']->id,
                'name' => 'Hyundai Tucson',
                'brand' => 'Hyundai',
                'model' => 'Tucson',
                'year' => 2023,
                'license_plate' => 'DK-4444-GH',
                'fuel_type' => 'gasoline',
                'transmission' => 'automatic',
                'seats' => 7,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 50000,
                'images' => [
                    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
                ],
                'description' => 'SUV spacieux parfait pour les familles',
                'features' => ['7 places', '4x4', 'Toit ouvrant', 'Système multimédia'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 5000,
                'color' => 'Bleu',
                'insurance_cost' => 5000,
                'deposit_amount' => 100000,
                'is_featured' => true,
            ],

            // 4x4
            [
                'category_id' => $categories['4x4']->id,
                'name' => 'Toyota Land Cruiser',
                'brand' => 'Toyota',
                'model' => 'Land Cruiser',
                'year' => 2022,
                'license_plate' => 'DK-5555-IJ',
                'fuel_type' => 'diesel',
                'transmission' => 'automatic',
                'seats' => 8,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 75000,
                'images' => [
                    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'
                ],
                'description' => 'Land Cruiser robuste pour tous terrains',
                'features' => ['4x4 permanent', 'Treuil', 'Pneus tout-terrain', 'Réservoir longue autonomie'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 18000,
                'color' => 'Blanc',
                'insurance_cost' => 7500,
                'deposit_amount' => 150000,
                'is_featured' => true,
            ],

            // Minibus
            [
                'category_id' => $categories['Minibus']->id,
                'name' => 'Hyundai H1',
                'brand' => 'Hyundai',
                'model' => 'H1',
                'year' => 2021,
                'license_plate' => 'DK-6666-KL',
                'fuel_type' => 'diesel',
                'transmission' => 'manual',
                'seats' => 12,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 60000,
                'images' => [
                    'https://images.unsplash.com/photo-1570733292481-86e45b52d2c5?w=800'
                ],
                'description' => 'Minibus confortable pour le transport de groupe',
                'features' => ['12 places', 'Climatisation arrière', 'Porte coulissante', 'Espace bagages'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 35000,
                'color' => 'Gris',
                'insurance_cost' => 6000,
                'deposit_amount' => 120000,
                'is_featured' => false,
            ],

            // Luxe
            [
                'category_id' => $categories['Luxe']->id,
                'name' => 'Mercedes-Benz E-Class',
                'brand' => 'Mercedes-Benz',
                'model' => 'E-Class',
                'year' => 2023,
                'license_plate' => 'DK-7777-MN',
                'fuel_type' => 'gasoline',
                'transmission' => 'automatic',
                'seats' => 5,
                'doors' => 4,
                'air_conditioning' => true,
                'price_per_day' => 100000,
                'images' => [
                    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
                ],
                'description' => 'Mercedes de prestige avec chauffeur disponible',
                'features' => ['Cuir Nappa', 'Toit panoramique', 'Audio Burmester', 'Conduite autonome'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 3000,
                'color' => 'Noir métallisé',
                'insurance_cost' => 10000,
                'deposit_amount' => 200000,
                'is_featured' => true,
            ],

            // Utilitaire
            [
                'category_id' => $categories['Utilitaire']->id,
                'name' => 'Ford Transit',
                'brand' => 'Ford',
                'model' => 'Transit',
                'year' => 2020,
                'license_plate' => 'DK-8888-OP',
                'fuel_type' => 'diesel',
                'transmission' => 'manual',
                'seats' => 3,
                'doors' => 3,
                'air_conditioning' => true,
                'price_per_day' => 40000,
                'images' => [
                    'https://images.unsplash.com/photo-1586185777557-b0c4516db602?w=800'
                ],
                'description' => 'Utilitaire spacieux pour vos transports',
                'features' => ['Grande capacité', 'Hayon arrière', 'Cloison de charge', 'GPS'],
                'location' => 'Dakar',
                'status' => 'available',
                'mileage' => 45000,
                'color' => 'Blanc',
                'insurance_cost' => 4000,
                'deposit_amount' => 80000,
                'is_featured' => false,
            ],

            // Additional vehicles for variety
            [
                'category_id' => $categories['SUV']->id,
                'name' => 'Honda CR-V',
                'brand' => 'Honda',
                'model' => 'CR-V',
                'year' => 2022,
                'license_plate' => 'DK-9999-QR',
                'fuel_type' => 'hybrid',
                'transmission' => 'automatic',
                'seats' => 5,
                'doors' => 5,
                'air_conditioning' => true,
                'price_per_day' => 55000,
                'images' => [
                    'https://images.unsplash.com/photo-1623074490371-1d0497caa8a6?w=800'
                ],
                'description' => 'SUV hybride économique et écologique',
                'features' => ['Moteur hybride', 'Consommation réduite', 'Honda Sensing', 'Coffre spacieux'],
                'location' => 'Dakar',
                'status' => 'maintenance',
                'mileage' => 20000,
                'color' => 'Argent',
                'insurance_cost' => 5500,
                'deposit_amount' => 110000,
                'is_featured' => false,
            ],
        ];

        foreach ($vehicles as $vehicle) {
            \App\Models\Vehicle::create($vehicle);
        }

        $this->command->info('Véhicules créés avec succès!');
    }
}
