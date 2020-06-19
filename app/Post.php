<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'category_id', 'announce_id'];

    protected $table = 'posts';

    public function announcement() {
        return $this->belongsTo(Announcement::class);
    }

    public function category() {
        return $this->hasOne(Category::class);
    }
}
