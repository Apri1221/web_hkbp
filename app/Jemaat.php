<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jemaat extends Model
{
    //
    protected $table = 'data_jemaat';

    protected $fillable = ['distrik', 'resort', 'gereja', 'sektor'];
    
    protected $hidden = ['id_sheet', 'url_sheet'];
}
