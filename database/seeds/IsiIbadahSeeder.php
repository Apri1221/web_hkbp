<?php

use App\IsiIbadah;
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
                IsiIbadah::create([
                    'isi_konten' => "isi konten " .$a,
                    'judul_konten' => "judul konten " .$a,
                    'id_ibadah' =>  $i,
                ]);
            }
    	}
    }
}
