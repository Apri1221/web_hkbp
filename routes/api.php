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
    Route::get('/list', 'JemaatController@get_list');
    Route::get('/{sektor}/{user}/{dataCategory?}', 'JemaatController@get_jemaat');
    
});

Route::get('ibadah/{id?}', 'Api\IbadahController@getIbadah');
Route::post('ibadah/create', 'Api\IbadahController@createIbadah');
Route::put('ibadah/update/{id}', 'Api\IbadahController@updateIbadah');
Route::get('ibadah/delete/{id}', 'Api\IbadahController@deleteIbadah');
Route::get('tingting/{id_tingting}', 'Api\TingtingController@getSpecificTingting');
Route::get('tingting', 'Api\TingtingController@getAllTingting');
Route::post('tingting/create', 'Api\TingtingController@createTingting');
Route::post('tingting/update', 'Api\TingtingController@updateTingting');
Route::post('tingting/delete/{id_tingting}', 'Api\TingtingController@deleteTingting');

