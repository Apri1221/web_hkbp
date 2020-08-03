<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ibadah extends Model
{
    protected $table = 'ibadah';

    protected $fillable = ['title', 'description'];

    public function content() {
        return $this->hasMany(IbadahContent::class, 'id_ibadah');
    }
}
