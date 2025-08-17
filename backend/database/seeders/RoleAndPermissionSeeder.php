<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Vehicle permissions
            'view_vehicles',
            'create_vehicles',
            'update_vehicles',
            'delete_vehicles',
            'manage_vehicle_availability',

            // Booking permissions  
            'view_all_bookings',
            'create_bookings',
            'update_bookings',
            'cancel_bookings',
            'confirm_bookings',
            'complete_bookings',

            // Category permissions
            'view_categories',
            'create_categories',
            'update_categories',
            'delete_categories',

            // Maintenance permissions
            'view_maintenances',
            'create_maintenances',
            'update_maintenances',
            'complete_maintenances',
            'delete_maintenances',

            // User management permissions
            'view_users',
            'create_users',
            'update_users',
            'delete_users',

            // Statistics and reports
            'view_statistics',
            'view_reports',

            // System administration
            'manage_system',
            'manage_roles',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Customer role - basic user permissions
        $customerRole = \Spatie\Permission\Models\Role::create(['name' => 'customer']);
        $customerRole->givePermissionTo([
            'view_vehicles',
            'view_categories',
            'create_bookings',
            'update_bookings',
            'cancel_bookings',
        ]);

        // Manager role - fleet management permissions
        $managerRole = \Spatie\Permission\Models\Role::create(['name' => 'manager']);
        $managerRole->givePermissionTo([
            'view_vehicles',
            'create_vehicles',
            'update_vehicles',
            'manage_vehicle_availability',
            'view_categories',
            'create_categories',
            'update_categories',
            'view_all_bookings',
            'create_bookings',
            'update_bookings',
            'cancel_bookings',
            'confirm_bookings',
            'complete_bookings',
            'view_maintenances',
            'create_maintenances',
            'update_maintenances',
            'complete_maintenances',
            'view_statistics',
            'view_reports',
        ]);

        // Admin role - full system access
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(\Spatie\Permission\Models\Permission::all());

        // Create default admin user
        $adminUser = \App\Models\User::create([
            'first_name' => 'Admin',
            'last_name' => 'Senerentcar',
            'email' => 'admin@senerentcar.com',
            'phone' => '+221770000000',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'city' => 'Dakar',
            'email_verified_at' => now(),
        ]);

        $adminUser->assignRole('admin');

        // Create default manager user
        $managerUser = \App\Models\User::create([
            'first_name' => 'Manager',
            'last_name' => 'Fleet',
            'email' => 'manager@senerentcar.com',
            'phone' => '+221770000001',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'city' => 'Dakar',
            'email_verified_at' => now(),
        ]);

        $managerUser->assignRole('manager');

        // Create sample customer user
        $customerUser = \App\Models\User::create([
            'first_name' => 'Client',
            'last_name' => 'Test',
            'email' => 'client@example.com',
            'phone' => '+221770000002',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'city' => 'Dakar',
            'email_verified_at' => now(),
        ]);

        $customerUser->assignRole('customer');

        $this->command->info('Rôles et permissions créés avec succès!');
        $this->command->info('Utilisateurs par défaut:');
        $this->command->info('- Admin: admin@senerentcar.com / password');
        $this->command->info('- Manager: manager@senerentcar.com / password');
        $this->command->info('- Client: client@example.com / password');
    }
}
