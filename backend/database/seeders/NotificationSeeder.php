<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Booking;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $bookings = Booking::all();

        foreach ($users as $user) {
            // Notification de bienvenue
            Notification::create([
                'user_id' => $user->id,
                'type' => 'welcome',
                'title' => 'Bienvenue sur Senerentcar!',
                'message' => 'Nous sommes ravis de vous accueillir. Profitez de 15% de réduction sur votre première location avec le code BIENVENUE2024.',
                'channel' => 'in_app',
                'priority' => 'normal',
                'is_read' => fake()->boolean(70),
                'read_at' => fake()->boolean(70) ? now()->subDays(rand(1, 10)) : null,
                'sent_at' => $user->created_at,
            ]);

            // Notifications pour les réservations
            $userBookings = $bookings->where('user_id', $user->id);
            foreach ($userBookings as $booking) {
                if ($booking->status === 'confirmed') {
                    Notification::create([
                        'user_id' => $user->id,
                        'type' => 'booking_confirmed',
                        'title' => 'Réservation confirmée',
                        'message' => "Votre réservation {$booking->booking_number} a été confirmée. Nous vous attendons le " . $booking->start_date->format('d/m/Y'),
                        'data' => json_encode(['booking_id' => $booking->id]),
                        'channel' => 'email',
                        'priority' => 'high',
                        'is_read' => true,
                        'read_at' => $booking->confirmed_at ? $booking->confirmed_at->addHours(2) : now()->subDays(5),
                        'sent_at' => $booking->confirmed_at,
                        'reference_type' => 'booking',
                        'reference_id' => $booking->id,
                    ]);
                }

                if ($booking->status === 'completed') {
                    Notification::create([
                        'user_id' => $user->id,
                        'type' => 'booking_completed',
                        'title' => 'Location terminée',
                        'message' => "Merci d'avoir choisi Senerentcar! N'oubliez pas de laisser un avis sur votre expérience.",
                        'data' => json_encode(['booking_id' => $booking->id]),
                        'channel' => 'in_app',
                        'priority' => 'normal',
                        'is_read' => fake()->boolean(60),
                        'read_at' => fake()->boolean(60) ? now()->subDays(rand(1, 3)) : null,
                        'sent_at' => $booking->end_date,
                        'reference_type' => 'booking',
                        'reference_id' => $booking->id,
                    ]);
                }
            }

            // Notifications promotionnelles aléatoires
            if (fake()->boolean(40)) {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => 'promotion',
                    'title' => 'Offre spéciale weekend!',
                    'message' => 'Profitez de 10% de réduction sur toutes les locations de weekend avec le code WEEKEND10.',
                    'channel' => 'push',
                    'priority' => 'normal',
                    'is_read' => fake()->boolean(30),
                    'read_at' => fake()->boolean(30) ? now()->subDays(rand(1, 7)) : null,
                    'sent_at' => now()->subDays(rand(1, 15)),
                ]);
            }
        }

        $this->command->info('Notifications créées avec succès!');
    }
}