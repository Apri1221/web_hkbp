<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait ResponseJSON {
    public function sendingData($data) {
        if (!$data) return response()->json(null, 404);
        else return response()->json($data, 200);
    }
}

trait FileManagement {
    public function getFile($name, $basePath){
        $path = public_path().$basePath.$name;
        return File::exists($path) ? url($basePath.$name) : null;
    }

    public function uploadFile($file, $basePath)
    {
        $fileName = Str::random(8) . date("Ymd") .
                    ".{$file->getClientOriginalExtension()}";

        $destinationPath = public_path($basePath);
        $file->move($destinationPath, $fileName);
        return $fileName;
    }

    public function downloadFile($name, $basePath) 
    {
        // https://stackoverflow.com/questions/43091997/laravel-get-file-content
        $path = public_path().$basePath.$name;
        if(File::exists($path)) return File::get($path);
    }

    public function deleteFile($name, $basePath)
    {
        // "http://localhost:8000/assets/images/tingting/WqadiLur20200810.png"
        $path = public_path().$basePath.$name;
        if(File::exists($path)) File::delete($path);
    }
}


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
