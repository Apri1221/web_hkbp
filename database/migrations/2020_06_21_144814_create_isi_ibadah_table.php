<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIsiIbadahTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ibadah_content', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('content');
            $table->unsignedBigInteger('id_ibadah');
            $table->foreign('id_ibadah')->references('id')->on('ibadah');
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
        Schema::dropIfExists('isi_ibadah');
    }
}
