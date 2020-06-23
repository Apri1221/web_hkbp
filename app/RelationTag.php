<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RelationTag extends Model
{
    protected $table = 'relation_tag';

    protected $fillable = ['id_relation_tag', 'id_relation_tingting'];
}
