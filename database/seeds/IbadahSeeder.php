<?php

use App\Ibadah;
use Illuminate\Database\Seeder;

class IbadahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $mydate = '23-01-2016';
        $y = 1;
        for($i = 1; $i <= 5; $i++){
            Ibadah::create([
                'title' => "title " .$i,
                'description' => "description " .$i,
                'created_at' =>  date('Y-m-d', strtotime($mydate.' + '.($y++).' days')),
    			'updated_at' => date('Y-m-d', strtotime($mydate.' + '.$y.' days'))
            ]);
        }
    }
}
