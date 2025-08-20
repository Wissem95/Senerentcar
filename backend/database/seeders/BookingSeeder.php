<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::whereHas('roles', function ($query) {
            $query->where('name', 'customer');
        })->get();
        
        $vehicles = \App\Models\Vehicle::where('status', 'available')->get();

        if ($users->isEmpty() || $vehicles->isEmpty()) {
            $this->command->warn('Aucun utilisateur client ou véhicule trouvé. Exécutez d\'abord les seeders Users et Vehicles.');
            return;
        }

        $bookings = [
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Toyota Yaris')->first()->id,
                'start_date' => now()->addDays(5),
                'end_date' => now()->addDays(8),
                'pickup_location' => 'Aéroport Léopold Sédar Senghor - Dakar',
                'dropoff_location' => 'Hôtel Radisson Blu - Dakar',
                'status' => 'pending',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 25000,
                'number_of_days' => 3,
                'subtotal' => 75000,
                'insurance_cost' => 2500,
                'total_amount' => 77500,
                'special_requests' => 'Livraison à l\'aéroport souhaitée',
            ],
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Toyota Corolla')->first()->id,
                'start_date' => now()->addDays(10),
                'end_date' => now()->addDays(15),
                'pickup_location' => 'Place de l\'Indépendance - Dakar',
                'dropoff_location' => 'Almadies - Dakar',
                'status' => 'confirmed',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 45000,
                'number_of_days' => 5,
                'subtotal' => 225000,
                'insurance_cost' => 4500,
                'total_amount' => 229500,
                'confirmed_at' => now(),
            ],
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Toyota Land Cruiser')->first()->id,
                'start_date' => now()->subDays(10),
                'end_date' => now()->subDays(5),
                'pickup_location' => 'Plateau - Dakar',
                'dropoff_location' => 'Saint-Louis',
                'status' => 'completed',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 75000,
                'number_of_days' => 5,
                'subtotal' => 375000,
                'insurance_cost' => 7500,
                'total_amount' => 382500,
                'confirmed_at' => now()->subDays(15),
            ],
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Hyundai H1')->first()->id,
                'start_date' => now()->addDays(2),
                'end_date' => now()->addDays(4),
                'pickup_location' => 'Gare Routière - Dakar',
                'dropoff_location' => 'Mbour',
                'status' => 'cancelled',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 60000,
                'number_of_days' => 2,
                'subtotal' => 120000,
                'insurance_cost' => 6000,
                'total_amount' => 126000,
                'cancelled_at' => now()->subDays(1),
                'cancellation_reason' => 'Changement de programme - voyage reporté',
            ],
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Hyundai Tucson')->first()->id,
                'start_date' => now()->subDays(3),
                'end_date' => now()->addDays(2),
                'pickup_location' => 'Parcelles Assainies - Dakar',
                'dropoff_location' => 'Saly',
                'status' => 'in_progress',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 50000,
                'number_of_days' => 5,
                'subtotal' => 250000,
                'insurance_cost' => 5000,
                'total_amount' => 255000,
                'confirmed_at' => now()->subDays(8),
                'additional_drivers' => [
                    [
                        'first_name' => 'Marie',
                        'last_name' => 'Diop',
                        'license_number' => 'SN87654321',
                        'phone' => '+221776543210'
                    ]
                ],
                'special_requests' => 'GPS et siège bébé inclus',
            ],
            [
                'user_id' => $users->first()->id,
                'vehicle_id' => $vehicles->where('name', 'Mercedes-Benz E-Class')->first()->id,
                'start_date' => now()->addDays(20),
                'end_date' => now()->addDays(22),
                'pickup_location' => 'Hôtel Pullman - Dakar',
                'dropoff_location' => 'Aéroport Léopold Sédar Senghor - Dakar',
                'status' => 'pending',
                'driver_license_number' => 'SN12345678',
                'driver_license_expiry' => now()->addYears(3),
                'daily_rate' => 100000,
                'number_of_days' => 2,
                'subtotal' => 200000,
                'insurance_cost' => 10000,
                'total_amount' => 210000,
                'special_requests' => 'Service chauffeur souhaité pour événement d\'affaires',
            ],
        ];

        foreach ($bookings as $bookingData) {
            // Generate booking number first
            $bookingData['booking_number'] = 'SRC-' . now()->format('Ymd') . '-' . str_pad(fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT);
            
            $booking = \App\Models\Booking::create($bookingData);
        }

        $this->command->info('Réservations créées avec succès!');
        $this->command->info('Statuts des réservations:');
        $this->command->info('- En attente: ' . \App\Models\Booking::where('status', 'pending')->count());
        $this->command->info('- Confirmées: ' . \App\Models\Booking::where('status', 'confirmed')->count());
        $this->command->info('- En cours: ' . \App\Models\Booking::where('status', 'in_progress')->count());
        $this->command->info('- Terminées: ' . \App\Models\Booking::where('status', 'completed')->count());
        $this->command->info('- Annulées: ' . \App\Models\Booking::where('status', 'cancelled')->count());
    }
}
