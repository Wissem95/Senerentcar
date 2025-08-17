<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->after('name');
            $table->string('last_name')->after('first_name');
            $table->string('phone')->nullable()->after('email');
            $table->text('address')->nullable()->after('phone');
            $table->string('city')->default('Dakar')->after('address');
            $table->date('date_of_birth')->nullable()->after('city');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('date_of_birth');
            $table->string('driver_license_number')->nullable()->after('gender');
            $table->date('driver_license_expiry')->nullable()->after('driver_license_number');
            $table->boolean('is_verified')->default(false)->after('driver_license_expiry');
            $table->datetime('email_verified_at')->nullable()->change();
            $table->datetime('phone_verified_at')->nullable()->after('is_verified');
            $table->json('preferences')->nullable()->after('phone_verified_at'); // Préférences utilisateur
            $table->string('profile_photo')->nullable()->after('preferences'); // Photo de profil Cloudinary
            
            $table->dropColumn('name'); // On supprime le champ name car on utilise first_name et last_name
            
            $table->index(['city', 'is_verified']);
            $table->index(['phone', 'is_verified']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->dropColumn([
                'first_name',
                'last_name', 
                'phone',
                'address',
                'city',
                'date_of_birth',
                'gender',
                'driver_license_number',
                'driver_license_expiry',
                'is_verified',
                'phone_verified_at',
                'preferences',
                'profile_photo'
            ]);
            $table->dropIndex(['city', 'is_verified']);
            $table->dropIndex(['phone', 'is_verified']);
        });
    }
};
