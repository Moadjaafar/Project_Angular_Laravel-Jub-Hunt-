<?php

use App\Http\Controllers\OfferController;
use App\Http\Controllers\PostulerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[UserController::class,'register']);
Route::post('/Postuler',[PostulerController::class,'Postulation']);

Route::post('/login',[UserController::class,'login']);
Route::post('/AddOffer',[OfferController::class,'createOffer']);
Route::get('/AllOffers',[OfferController::class,'getAll']);
Route::get('/firstOffer',[OfferController::class,'findfirstOffer']);
Route::get('/targitedOffer/{id}',[OfferController::class,'findtargtedOfr']);
Route::post('/pdf',[OfferController::class,'Postulation']);
Route::get('/pdfDownload/{id}',[OfferController::class,'Download']);
Route::get('/Peapleintersted/{id}',[OfferController::class,'offeritrested']);

Route::post('/filter',[OfferController::class,'SEARCH']);




Route::put('/UpdateOfr/{id}',[OfferController::class,'update']);

Route::get('/MyOffers/{id}',[OfferController::class,'findMyOffer']);
Route::get('/DeleteOff/{id}',[OfferController::class,'deleteOffer']);






