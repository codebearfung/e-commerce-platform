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
            $table->unsignedInteger('id_category');
            $table->string('category_name',255);
            $table->string('short_description',255);
            $table->text('description');
            $table->string('meta_title',255);
            $table->string('meta_keywords',255);
            $table->string('meta_description',255);
            $table->decimal('product_price',5,2);
            $table->decimal('product_discount',2,1);
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
