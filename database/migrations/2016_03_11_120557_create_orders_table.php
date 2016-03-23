<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id_order');
            $table->unsignedInteger('id_shipping');
            $table->unsignedInteger('id_payment');
            $table->string('reference');
            $table->unsignedTinyInteger('order_state');
            $table->unsignedSmallInteger('total_quantity');
            $table->decimal('total_price',5,2);
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
        Schema::drop('orders');
    }
}
