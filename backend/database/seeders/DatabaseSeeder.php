<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🚀 Démarrage du seeding de Senerentcar...');

        // 1. Roles and permissions first (creates default users)
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);

        // 2. Categories before vehicles
        $this->call([
            CategorySeeder::class,
        ]);

        // 3. Vehicles after categories
        $this->call([
            VehicleSeeder::class,
        ]);

        // 4. Bookings after users and vehicles
        $this->call([
            BookingSeeder::class,
        ]);

        // 5. Payments after bookings
        $this->call([
            PaymentSeeder::class,
        ]);

        // 6. Reviews after bookings
        $this->call([
            ReviewSeeder::class,
        ]);

        // 7. Promotions
        $this->call([
            PromotionSeeder::class,
        ]);

        // 8. Notifications after users and bookings
        $this->call([
            NotificationSeeder::class,
        ]);

        $this->command->info('');
        $this->command->info('✅ Seeding terminé avec succès!');
        $this->command->info('');
        $this->command->info('🔑 Comptes de test:');
        $this->command->info('   👨‍💼 Admin: admin@senerentcar.com / password');
        $this->command->info('   👩‍💼 Manager: manager@senerentcar.com / password');  
        $this->command->info('   👤 Client: client@example.com / password');
        $this->command->info('');
        $this->command->info('📊 Données créées:');
        $this->command->info('   - Catégories: ' . \App\Models\Category::count());
        $this->command->info('   - Véhicules: ' . \App\Models\Vehicle::count());
        $this->command->info('   - Réservations: ' . \App\Models\Booking::count());
        $this->command->info('   - Paiements: ' . \App\Models\Payment::count());
        $this->command->info('   - Avis: ' . \App\Models\Review::count());
        $this->command->info('   - Promotions: ' . \App\Models\Promotion::count());
        $this->command->info('   - Notifications: ' . \App\Models\Notification::count());
        $this->command->info('   - Utilisateurs: ' . \App\Models\User::count());
    }
}
