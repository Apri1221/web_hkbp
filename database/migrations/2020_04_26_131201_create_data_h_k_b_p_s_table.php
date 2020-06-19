<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataHKBPSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_jemaat', function (Blueprint $table) {
            $table->increments('id');
            $table->string('distrik');
            $table->string('resort');
            $table->string('gereja');
            $table->string('sektor');
            $table->string('id_sheet');
            $table->string('url_sheet');
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
        Schema::dropIfExists('data_h_k_b_p_s');
    }
}
