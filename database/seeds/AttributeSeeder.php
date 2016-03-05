<?php

use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $attribute_types = [
            ['attribute_type_name'=>'text','sort'=>100],
            ['attribute_type_name'=>'select','sort'=>100],
            ['attribute_type_name'=>'radio','sort'=>100],
            ['attribute_type_name'=>'checkbox','sort'=>100],
        ];

        foreach ($attribute_types as $attribute_type)
            \App\AttributeTypeModel::create($attribute_type);
    }
}
