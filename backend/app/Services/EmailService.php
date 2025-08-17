<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\User;
use Resend\Laravel\Facades\Resend;

class EmailService
{
    /**
     * Send booking confirmation email.
     */
    public function sendBookingConfirmation(Booking $booking): bool
    {
        try {
            $booking->load(['user', 'vehicle']);

            $result = Resend::emails()->send([
                'from' => config('services.resend.from_name') . ' <' . config('services.resend.from_email') . '>',
                'to' => [$booking->user->email],
                'subject' => 'Confirmation de votre réservation #' . $booking->booking_number,
                'html' => $this->getBookingConfirmationTemplate($booking),
                'tags' => [
                    'type' => 'booking_confirmation',
                    'booking_id' => $booking->id,
                ],
            ]);

            return isset($result['id']);
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send booking cancellation email.
     */
    public function sendBookingCancellation(Booking $booking): bool
    {
        try {
            $booking->load(['user', 'vehicle']);

            $result = Resend::emails()->send([
                'from' => config('services.resend.from_name') . ' <' . config('services.resend.from_email') . '>',
                'to' => [$booking->user->email],
                'subject' => 'Annulation de votre réservation #' . $booking->booking_number,
                'html' => $this->getBookingCancellationTemplate($booking),
                'tags' => [
                    'type' => 'booking_cancellation',
                    'booking_id' => $booking->id,
                ],
            ]);

            return isset($result['id']);
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send booking reminder email.
     */
    public function sendBookingReminder(Booking $booking): bool
    {
        try {
            $booking->load(['user', 'vehicle']);

            $result = Resend::emails()->send([
                'from' => config('services.resend.from_name') . ' <' . config('services.resend.from_email') . '>',
                'to' => [$booking->user->email],
                'subject' => 'Rappel: Votre location commence demain #' . $booking->booking_number,
                'html' => $this->getBookingReminderTemplate($booking),
                'tags' => [
                    'type' => 'booking_reminder',
                    'booking_id' => $booking->id,
                ],
            ]);

            return isset($result['id']);
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send welcome email to new users.
     */
    public function sendWelcomeEmail(User $user): bool
    {
        try {
            $result = Resend::emails()->send([
                'from' => config('services.resend.from_name') . ' <' . config('services.resend.from_email') . '>',
                'to' => [$user->email],
                'subject' => 'Bienvenue chez Senerentcar !',
                'html' => $this->getWelcomeTemplate($user),
                'tags' => [
                    'type' => 'welcome',
                    'user_id' => $user->id,
                ],
            ]);

            return isset($result['id']);
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send password reset email.
     */
    public function sendPasswordResetEmail(User $user, string $token): bool
    {
        try {
            $resetUrl = config('app.frontend_url') . "/reset-password?token={$token}&email=" . urlencode($user->email);

            $result = Resend::emails()->send([
                'from' => config('services.resend.from_name') . ' <' . config('services.resend.from_email') . '>',
                'to' => [$user->email],
                'subject' => 'Réinitialisation de votre mot de passe',
                'html' => $this->getPasswordResetTemplate($user, $resetUrl),
                'tags' => [
                    'type' => 'password_reset',
                    'user_id' => $user->id,
                ],
            ]);

            return isset($result['id']);
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get booking confirmation email template.
     */
    private function getBookingConfirmationTemplate(Booking $booking): string
    {
        $startDate = $booking->start_date->format('d/m/Y');
        $endDate = $booking->end_date->format('d/m/Y');
        $pickupTime = $booking->pickup_time ?? '10:00';
        $dropoffTime = $booking->dropoff_time ?? '18:00';

        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #00853D; margin: 0;'>Senerentcar</h1>
                <p style='color: #666; margin: 5px 0;'>Location de véhicules au Sénégal</p>
            </div>
            
            <div style='background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
                <h2 style='color: #333; margin-top: 0;'>Réservation Confirmée!</h2>
                <p>Bonjour {$booking->user->first_name},</p>
                <p>Votre réservation a été confirmée avec succès. Voici les détails:</p>
            </div>
            
            <div style='background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;'>
                <h3 style='color: #00853D; margin-top: 0;'>Détails de la réservation</h3>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Numéro de réservation:</td>
                        <td style='padding: 10px 0;'>{$booking->booking_number}</td>
                    </tr>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Véhicule:</td>
                        <td style='padding: 10px 0;'>{$booking->vehicle->name}</td>
                    </tr>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Date de début:</td>
                        <td style='padding: 10px 0;'>{$startDate} à {$pickupTime}</td>
                    </tr>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Date de fin:</td>
                        <td style='padding: 10px 0;'>{$endDate} à {$dropoffTime}</td>
                    </tr>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Lieu de prise en charge:</td>
                        <td style='padding: 10px 0;'>{$booking->pickup_location}</td>
                    </tr>
                    <tr style='border-bottom: 1px solid #eee;'>
                        <td style='padding: 10px 0; font-weight: bold;'>Lieu de retour:</td>
                        <td style='padding: 10px 0;'>{$booking->dropoff_location}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px 0; font-weight: bold;'>Total:</td>
                        <td style='padding: 10px 0; font-size: 18px; font-weight: bold; color: #00853D;'>" . number_format($booking->total_amount, 0, ',', ' ') . " XOF</td>
                    </tr>
                </table>
            </div>
            
            <div style='background: #e3f2fd; padding: 15px; border-radius: 10px; margin-bottom: 20px;'>
                <h4 style='margin-top: 0; color: #1976d2;'>Instructions importantes:</h4>
                <ul style='margin: 0; padding-left: 20px;'>
                    <li>Présentez-vous avec votre permis de conduire et pièce d'identité</li>
                    <li>Une caution de " . number_format($booking->deposit_amount, 0, ',', ' ') . " XOF sera prélevée</li>
                    <li>Vérifiez l'état du véhicule avant le départ</li>
                    <li>Respectez les conditions de location</li>
                </ul>
            </div>
            
            <div style='text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;'>
                <p style='color: #666; margin: 0;'>Pour toute question, contactez-nous:</p>
                <p style='color: #00853D; margin: 5px 0;'>📞 +221 33 xxx xx xx | ✉️ contact@senerentcar.com</p>
                <p style='color: #666; font-size: 12px; margin-top: 15px;'>Merci de choisir Senerentcar!</p>
            </div>
        </div>
        ";
    }

    /**
     * Get booking cancellation email template.
     */
    private function getBookingCancellationTemplate(Booking $booking): string
    {
        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #00853D; margin: 0;'>Senerentcar</h1>
                <p style='color: #666; margin: 5px 0;'>Location de véhicules au Sénégal</p>
            </div>
            
            <div style='background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffc107;'>
                <h2 style='color: #856404; margin-top: 0;'>Réservation Annulée</h2>
                <p>Bonjour {$booking->user->first_name},</p>
                <p>Votre réservation #{$booking->booking_number} a été annulée.</p>
            </div>
            
            <div style='background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;'>
                <h3 style='color: #856404; margin-top: 0;'>Détails de la réservation annulée</h3>
                <p><strong>Véhicule:</strong> {$booking->vehicle->name}</p>
                <p><strong>Période:</strong> " . $booking->start_date->format('d/m/Y') . " - " . $booking->end_date->format('d/m/Y') . "</p>
                <p><strong>Raison:</strong> {$booking->cancellation_reason}</p>
            </div>
            
            <div style='background: #d4edda; padding: 15px; border-radius: 10px; margin-bottom: 20px;'>
                <p style='margin: 0; color: #155724;'>Si vous avez effectué un paiement, le remboursement sera traité selon nos conditions d'annulation.</p>
            </div>
            
            <div style='text-align: center; margin-top: 30px;'>
                <p>Nous espérons vous revoir bientôt!</p>
                <p style='color: #00853D;'>📞 +221 33 xxx xx xx | ✉️ contact@senerentcar.com</p>
            </div>
        </div>
        ";
    }

    /**
     * Get booking reminder email template.
     */
    private function getBookingReminderTemplate(Booking $booking): string
    {
        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #00853D; margin: 0;'>Senerentcar</h1>
            </div>
            
            <div style='background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
                <h2 style='color: #00853D; margin-top: 0;'>🚗 Votre location commence demain!</h2>
                <p>Bonjour {$booking->user->first_name},</p>
                <p>Nous vous rappelons que votre location commence demain. N'oubliez pas de vous présenter à l'heure!</p>
            </div>
            
            <div style='background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px;'>
                <h3>Rappel de votre réservation</h3>
                <p><strong>Véhicule:</strong> {$booking->vehicle->name}</p>
                <p><strong>Date:</strong> " . $booking->start_date->format('d/m/Y') . "</p>
                <p><strong>Heure:</strong> " . ($booking->pickup_time ?? '10:00') . "</p>
                <p><strong>Lieu:</strong> {$booking->pickup_location}</p>
            </div>
            
            <div style='text-align: center; margin-top: 30px;'>
                <p style='color: #00853D;'>Bon voyage avec Senerentcar! 🇸🇳</p>
            </div>
        </div>
        ";
    }

    /**
     * Get welcome email template.
     */
    private function getWelcomeTemplate(User $user): string
    {
        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #00853D; margin: 0;'>Bienvenue chez Senerentcar! 🇸🇳</h1>
            </div>
            
            <div style='background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
                <h2 style='color: #333; margin-top: 0;'>Bonjour {$user->first_name}!</h2>
                <p>Merci de nous avoir rejoint. Votre compte a été créé avec succès.</p>
            </div>
            
            <div style='background: white; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px;'>
                <h3 style='color: #00853D;'>Avec Senerentcar, vous pouvez:</h3>
                <ul>
                    <li>🚗 Louer des véhicules adaptés à tous vos besoins</li>
                    <li>📱 Gérer vos réservations en ligne</li>
                    <li>🛡️ Bénéficier d'une assurance complète</li>
                    <li>🌍 Explorer le Sénégal en toute liberté</li>
                </ul>
            </div>
            
            <div style='text-align: center; margin-top: 30px;'>
                <p style='color: #666;'>Prêt pour votre première location?</p>
                <a href='" . config('app.frontend_url') . "/vehicles' style='background: #00853D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;'>Voir nos véhicules</a>
            </div>
        </div>
        ";
    }

    /**
     * Get password reset email template.
     */
    private function getPasswordResetTemplate(User $user, string $resetUrl): string
    {
        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #00853D; margin: 0;'>Senerentcar</h1>
            </div>
            
            <div style='background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px;'>
                <h2 style='color: #856404; margin-top: 0;'>Réinitialisation du mot de passe</h2>
                <p>Bonjour {$user->first_name},</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
            </div>
            
            <div style='text-align: center; margin: 30px 0;'>
                <a href='{$resetUrl}' style='background: #00853D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;'>Réinitialiser mon mot de passe</a>
            </div>
            
            <div style='background: #f8d7da; padding: 15px; border-radius: 10px; margin-bottom: 20px;'>
                <p style='margin: 0; color: #721c24; font-size: 14px;'>
                    ⚠️ Ce lien expire dans 60 minutes. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                </p>
            </div>
        </div>
        ";
    }
}