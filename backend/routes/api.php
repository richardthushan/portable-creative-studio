<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SiteSettingController;

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminEnquiryController;
use App\Http\Controllers\Api\AdminServiceController;
use App\Http\Controllers\Api\AdminPortfolioController;


/*
|--------------------------------------------------------------------------
| Admin Login
|--------------------------------------------------------------------------
*/

Route::post('/admin/login', [
    AdminAuthController::class,
    'login'
]);


/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Logout
    Route::post('/admin/logout', [
        AdminAuthController::class,
        'logout'
    ]);


    // Enquiries
    Route::get('/admin/enquiries', [
        AdminEnquiryController::class,
        'index'
    ]);

    Route::patch('/admin/enquiries/{id}/status', [
        AdminEnquiryController::class,
        'updateStatus'
    ]);


    // Services
    Route::get('/admin/services', [
        AdminServiceController::class,
        'index'
    ]);

    Route::post('/admin/services', [
        AdminServiceController::class,
        'store'
    ]);

    Route::put('/admin/services/{id}', [
        AdminServiceController::class,
        'update'
    ]);

    Route::patch('/admin/services/{id}/toggle-status', [
        AdminServiceController::class,
        'toggleStatus'
    ]);


    // Portfolio
    Route::get('/admin/portfolio', [
        AdminPortfolioController::class,
        'index'
    ]);

    Route::get('/admin/portfolio-categories', [
        AdminPortfolioController::class,
        'categories'
    ]);

    Route::post('/admin/portfolio', [
        AdminPortfolioController::class,
        'store'
    ]);

    Route::put('/admin/portfolio/{id}', [
        AdminPortfolioController::class,
        'update'
    ]);

    Route::patch('/admin/portfolio/{id}/toggle-publish', [
        AdminPortfolioController::class,
        'togglePublish'
    ]);
});


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Services
Route::get('/services', [
    ServiceController::class,
    'index'
]);

Route::get('/services/{slug}', [
    ServiceController::class,
    'show'
]);


// Portfolio
Route::get('/portfolio', [
    PortfolioController::class,
    'index'
]);

Route::get('/portfolio/{slug}', [
    PortfolioController::class,
    'show'
]);


// Public Settings
Route::get('/settings/public', [
    SiteSettingController::class,
    'index'
]);


// Contact Form
Route::post('/contact', [
    ContactController::class,
    'store'
]);