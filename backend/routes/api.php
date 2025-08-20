<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\MaintenanceController;
use App\Http\Controllers\API\FileUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check pour Railway
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'app' => config('app.name'),
    ]);
});

// Debug route pour Railway
Route::get('/debug', function () {
    try {
        $dbConnected = false;
        $tableCount = 0;
        
        try {
            \DB::connection()->getPdo();
            $dbConnected = true;
            $tableCount = \DB::select('SHOW TABLES');
            $tableCount = count($tableCount);
        } catch (\Exception $e) {
            $dbError = $e->getMessage();
        }
        
        return response()->json([
            'status' => 'debug',
            'timestamp' => now(),
            'app' => config('app.name'),
            'env' => config('app.env'),
            'debug' => config('app.debug'),
            'database' => [
                'connected' => $dbConnected,
                'tables' => $tableCount,
                'error' => $dbError ?? null,
            ],
            'config' => [
                'db_host' => config('database.connections.mysql.host'),
                'db_database' => config('database.connections.mysql.database'),
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// Test route simple pour véhicules
Route::get('/vehicles-test', function () {
    try {
        $count = \App\Models\Vehicle::count();
        $first = \App\Models\Vehicle::first();
        
        return response()->json([
            'status' => 'success',
            'vehicles_count' => $count,
            'first_vehicle' => $first ? [
                'id' => $first->id,
                'name' => $first->name,
                'images' => $first->images
            ] : null
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Public vehicle routes
Route::prefix('vehicles')->group(function () {
    Route::get('/', [VehicleController::class, 'index']);
    Route::get('/featured', [VehicleController::class, 'featured']);
    Route::get('/{vehicle}', [VehicleController::class, 'show']);
    Route::post('/{vehicle}/check-availability', [VehicleController::class, 'checkAvailability']);
});

// Public category routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        
        // DEBUG: Vérifier les rôles de l'utilisateur connecté
        Route::get('/user-roles', function () {
            $user = auth()->user();
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                ],
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'is_admin' => $user->hasRole('admin'),
                'is_manager' => $user->hasRole('manager'),
                'is_customer' => $user->hasRole('customer'),
            ]);
        });
    });

    // User bookings
    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/', [BookingController::class, 'store']);
        Route::get('/{booking}', [BookingController::class, 'show']);
        Route::put('/{booking}', [BookingController::class, 'update']);
        Route::post('/{booking}/cancel', [BookingController::class, 'cancel']);
    });

    // File uploads
    Route::prefix('uploads')->group(function () {
        Route::post('/avatar', [FileUploadController::class, 'uploadUserAvatar']);
        Route::post('/images', [FileUploadController::class, 'uploadImages']);
        Route::get('/image-details', [FileUploadController::class, 'getImageDetails']);
        Route::get('/responsive-sizes', [FileUploadController::class, 'getResponsiveSizes']);
        Route::get('/optimized-url', [FileUploadController::class, 'getOptimizedUrl']);
        Route::delete('/image', [FileUploadController::class, 'deleteImage']);
    });
});

// Admin routes (DEMO MODE - No auth required)
// TODO: Re-enable auth for production: ['auth:sanctum', 'role:admin,manager'] 
Route::group([], function () {
    
    // Admin dashboard stats
    Route::get('/admin/dashboard/stats', function () {
        try {
            // Statistiques générales
            $totalVehicles = \App\Models\Vehicle::count();
            $availableVehicles = \App\Models\Vehicle::where('status', 'available')->count();
            $totalBookings = \App\Models\Booking::count();
            $totalRevenue = \App\Models\Booking::where('status', 'completed')->sum('total_amount');
            
            // Véhicules populaires (top 5)
            $popularVehicles = \App\Models\Vehicle::withCount('bookings')
                ->orderBy('bookings_count', 'desc')
                ->limit(5)
                ->get(['id', 'name', 'bookings_count'])
                ->map(function ($vehicle) {
                    return [
                        'name' => $vehicle->name,
                        'bookings' => $vehicle->bookings_count
                    ];
                });
            
            // Revenus mensuels (6 derniers mois)
            $monthlyRevenue = [];
            $months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
            for ($i = 5; $i >= 0; $i--) {
                $date = now()->subMonths($i);
                $revenue = \App\Models\Booking::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->where('status', 'completed')
                    ->sum('total_amount');
                
                $monthlyRevenue[] = [
                    'month' => $months[5-$i] ?? $date->format('M'),
                    'revenue' => floatval($revenue / 1000), // En milliers
                ];
            }
            
            return response()->json([
                'overview' => [
                    'total_vehicles' => $totalVehicles,
                    'available_vehicles' => $availableVehicles,
                    'total_bookings' => $totalBookings,
                    'total_revenue' => floatval($totalRevenue),
                ],
                'popular_vehicles' => $popularVehicles,
                'monthly_revenue' => $monthlyRevenue
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors du chargement des statistiques',
                'message' => $e->getMessage()
            ], 500);
        }
    });
    
    // Admin vehicle management
    Route::prefix('admin/vehicles')->group(function () {
        Route::post('/', [VehicleController::class, 'store']);
        Route::put('/{vehicle}', [VehicleController::class, 'update']);
        Route::delete('/{vehicle}', [VehicleController::class, 'destroy']);
        Route::get('/statistics', [VehicleController::class, 'statistics']);
    });

    // Admin file uploads
    Route::prefix('admin/uploads')->group(function () {
        Route::post('/vehicle-images', [FileUploadController::class, 'uploadVehicleImages']);
    });

    // Admin booking management
    Route::prefix('admin/bookings')->group(function () {
        Route::get('/', [BookingController::class, 'all']);
        Route::get('/recent', function() {
            try {
                $recentBookings = \App\Models\Booking::with(['user', 'vehicle'])
                    ->orderBy('created_at', 'desc')
                    ->limit(10)
                    ->get()
                    ->map(function ($booking) {
                        return [
                            'id' => $booking->id,
                            'bookingNumber' => 'SRC-' . str_pad($booking->id, 8, '0', STR_PAD_LEFT),
                            'customerName' => $booking->user ? $booking->user->first_name . ' ' . $booking->user->last_name : 'N/A',
                            'customerEmail' => $booking->user ? $booking->user->email : 'N/A',
                            'vehicleName' => $booking->vehicle ? $booking->vehicle->name : 'N/A',
                            'startDate' => $booking->start_date,
                            'endDate' => $booking->end_date,
                            'status' => $booking->status,
                            'totalAmount' => $booking->total_amount
                        ];
                    });
                
                return response()->json($recentBookings);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Erreur lors du chargement des réservations récentes',
                    'message' => $e->getMessage()
                ], 500);
            }
        });
        Route::post('/{booking}/confirm', [BookingController::class, 'confirm']);
        Route::post('/{booking}/start', [BookingController::class, 'start']);
        Route::post('/{booking}/complete', [BookingController::class, 'complete']);
        Route::get('/statistics', [BookingController::class, 'statistics']);
    });

    // Admin category management
    Route::prefix('admin/categories')->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('/{category}', [CategoryController::class, 'update']);
        Route::delete('/{category}', [CategoryController::class, 'destroy']);
    });

    // Maintenance management
    Route::prefix('maintenances')->group(function () {
        Route::get('/', [MaintenanceController::class, 'index']);
        Route::post('/', [MaintenanceController::class, 'store']);
        Route::get('/upcoming', [MaintenanceController::class, 'upcoming']);
        Route::get('/overdue', [MaintenanceController::class, 'overdue']);
        Route::get('/{maintenance}', [MaintenanceController::class, 'show']);
        Route::put('/{maintenance}', [MaintenanceController::class, 'update']);
        Route::post('/{maintenance}/complete', [MaintenanceController::class, 'complete']);
        Route::delete('/{maintenance}', [MaintenanceController::class, 'destroy']);
    });

    // Admin maintenance alerts
    Route::get('/admin/maintenance/alerts', function() {
        try {
            // Simulate maintenance alerts for demo
            $alerts = [
                [
                    'id' => '1',
                    'vehicleName' => 'Honda CR-V 2022',
                    'vehicleId' => '1',
                    'alertType' => 'maintenance_due',
                    'message' => 'Vidange moteur en retard',
                    'dueDate' => '2025-08-10',
                    'priority' => 'high'
                ],
                [
                    'id' => '2', 
                    'vehicleName' => 'Toyota Land Cruiser',
                    'vehicleId' => '2',
                    'alertType' => 'inspection_due',
                    'message' => 'Contrôle technique expiré',
                    'dueDate' => '2025-08-05',
                    'priority' => 'high'
                ],
                [
                    'id' => '3',
                    'vehicleName' => 'Ford Transit',
                    'vehicleId' => '3',
                    'alertType' => 'maintenance_due',
                    'message' => 'Révision générale prévue',
                    'dueDate' => '2025-08-25',
                    'priority' => 'medium'
                ]
            ];
            
            return response()->json($alerts);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors du chargement des alertes de maintenance',
                'message' => $e->getMessage()
            ], 500);
        }
    });

    // Admin users management
    Route::prefix('admin/users')->group(function () {
        Route::get('/', function() {
            try {
                $users = \App\Models\User::with('roles')
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'firstName' => $user->first_name,
                            'lastName' => $user->last_name,
                            'email' => $user->email,
                            'phone' => $user->phone,
                            'city' => $user->city,
                            'roles' => $user->getRoleNames(),
                            'status' => 'active',
                            'createdAt' => $user->created_at,
                            'lastLoginAt' => $user->updated_at
                        ];
                    });
                
                return response()->json($users);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Erreur lors du chargement des utilisateurs',
                    'message' => $e->getMessage()
                ], 500);
            }
        });
    });

    // Admin analytics
    Route::get('/admin/analytics', function() {
        try {
            // Simulate analytics data for demo
            $analytics = [
                'revenue' => [
                    'total' => 2850000,
                    'thisMonth' => 485000,
                    'growth' => 12.5,
                    'chartData' => [
                        ['month' => 'Jan', 'revenue' => 320],
                        ['month' => 'Fév', 'revenue' => 380],
                        ['month' => 'Mar', 'revenue' => 420],
                        ['month' => 'Avr', 'revenue' => 465],
                        ['month' => 'Mai', 'revenue' => 485],
                        ['month' => 'Jun', 'revenue' => 520],
                    ]
                ],
                'bookings' => [
                    'total' => 1247,
                    'thisMonth' => 89,
                    'growth' => 8.3,
                    'chartData' => [
                        ['month' => 'Jan', 'bookings' => 67],
                        ['month' => 'Fév', 'bookings' => 73],
                        ['month' => 'Mar', 'bookings' => 81],
                        ['month' => 'Avr', 'bookings' => 85],
                        ['month' => 'Mai', 'bookings' => 89],
                        ['month' => 'Jun', 'bookings' => 92],
                    ]
                ],
                'topVehicles' => [
                    ['name' => 'Toyota Corolla', 'bookings' => 45, 'revenue' => 125000],
                    ['name' => 'Honda CR-V', 'bookings' => 38, 'revenue' => 108000],
                    ['name' => 'Toyota RAV4', 'bookings' => 35, 'revenue' => 142000],
                    ['name' => 'Mercedes Classe C', 'bookings' => 29, 'revenue' => 185000],
                    ['name' => 'Toyota Land Cruiser', 'bookings' => 22, 'revenue' => 165000],
                ]
            ];
            
            return response()->json($analytics);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors du chargement des analytics',
                'message' => $e->getMessage()
            ], 500);
        }
    });
});

// Super Admin routes (DEMO MODE - No auth required)
// TODO: Re-enable auth for production: ['auth:sanctum', 'role:admin']
Route::group([], function () {
    
    // User management would go here if needed
    // Route::apiResource('users', UserController::class);
});

// HOTFIX: Corriger les URLs d'images immédiatement
Route::get('/fix-images-now', function () {
    $oldDomain = 'senerentcar-dzl6d6fy9-wissem95s-projects.vercel.app';
    $newDomain = 'senerentcar.vercel.app';
    
    $vehicles = \App\Models\Vehicle::all();
    $updated = 0;
    $debugInfo = [];
    
    foreach ($vehicles as $vehicle) {
        $images = $vehicle->images; // Laravel cast automatique du JSON
        $originalImages = $images;
        $changed = false;
        
        if (is_array($images)) {
            $newImages = [];
            foreach ($images as $image) {
                // Debug: vérifier chaque image
                $debugInfo[] = "Véhicule {$vehicle->id}: Image = {$image}";
                
                if (strpos($image, $oldDomain) !== false) {
                    $newImages[] = str_replace($oldDomain, $newDomain, $image);
                    $changed = true;
                    $debugInfo[] = "  → CHANGÉ";
                } else {
                    $newImages[] = $image;
                    $debugInfo[] = "  → Pas de changement";
                }
            }
            
            if ($changed) {
                $vehicle->images = $newImages;
                $vehicle->save();
                $updated++;
            }
        } else {
            $debugInfo[] = "Véhicule {$vehicle->id}: Images n'est pas un array: " . json_encode($images);
        }
    }
    
    return response()->json([
        'status' => 'success',
        'message' => "URLs d'images mises à jour",
        'vehicles_updated' => $updated,
        'total_vehicles' => $vehicles->count(),
        'debug' => array_slice($debugInfo, 0, 10) // Premiers 10 éléments pour debug
    ]);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0',
    ]);
});