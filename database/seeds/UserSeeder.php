<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'adminhkbp',
            'email' => 'admin@hkbppadangbulan.com',
            'password' => Hash::make('P@ssw0rd'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
