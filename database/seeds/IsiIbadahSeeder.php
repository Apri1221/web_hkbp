<?php

use App\IbadahContent;
use Illuminate\Database\Seeder;

class IsiIbadahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
        for($i = 1; $i <= 5; $i++){
            for($a = 1; $a <= 4; $a++){
                IbadahContent::create([
                    'content' => "isi konten " .$a,
                    'title' => "judul konten " .$a,
                    'id_ibadah' =>  $i,
                ]);
            }
    	}
    }
}
