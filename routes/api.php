<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::group(['prefix' => 'jemaat', 'namespace' => 'Api'], 
function () {
    // GET
    Route::get('/list', 'JemaatController@getList');
    Route::get('/{sektor}/{user}/{dataCategory?}', 'JemaatController@getJemaat');
});

Route::group(['prefix' => 'ibadah', 'namespace' => 'Api'], 
function () {    
    Route::get('/{id?}', 'IbadahController@getIbadah');
    Route::post('/create', 'IbadahController@createIbadah');
    Route::put('/update/{id}', 'IbadahController@updateIbadah');
    Route::delete('/delete/{id}', 'IbadahController@deleteIbadah');
});


Route::group(['prefix' => 'video', 'namespace' => 'Api'], 
function () {    
    Route::get('/{id?}', 'StreamController@getVideo');
    Route::post('/create', 'StreamController@createVideo');
    Route::post('/update/{id}', 'StreamController@updateVideo');
    Route::delete('/delete/{id}', 'StreamController@deleteVideo');
});


Route::group(['prefix' => 'tingting', 'namespace' => 'Api'], 
function () {    
    Route::get('/{id?}', 'TingtingController@showTingting');
    // this get can handle query : ?limit=10&image=true
    
    Route::post('/create', 'TingtingController@createTingting');
    // laravel/php/symfony - axios, error request PUT
    Route::post('/update/{id}', 'TingtingController@updateTingting');
    Route::delete('/delete/{id}', 'TingtingController@deleteTingting');
});

// Belum yaa Joelkun
Route::get('tingting/{id_tingting}', 'Api\TingtingController@getSpecificTingting');
Route::get('tingting', 'Api\TingtingController@getAllTingting');

