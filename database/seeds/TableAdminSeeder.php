<?php

use Illuminate\Database\Seeder;

class TableAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $time = date('Y-m-d H:i:s',time());

        $default = [
            'name'=>'admin',
            'pwd'=>md5('123456'),
            'is_login'=>1,
            'create_time'=>$time,
            'update_time'=>$time,
        ];

        \App\AdminModel::create($default);
    }
}
