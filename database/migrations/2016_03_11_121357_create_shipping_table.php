<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShippingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping', function (Blueprint $table) {
            $table->increments('id_shipping');
            $table->unsignedInteger('id_customer');
            $table->unsignedInteger('id_region');
            $table->string('address1');
            $table->string('address2');
            $table->unsignedSmallInteger('postcode');
            $table->unsignedTinyInteger('active');
            $table->dateTime('create_time');
            $table->dateTime('update_time');
            $table->unsignedSmallInteger('sort');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('shipping');
    }
}
