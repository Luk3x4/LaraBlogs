<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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

//public routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/posts/search', [PostController::class, 'search']);
    Route::put('/posts/{post:slug}', [PostController::class, 'update']);
    Route::delete('/posts/{post:slug}', [PostController::class, 'destroy']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post:slug}', [PostController::class, 'show']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/me', [UserController::class, 'me']);
});
