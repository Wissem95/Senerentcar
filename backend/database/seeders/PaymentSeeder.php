<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Payment;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookings = Booking::whereIn('status', ['confirmed', 'completed'])->get();

        foreach ($bookings as $booking) {
            // Créer un paiement de dépôt
            Payment::create([
                'transaction_id' => 'TRX-' . strtoupper(uniqid()),
                'booking_id' => $booking->id,
                'user_id' => $booking->user_id,
                'amount' => $booking->total_amount * 0.3, // 30% de dépôt
                'type' => 'deposit',
                'method' => fake()->randomElement(['card', 'mobile_money', 'wave', 'orange_money']),
                'status' => 'completed',
                'gateway_response' => json_encode([
                    'transaction_id' => uniqid(),
                    'gateway' => 'payment_gateway',
                    'status' => 'success'
                ]),
                'reference' => 'REF-' . strtoupper(uniqid()),
                'notes' => 'Dépôt de garantie pour la réservation ' . $booking->booking_number,
                'processed_at' => $booking->created_at->addMinutes(10),
            ]);

            // Si la réservation est complétée, ajouter le paiement final
            if ($booking->status === 'completed') {
                Payment::create([
                    'transaction_id' => 'TRX-' . strtoupper(uniqid()),
                    'booking_id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'amount' => $booking->total_amount * 0.7, // Solde restant 70%
                    'type' => 'full',
                    'method' => fake()->randomElement(['card', 'cash', 'transfer']),
                    'status' => 'completed',
                    'gateway_response' => json_encode([
                        'transaction_id' => uniqid(),
                        'gateway' => 'payment_gateway',
                        'status' => 'success'
                    ]),
                    'reference' => 'REF-' . strtoupper(uniqid()),
                    'notes' => 'Paiement final pour la réservation ' . $booking->booking_number,
                    'processed_at' => $booking->end_date,
                ]);
            }
        }

        $this->command->info('Paiements créés avec succès!');
    }
}