<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category', function (Blueprint $table) {
            $table->increments('id_category');
            $table->unsignedInteger('id_category_detail');
            $table->string('product_images',255);
            $table->string('product_link',255);
            $table->unsignedInteger('id_parent_category');
            $table->unsignedTinyInteger('active');
            $table->dateTime('create_time');
            $table->dateTime('update_time');
            $table->unsignedInteger('sort');
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
        Schema::drop('category');
    }
}
