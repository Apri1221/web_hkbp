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
        Schema::create('isi_ibadah', function (Blueprint $table) {
            $table->id();
            $table->string('judul_konten');
            $table->string('isi_konten');
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
