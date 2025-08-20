<?php

namespace App\Providers;

use App\Services\CloudinaryService;
use App\Services\EmailService;
use Illuminate\Support\ServiceProvider;

class SenerentcarServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Register CloudinaryService as singleton
        $this->app->singleton(CloudinaryService::class, function ($app) {
            return new CloudinaryService();
        });

        // Register EmailService as singleton
        $this->app->singleton(EmailService::class, function ($app) {
            return new EmailService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Add frontend URL to config if not set
        if (!config('app.frontend_url')) {
            config(['app.frontend_url' => env('FRONTEND_URL', 'https://senerentcar.vercel.app')]);
        }

        // Set application locale to French for Senegal
        if (config('app.env') !== 'testing') {
            app()->setLocale('fr');
        }

        // Set timezone to Dakar
        if (config('app.env') !== 'testing') {
            config(['app.timezone' => 'Africa/Dakar']);
            date_default_timezone_set('Africa/Dakar');
        }
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [
            CloudinaryService::class,
            EmailService::class,
        ];
    }
}
