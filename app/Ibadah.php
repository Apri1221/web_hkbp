<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ibadah extends Model
{
    protected $table = 'ibadah';

    protected $fillable = ['judul', 'deskripsi'];
}
