<?php

namespace App\Http\Controllers\Api;

// model use in this controller
use App\Tingting;
use App\Tag;
use App\RelationTag;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseJSON;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TingtingController extends Controller
{
    use ResponseJSON;
    // under public/*
    private $basePath = '/assets/images/tingting/';

    private function getImage($name){
        $path = public_path().$this->basePath.$name;
        return File::exists($path) ? url($this->basePath.$name) : null;
    }

    private function uploadImage($file_image)
    {
        $fileName = Str::random(8) . date("Ymd") .
                    ".{$file_image->getClientOriginalExtension()}";

        $destinationPath = public_path($this->basePath);
        $file_image->move($destinationPath, $fileName);
        return $fileName;
    }

    private function downloadImage($name) 
    {
        // https://stackoverflow.com/questions/43091997/laravel-get-file-content
        $path = public_path().$this->basePath.$name;
        if(File::exists($path)) return File::get($path);
    }

    private function deleteImage($name)
    {
        // "http://localhost:8000/assets/images/tingting/WqadiLur20200810.png"
        $path = public_path().$this->basePath.$name;
        if(File::exists($path)) File::delete($path);
    }

    public function showTingting($id = null, Request $request)
    {
        $query = $request->query(); // ex: base_url/api/tingting?apri=irene
        $limit = $query['limit'] ?? null; // null coalescing operator
        $is_image = $query['image'] ?? false;
        
        $tingting = $id ? Tingting::where('id', $id) : 
        (!$is_image ? Tingting::limit($limit) : 
        Tingting::whereNotNull('file_attached')->limit($limit));

        $tingting = $tingting->get();
        $tingting->map(function($q){
            $q['image'] = $this->getImage($q->file_attached);
            return $q;
        })->sortByDesc('created_at');
        
        return $this->sendingData($tingting, 200);
    }

    public function createTingting(Request $request)
    {
        $tingting = new Tingting();
        $input = collect($request)->except('image');
        $fileImg = $request->image ? $request->image : null;
        if ($fileImg != null) {
            try {
                $imgName = $this->uploadImage($fileImg);
                $input->put('file_attached', $imgName);
            } catch (\Throwable $th) {
                return $this->sendingData($th, 500);
            }
        }
        $tingting->fill($input->all())->save();
        return $this->sendingData('Success', 200);
    }

    public function updateTingting(Request $request, $id_tingting) {
        $input = collect($request)->except('image');
        $tingting = Tingting::findOrFail($id_tingting);
        $fileImg = $request->image ? $request->image : null;
        if ($fileImg != null) {
            try {
                $this->deleteImage($tingting->file_attached);
                $imgName = $this->uploadImage($fileImg);
                $input->put('file_attached', $imgName);
            } catch (\Throwable $th) {
                return $this->sendingData($th, 500);
            }
        }
        $tingting->fill($input->all())->save();
        return $this->sendingData('Success', 200);
    }

    public function deleteTingting($id_tingting) {
        $tingting = Tingting::findOrFail($id_tingting);
        $this->deleteImage($tingting->file_attached);
        $tingting->delete();
        $this->sendingData('Success', 200);
    }
}


// public function createTingting(request $request)
// {
//     $tingting = new Tingting();
//     $tingting->title = $request->title;
//     $tingting->content = $request->content;
//     $tingting->save();
//     $tingtingTags = collect();

//     foreach($request->tags as $tag){
//         $nameTag = Tag::where('tag_name', $tag['tag_name'])->first();
//         if ($nameTag == null) {
//             $newTag = new Tag();
//             $newTag->tag_name = $tag['tag_name'];
//             $newTag->save();
//             $tingtingTags->add($newTag);
//         } else {
//             $tingtingTags->add($nameTag);
//         }
//     }

//     foreach($tingtingTags as $tag) {
//         $relationTag = new RelationTag();
//         $relationTag->id_relation_tingting = $tingting->id;
//         $relationTag->id_relation_tag = $tag->id;
//         $relationTag->save();
//     }

//     return $tingtingTags;
// }

// public function updateTingting(request $request) {
//     $tingting = Tingting::find($request->id_tingting);
//     $tingting->title = $request->title;
//     $tingting->content = $request->content;
//     $tingting->save();
//     $tingtingTags = collect();

//     foreach($request->tags as $tag) {
//         $nameTag = Tag::where('tag_name', $tag['tag_name'])->first();
//         if($nameTag == null){
//             $newTag = new Tag();
//             $newTag->tag_name = $tag['tag_name'];
//             $newTag->save();
//             $tingtingTags->add($newTag);
//         }else{
//             $tingtingTags->add($nameTag);
//         }
//     }

//     $relationTag = RelationTag::where('id_relation_tingting', $request->id_tingting);
//     $relationTag->delete();

//     foreach($tingtingTags as $tag) {
//         $relationTag = new RelationTag();
//         $relationTag->id_relation_tingting = $tingting->id;
//         $relationTag->id_relation_tag = $tag->id;
//         $relationTag->save();
//     }

//     return response()->json('Tingting Created', 200);
// }

// public function deleteTingting($id_tingting) {
//     $tingtingTags = RelationTag::where('id_relation_tingting', $id_tingting);
//     $tingtingTags->delete();

//     $tingting = Tingting::find($id_tingting);
//     $tingting->delete();

//     return response()->json('Tingting Deleted', 200);
// }

// public function getSpecificTingting($id_tingting) {
//     $tingtingTags = RelationTag::where('id_relation_tingting', $id_tingting)->get();

//     foreach($tingtingTags as $tag){
//         $tingtingTags->tag_name = Tag::find($tag->id_relation_tag)->tag_name;
//     }
    
//     $tingting = Tingting::find($id_tingting);

//     return response()->json(['tingting' => $tingting, 'tingtingTags' => $tingtingTags], 200);
// }

// public function getAllTingting() {
//     $tingtingForm = new Tingting();
//     $allTingting = collect();
//     $tingtings = Tingting::all();
//     foreach($tingtings as $tingting){
//         $tingtingTags = RelationTag::where('id_relation_tingting', $tingting->id)->get();
//         $allTingtingTags = collect();
//         foreach($tingtingTags as $tag){
//             $tingtingTags->tag_name = Tag::find($tag->id_relation_tag)->tag_name;
//             $allTingtingTags->add($tingtingTags);
//         }
//         $tingtingForm->tingting = $tingting;
//         $tingtingForm->tingtingTags = $allTingtingTags;
//         $allTingting->add($tingtingForm);
//     }
//     return response()->json($allTingting, 200);
// }