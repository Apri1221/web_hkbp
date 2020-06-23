<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'BaseController@index')->name('home');
Route::post('/login', 'BaseController@login')->name('login');
Route::get('/logout', 'BaseController@logout')->name('logout');


Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], 
function () {
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
});


Route::group(['prefix' => 'admin', 'namespace' => 'Api'], 
function () {
    Route::post('/dashboard/update-data/{id}', 'JemaatController@update_list')->name('update_data');
    Route::post('/dashboard/store-data', 'JemaatController@store_list')->name('store_data');
    Route::get('/dashboard/destroy-data/{id}', 'JemaatController@destroy_list')->name('destroy_data');
});


Route::get('/post/{id?}', 'BaseController@post')->name('post_prototype');