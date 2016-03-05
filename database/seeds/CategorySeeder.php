<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'attribute_type_name'=>'text',

            ],
        ];

        foreach ($categories as $category)
            \App\CategoryModel::create($attribute_type);
    }
}
