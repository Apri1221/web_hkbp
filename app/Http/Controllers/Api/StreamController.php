<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseJSON;
use App\Video;
use Illuminate\Http\Request;

class StreamController extends Controller
{
    use ResponseJSON;


    public function getVideo(Request $request, $id = null) {
        $query = $request->query();
        $condition = [];
        $all_post = $query['all'] ?? false;
        if (!$all_post) {
            $condition += ['is_show' => true];
        }
        if ($id != null) $condition += ['id' => $id];

        $videos = Video::where($condition)->get();

        $data = $videos->sortByDesc('created_at');
        return $this->sendingData($data->flatten());
    }

    public function createVideo(request $request) {
        $video = new Video;
        $input = $request->all();
        $video->fill(collect($input)
            ->except(['type', 'is_show'])
            ->put('type', $this->videoType($request->url))
            ->put('is_show', $request->is_show == false || $request->is_show == 'false' ? 0 : 1)
            ->all())
            ->save();
        return $this->sendingData('Success', 200);
    }

    public function updateVideo(request $request, $id) {
        $video = Video::findOrFail($id);
        $input = $request->all();
        $video->fill(collect($input)
            ->except(['type', 'is_show'])
            ->put('type', $this->videoType($request->url))
            ->put('is_show', $request->is_show == false || $request->is_show == 'false' ? 0 : 1)
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
