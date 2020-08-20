<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class CheckStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    
    public function handle($request, Closure $next)
    {
        $user = Session::get('account');

        if($user['role'] == 'admin'){
            return $next($request);
        }

        return back()->with('fail_dashboard', 'Masuk Terlebih Dahulu');
    }
}
