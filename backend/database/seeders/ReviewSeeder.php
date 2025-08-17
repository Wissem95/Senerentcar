<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $completedBookings = Booking::where('status', 'completed')->get();

        $reviews = [
            [
                'rating' => 5,
                'comment' => "Excellent service ! Le véhicule était très propre et en parfait état. Je recommande vivement Senerentcar.",
                'cleanliness_rating' => 5,
                'condition_rating' => 5,
                'service_rating' => 5,
                'value_rating' => 5,
                'is_verified' => true,
                'admin_response' => "Merci beaucoup pour votre retour positif ! Nous sommes ravis que notre service ait répondu à vos attentes.",
            ],
            [
                'rating' => 4,
                'comment' => "Très bonne expérience dans l'ensemble. Le véhicule était confortable et bien entretenu. Petit bémol sur le temps d'attente lors de la récupération.",
                'cleanliness_rating' => 5,
                'condition_rating' => 4,
                'service_rating' => 3,
                'value_rating' => 4,
                'is_verified' => true,
                'admin_response' => "Merci pour votre avis. Nous prenons note de votre remarque concernant le temps d'attente et travaillons à améliorer nos processus.",
            ],
            [
                'rating' => 5,
                'comment' => "Service impeccable ! La livraison à l'aéroport était parfaite. Le personnel très professionnel.",
                'cleanliness_rating' => 5,
                'condition_rating' => 5,
                'service_rating' => 5,
                'value_rating' => 4,
                'is_verified' => true,
            ],
            [
                'rating' => 3,
                'comment' => "Le véhicule était correct mais j'ai trouvé le prix un peu élevé par rapport à la concurrence.",
                'cleanliness_rating' => 4,
                'condition_rating' => 3,
                'service_rating' => 4,
                'value_rating' => 2,
                'is_verified' => false,
            ],
            [
                'rating' => 5,
                'comment' => "Parfait pour mon voyage d'affaires à Dakar. Le SUV était luxueux et très confortable.",
                'cleanliness_rating' => 5,
                'condition_rating' => 5,
                'service_rating' => 5,
                'value_rating' => 5,
                'is_verified' => true,
            ],
        ];

        foreach ($completedBookings->take(count($reviews)) as $index => $booking) {
            if (isset($reviews[$index])) {
                $reviewData = array_merge($reviews[$index], [
                    'booking_id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'vehicle_id' => $booking->vehicle_id,
                    'admin_response_at' => isset($reviews[$index]['admin_response']) ? now()->subDays(rand(1, 5)) : null,
                ]);
                
                Review::create($reviewData);
            }
        }

        $this->command->info('Avis créés avec succès!');
    }
}