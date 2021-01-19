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
Route::get('/about', 'BaseController@about')->name('about');
Route::get('/post/{id_ibadah}', 'BaseController@getIbadah'); // ibadah
Route::get('/article/{id_tingting?}', 'BaseController@getTingting'); // tingting

Route::get('/testpage', 'BaseController@testpage'); //testpage


Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['checkStatus']], 
function () {
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
});


Route::group(['prefix' => 'admin', 'namespace' => 'Api'], 
function () {
    Route::post('/dashboard/update-data/{id}', 'JemaatController@updateList')->name('update_data');
    Route::post('/dashboard/store-data', 'JemaatController@storeList')->name('store_data');
    Route::get('/dashboard/destroy-data/{id}', 'JemaatController@destroyList')->name('destroy_data');
});



