<?php

namespace App\Http\Controllers;

use App\Ibadah;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

// Note, provide Sanctum Laravel API Token

class BaseController extends Controller
{
    public function index()
    {
        $ibadahs = Ibadah::take(4)->get()->sortByDesc('created_at');
        return view('welcome', ['ibadahs' => $ibadahs]);
    }

    public function about(){
        return view('about');
    }

    public function getIbadah($id_ibadah) {
        return view('ibadah', ['id' => $id_ibadah]);
    }

    public function getTingting($id_tingting) {
        return view('tingting', ['id' => $id_tingting]);
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
                'role' => $result['role'],
            ];
            Session::put('account', $data);
            if($result['role'] == 'admin') return redirect('admin/dashboard');
            return back();
        } else {
            $request->session()->flash('gagal', $request->password);
            return back();
        }
    }

    public function logout () {
        Session::flush();
        return redirect('/');
    }
}
