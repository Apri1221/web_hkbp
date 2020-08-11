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

    private function createContentIbadah($title, $post, $id_ibadah){
        $ibadahContent = new IbadahContent();
        $ibadahContent->title = $title;
        $ibadahContent->content = $post;
        $ibadahContent->id_ibadah = $id_ibadah;
        $ibadahContent->save();
    }

    private function deleteContentIbadah($id_ibadah) {
        $ibadahContent = IbadahContent::where('id_ibadah', $id_ibadah);
        $ibadahContent->delete(); // anjir masa gini wkkwk
    }

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
        foreach ($request->contents as $content) {
            $this->createContentIbadah($content['title'], $content['post'], $ibadah->id);
        }
        return $this->sendingData('Success', 200);
    }

    public function updateIbadah(request $request, $id){
        $ibadah = Ibadah::findOrFail($id);
        $ibadah->title = $request->title;
        $ibadah->description = $request->description;
        $ibadah->save();
        $this->deleteContentIbadah($id);
        foreach ($request->contents as $content) {
            $this->createContentIbadah($content['title'], $content['post'], $id);
        }
        $ibadah->touch();
        return $this->sendingData('Success', 200);
    }

    public function deleteIbadah($id){
        $this->deleteContentIbadah($id);
        $ibadah = Ibadah::findOrFail($id);
        $result = $ibadah->delete();
        return $this->sendingData($result);
    }
}
