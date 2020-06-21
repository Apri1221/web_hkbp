<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IsiIbadah extends Model
{
    protected $table = 'isi_ibadah';

    protected $fillable = ['judul_konten', 'isi_konten', 'id_ibadah'];
}
