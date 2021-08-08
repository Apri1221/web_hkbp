<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
\Carbon\Carbon::setLocale('id');

class Video extends Model
{
    protected $table = 'video_content';

    protected $fillable = ['title', 'description', 'url', 'is_show', 'type'];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
        'updated_at' => 'datetime:d M Y',
    ];
}
