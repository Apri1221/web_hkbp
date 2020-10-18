<?php

namespace App\Http\Controllers\Api;

// model use in this controller
use App\Tingting;
use App\Tag;
use App\RelationTag;

use App\Http\Controllers\Controller;
use App\Http\Controllers\FileManagement;
use App\Http\Controllers\ResponseJSON;
use Illuminate\Http\Request;

class TingtingController extends Controller
{
    use ResponseJSON;
    use FileManagement;
    // under public/*
    private $basePath = '/assets/images/tingting/';

    public function showTingting($id = null, Request $request)
    {
        $query = $request->query(); // ex: base_url/api/tingting?apri=irene
        $limit = $query['limit'] ?? null; // null coalescing operator
        $is_image = $query['image'] ?? false;

        $tingting = $id ? Tingting::where('id', $id) : (!$is_image ? Tingting::limit($limit) :
            Tingting::whereNotNull('file_attached')->limit($limit));

        $tingting = $tingting->get();
        $tingting->map(function ($q) {
            if ($q->file_attached != null) {
                $q['image'] = $this->getFile($q->file_attached, $this->basePath);
            }
            return $q;
        })->sortByDesc('created_at');

        return $this->sendingData($tingting, 200);
    }

    public function createTingting(Request $request)
    {
        $tingting = new Tingting();
        $input = collect($request)->except('image');
        if ($request->hasFile('image')) {
            $imgName = $this->uploadFile($request->image, $this->basePath);
            $input->put('file_attached', $imgName);
        }
        $tingting->fill($input->all())->save();
        return $this->sendingData('Success', 200);
    }

    public function updateTingting(Request $request, $id_tingting)
    {
        $tingting = Tingting::findOrFail($id_tingting);
        $input = collect($request)->except('image');
        if ($request->hasFile('image')) {
            $this->deleteFile($tingting->file_attached, $this->basePath);
            $imgName = $this->uploadFile($request->image, $this->basePath);
            $input->put('file_attached', $imgName);
        } 
        $tingting->fill($input->all())->save();
        return $this->sendingData('Success', 200);
            
    }

    public function deleteTingting($id_tingting)
    {
        $tingting = Tingting::findOrFail($id_tingting);
        $this->deleteFile($tingting->file_attached, $this->basePath);
        $tingting->delete();
        $this->sendingData('Success', 200);
    }
}