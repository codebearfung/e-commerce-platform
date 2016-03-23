<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id_customer');
            $table->string('username',255);
            $table->char('password',32);
            $table->string('nickname',255);
            $table->string('avatar',255);
            $table->string('email',255);
            $table->char('telephone',11);
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
        Schema::drop('customers');
    }
}
