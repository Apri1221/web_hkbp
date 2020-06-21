<?php

use Illuminate\Database\Seeder;
use App\Jemaat;

class JemaatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Jemaat::create([
            // 'nama_kolom' => 'value'
            'distrik' => 'Distrik X - Medan Aceh',
            'resort' => 'Padang Bulan',
            'sektor' => 'Sektor 14',
            'url_sheet' => '1XQXOEorERpWq-DyVCRKN7EHX7hPkZUgKLm9oIpkoQeo',
            'id_sheet' => 'Sektor14'
        ]);
    }
}
