<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tingting extends Model
{
    protected $table = 'tingting';

    protected $fillable = ['title', 'content', 'file_attached'];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
        'updated_at' => 'datetime:d M Y',
    ];
}
