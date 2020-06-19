<?php

namespace App\Http\Controllers;

use App\Jemaat;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class BaseController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function login(Request $request)
    {
        // I'm from HTTP
        $whereClause = ['email' => $request->email];
        $result = User::where($whereClause)->first();
        
        $boolPass = Hash::check($request->password, $result['password']);

        if ($result && $boolPass) {
            $data = [
                'name' => $result['name'],
                'password' => bcrypt($request->password),
                'email' => $result['email'],
            ];
            Session::put('account', $data);
            return back();
        } else {
            $request->session()->flash('gagal', $request->password);
            return back();
        }
    }

    public function logout () {
        Session::flush();
        return back();
    }
}
