<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
\Carbon\Carbon::setLocale('id');

class Ibadah extends Model
{
    protected $table = 'ibadah';

    protected $fillable = ['title', 'description'];

    public function content() {
        return $this->hasMany(IbadahContent::class, 'id_ibadah');
    }

    protected $casts = [
        'updated_at' => 'datetime:d M Y',
    ];
}
