<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IbadahContent extends Model
{
    protected $table = 'ibadah_content';

    protected $fillable = ['title', 'content', 'id_ibadah'];
}
