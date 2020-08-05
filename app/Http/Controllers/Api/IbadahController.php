<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseJSON;
use App\Ibadah;
use App\IbadahContent;
use Illuminate\Http\Request;

class IbadahController extends Controller
{
    use ResponseJSON;

    public function getIbadah($id = null){
        $ibadahs = !$id ? Ibadah::with('content')->get() : 
                    Ibadah::where('id', $id)->with('content')->get();

        $data = $ibadahs->sortByDesc('created_at');
        return $this->sendingData($data->flatten());
    }

    public function createIbadah(request $request){
        $ibadah = new Ibadah;
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();

        foreach ($request->contents as $oneContent) {
            $ibadahContent = new IbadahContent();
            $ibadahContent->title = $oneContent['title'];
            $ibadahContent->content = $oneContent['post'];
            $ibadahContent->id_ibadah = $ibadah->id;
            $ibadahContent->save();
        }

        return $this->sendingData(null);
    }

    public function updateIbadah(request $request, $id){
        $ibadah = Ibadah::where('id', $id)->first();
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();

        $ibadahContent = IbadahContent::where('id_ibadah', $id);
        $ibadahContent->delete(); // anjir masa gini wkkwk
        foreach ($request->contents as $content) {
            $newIbadahContent = new IbadahContent();
            $newIbadahContent->title = $content['title'];
            $newIbadahContent->content = $content['post'];
            $newIbadahContent->id_ibadah = $ibadah->id;
            $newIbadahContent->save();
        }
        return $this->sendingData(null);
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
        return $this->sendingData(null);
    }
}
