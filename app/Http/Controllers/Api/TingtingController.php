<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Tingting;
use App\Tag;
use App\RelationTag;
use Illuminate\Http\Request;

class TingtingController extends Controller
{
    public function createTingting(request $request)
    {
        $tingting = new Tingting();
        $tingting->title = $request->title;
        $tingting->content = $request->content;
        $tingting->save();
        $tingtingTags = collect();
        

        foreach($request->tags as $tag){
            $nameTag = Tag::where('tag_name', $tag['tag_name'])->first();
            if($nameTag == null){
                $newTag = new Tag();
                $newTag->tag_name = $tag['tag_name'];
                $newTag->save();
                $tingtingTags->add($newTag);
            }else{
                $tingtingTags->add($nameTag);
            }
        }

        foreach($tingtingTags as $tag){
            $relationTag = new RelationTag();
            $relationTag->id_relation_tingting = $tingting->id;
            $relationTag->id_relation_tag = $tag->id;
            $relationTag->save();
        }

        return $tingtingTags;
    }
}
