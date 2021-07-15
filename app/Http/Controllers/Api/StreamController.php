<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseJSON;
use App\Video;
use Illuminate\Http\Request;

class StreamController extends Controller
{
    use ResponseJSON;


    public function getVideo($id = null) {
        $videos = !$id ? Video::all() : 
                    video::where('id', $id)->get();

        $data = $videos->sortByDesc('created_at');
        return $this->sendingData($data->flatten());
    }

    public function createVideo(request $request) {
        $video = new Video;
        $input = $request->all();
        $video->fill(collect($input)
            ->except(['type'])
            ->put('type', $this->videoType($request->url))
            ->all())
            ->save();
        return $this->sendingData('Success', 200);
    }

    public function updateVideo(request $request, $id) {
        $video = Video::findOrFail($id);
        $input = $request->all();
        $video->fill(collect($input)
            ->except(['type'])
            ->put('type', $this->videoType($request->url))
            ->all())
            ->save();
        $video->touch();
        return $this->sendingData('Success', 200);
    }

    public function deleteVideo($id) {
        $video = Video::findOrFail($id);
        $result = $video->delete();
        return $this->sendingData($result);
    }


    private function videoType($url) {
        if (strpos($url, 'youtube') > 0 || strpos($url, 'youtu.be') > 0) {
            return 'youtube';
        } elseif (strpos($url, 'vidio') > 0) {
            return 'vidio';
        } elseif (strpos($url, 'facebook') > 0) {
            return 'facebook';
        } elseif (strpos($url, 'instagram') > 0) {
            return 'instagram';
        } else {
            return 'unknown';
        }
    }
}
