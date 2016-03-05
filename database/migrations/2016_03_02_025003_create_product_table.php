<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->increments('id_product');
            $table->unsignedInteger('id_product_detail');
            $table->unsignedInteger('id_product_price');
            $table->unsignedInteger('id_category');
            $table->unsignedTinyInteger('active')->default(1);
            $table->dateTime('create_time');
            $table->dateTime('update_time');
            $table->unsignedSmallInteger('sort');
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('product');
    }
}
