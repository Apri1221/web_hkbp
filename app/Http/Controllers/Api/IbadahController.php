<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jemaat;
use App\Ibadah;
use App\IsiIbadah;
use Illuminate\Http\Request;
use Revolution\Google\Sheets\Facades\Sheets;

// php artisan vendor:publish --provider="PulkitJalan\Google\GoogleServiceProvider" --tag="config"
// Copied File [\vendor\pulkitjalan\google-apiclient\config\google.php] To [\config\google.php]

class IbadahController extends Controller
{
    public function getAllIbadah(){
        $ibadah = Ibadah::all()->sortByDesc('created_at');

        $all = collect();
        foreach($ibadah as $ibadahSatuan){
            $isi_ibadah = IsiIbadah::where('id_ibadah', $ibadahSatuan->id)->get();
            $ibadahSatuan->isi_ibadah = $isi_ibadah;
            $all->add($ibadahSatuan);
        }
        return $all;
    }

    public function createIbadah(request $request){
        $ibadah = new Ibadah;
        $ibadah->judul = $request->judul;
        $ibadah->deskripsi = $request->deskripsi;
        $ibadah->save();

        foreach ($request->isi_ibadah as $isi) {
            $isi_ibadah = new IsiIbadah();
            $isi_ibadah->judul_konten = $isi['judul_konten'];
            $isi_ibadah->isi_konten = $isi['isi_konten'];
            $isi_ibadah->id_ibadah = $ibadah->id;
            $isi_ibadah->save();
            }

        return "sudah ditambahkan";
    }
}
