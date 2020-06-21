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

Route::get('ibadah/all', 'Api\IbadahController@getAllIbadah');
Route::post('ibadah/create', 'Api\IbadahController@createIbadah');

