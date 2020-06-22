<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Ibadah;
use App\IsiIbadah;
use Illuminate\Http\Request;

class IbadahController extends Controller
{
    public function getIbadah($id = null){
        $ibadah = !$id ? Ibadah::all()->sortByDesc('created_at') : Ibadah::where('id', $id)->get();

        $data = collect();
        foreach($ibadah as $ibadahSatuan){
            $isi_ibadah = IsiIbadah::where('id_ibadah', $ibadahSatuan->id)->get();
            $ibadahSatuan->isi_ibadah = $isi_ibadah;
            $data->add($ibadahSatuan);
        }
        return response()->json($data, 200);
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
