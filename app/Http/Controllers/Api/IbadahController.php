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

        foreach ($request->content as $oneContent) {
            $ibadahContent = new IbadahContent();
            $ibadahContent->title = $oneContent['title'];
            $ibadahContent->content = $oneContent['post'];
            $ibadahContent->id_ibadah = $ibadah->id;
            $ibadahContent->save();
        }

        return response()->json('', 200);
    }

    public function updateIbadah(request $request, $id){
        $ibadah = Ibadah::where('id', $id)->first();
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();

        $ibadahContent = IbadahContent::where('id_ibadah', $id);
        $ibadahContent->delete();
        foreach ($request->content as $content) {
            $newIbadahContent = new IbadahContent();
            $newIbadahContent->title = $content['title'];
            $newIbadahContent->content = $content['post'];
            $newIbadahContent->id_ibadah = $ibadah->id;
            $newIbadahContent->save();
        }

        return response()->json('', 200);
    }

    public function deleteIbadah($id){
        $ibadahContent = IbadahContent::where('id_ibadah', $id)->get();
        $x = 0;
        foreach ($ibadahContent as $content) {
            $content->delete();
            $x++;
        }
            
        $ibadah = Ibadah::where('id', $id)->first();
        $ibadah->delete();

        return response()->json('', 200);
    }
}
