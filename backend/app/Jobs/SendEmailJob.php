<?php

namespace App\Jobs;

use App\Services\EmailService;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmailJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public $tries = 3;
    public $timeout = 60;
    public $backoff = 30;

    protected string $emailType;
    protected User $user;
    protected ?Booking $booking;
    protected ?string $token;

    /**
     * Create a new job instance.
     */
    public function __construct(string $emailType, User $user, ?Booking $booking = null, ?string $token = null)
    {
        $this->emailType = $emailType;
        $this->user = $user;
        $this->booking = $booking;
        $this->token = $token;
    }

    /**
     * Execute the job.
     */
    public function handle(EmailService $emailService): void
    {
        try {
            switch ($this->emailType) {
                case 'welcome':
                    $emailService->sendWelcomeEmail($this->user);
                    break;
                    
                case 'booking_confirmation':
                    if ($this->booking) {
                        $emailService->sendBookingConfirmation($this->booking);
                    }
                    break;
                    
                case 'booking_cancellation':
                    if ($this->booking) {
                        $emailService->sendBookingCancellation($this->booking);
                    }
                    break;
                    
                case 'booking_reminder':
                    if ($this->booking) {
                        $emailService->sendBookingReminder($this->booking);
                    }
                    break;
                    
                case 'password_reset':
                    if ($this->token) {
                        $emailService->sendPasswordResetEmail($this->user, $this->token);
                    }
                    break;
                    
                default:
                    \Log::warning("Unknown email type: {$this->emailType}");
            }
        } catch (\Exception $e) {
            \Log::error("Email job failed: {$e->getMessage()}", [
                'type' => $this->emailType,
                'user_id' => $this->user->id,
                'booking_id' => $this->booking?->id,
            ]);
            
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        \Log::error("Email job failed permanently: {$exception->getMessage()}", [
            'type' => $this->emailType,
            'user_id' => $this->user->id,
            'booking_id' => $this->booking?->id,
            'attempts' => $this->attempts(),
        ]);
    }
}
