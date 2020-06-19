<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jemaat;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $dataHKBP = Jemaat::orderBy('distrik', 'ASC')->get();
        return view('dashboard', ['dataHKBP' => $dataHKBP]);
    }
}
