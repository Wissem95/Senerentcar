<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\MaintenanceController;
use App\Http\Controllers\API\FileUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Admin routes (require admin or manager role)
Route::middleware(['auth:sanctum', 'role:admin,manager'])->group(function () {
    
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
});

// Super Admin routes (admin only)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    
    // User management would go here if needed
    // Route::apiResource('users', UserController::class);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0',
    ]);
});