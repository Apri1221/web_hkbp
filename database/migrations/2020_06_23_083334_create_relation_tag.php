<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelationTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relation_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_relation_tag');
            $table->foreign('id_relation_tag')->references('id')->on('tag');
            $table->unsignedBigInteger('id_relation_tingting');
            $table->foreign('id_relation_tingting')->references('id')->on('tingting');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('relation_tag');
    }
}
