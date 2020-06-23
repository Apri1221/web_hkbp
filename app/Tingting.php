<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tingting extends Model
{
    protected $table = 'tingting';

    protected $fillable = ['title', 'content'];
}
