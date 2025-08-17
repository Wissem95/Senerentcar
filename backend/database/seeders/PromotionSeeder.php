<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promotion;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promotions = [
            [
                'code' => 'BIENVENUE2024',
                'name' => 'Offre de bienvenue',
                'description' => 'Réduction de 15% pour votre première location',
                'type' => 'percentage',
                'value' => 15,
                'minimum_amount' => 50000,
                'valid_from' => now()->subDays(30),
                'valid_until' => now()->addDays(60),
                'usage_limit' => 100,
                'usage_count' => 23,
                'usage_limit_per_user' => 1,
                'is_active' => true,
                'is_public' => true,
                'conditions' => json_encode([
                    'first_time_user' => true,
                    'minimum_days' => 3
                ]),
            ],
            [
                'code' => 'WEEKEND10',
                'name' => 'Promo Weekend',
                'description' => '10% de réduction sur les locations de weekend',
                'type' => 'percentage',
                'value' => 10,
                'minimum_amount' => 30000,
                'valid_from' => now()->subDays(10),
                'valid_until' => now()->addDays(20),
                'usage_limit' => null,
                'usage_count' => 45,
                'usage_limit_per_user' => 2,
                'is_active' => true,
                'is_public' => true,
                'conditions' => json_encode([
                    'weekend_only' => true,
                    'minimum_days' => 2
                ]),
            ],
            [
                'code' => 'VIP5000',
                'name' => 'Réduction VIP',
                'description' => '5000 FCFA de réduction sur votre prochaine location',
                'type' => 'fixed_amount',
                'value' => 5000,
                'minimum_amount' => 25000,
                'valid_from' => now()->subDays(5),
                'valid_until' => now()->addDays(30),
                'usage_limit' => 50,
                'usage_count' => 12,
                'usage_limit_per_user' => 1,
                'is_active' => true,
                'is_public' => false,
                'applicable_categories' => json_encode(['suv', 'luxury']),
            ],
            [
                'code' => 'LONGTERM20',
                'name' => 'Location longue durée',
                'description' => '20% de réduction pour les locations de plus de 7 jours',
                'type' => 'percentage',
                'value' => 20,
                'minimum_amount' => 100000,
                'valid_from' => now()->subDays(15),
                'valid_until' => now()->addDays(45),
                'usage_limit' => null,
                'usage_count' => 8,
                'usage_limit_per_user' => 3,
                'is_active' => true,
                'is_public' => true,
                'conditions' => json_encode([
                    'minimum_days' => 7
                ]),
            ],
            [
                'code' => 'SUMMER2024',
                'name' => 'Offre été 2024',
                'description' => '15% de réduction sur toutes les catégories',
                'type' => 'percentage',
                'value' => 15,
                'minimum_amount' => null,
                'valid_from' => now()->addDays(30),
                'valid_until' => now()->addDays(90),
                'usage_limit' => 200,
                'usage_count' => 0,
                'usage_limit_per_user' => 2,
                'is_active' => false,
                'is_public' => true,
            ],
        ];

        foreach ($promotions as $promotion) {
            Promotion::create($promotion);
        }

        $this->command->info('Promotions créées avec succès!');
    }
}