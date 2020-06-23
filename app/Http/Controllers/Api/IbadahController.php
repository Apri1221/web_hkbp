<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Ibadah;
use App\IbadahContent;
use Illuminate\Http\Request;

class IbadahController extends Controller
{
    public function getIbadah($id = null){
        $ibadahs = !$id ? Ibadah::all()->sortByDesc('created_at') : Ibadah::where('id', $id)->get();

        $data = collect();
        foreach($ibadahs as $ibadah){
            $ibadahContent = IbadahContent::where('id_ibadah', $ibadah->id)->get();
            $ibadah->content = $ibadahContent;
            $data->add($ibadah);
        }
        return response()->json($data, 200);
    }

    public function createIbadah(request $request){
        $ibadah = new Ibadah;
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();

        foreach ($request->contents as $content) {
            $ibadahContent = new IbadahContent();
            $ibadahContent->title = $content['title'];
            $ibadahContent->content = $content['post'];
            $ibadahContent->id_ibadah = $ibadah->id;
            $ibadahContent->save();
            }

        return "sudah ditambahkan";
    }

    public function updateIbadah(request $request){
        $ibadah = Ibadah::where('id', $request->id)->first();
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();

        $ibadahContent = IbadahContent::where('id_ibadah', $request->id)->get();
        $x = 0;
        foreach ($ibadahContent as $content) {
            $content->title = $request->content[$x]['title'];
            $content->content = $request->content[$x]['content'];
            $content->save();
            $x++;
            }

        return "sudah diganti";
    }

    public function deleteIbadah(request $request){
        $ibadahContent = IbadahContent::where('id_ibadah', $request->id)->get();
        $x = 0;
        foreach ($ibadahContent as $content) {
            $content->delete();
            $x++;
            }
            
        $ibadah = Ibadah::where('id', $request->id)->first();
        $ibadah->delete();

        return "sudah dihapus";
    }
}
