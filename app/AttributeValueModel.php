<?php

namespace App;

class AttributeValueModel extends BaseModel
{
    protected $table = 'attribute_value';
    protected $primaryKey = 'id_attribute_value';
    protected $fillable = [
        'id_attribute_value',
        'id_attribute',
        'attribute_value',
    ];
    public $timestamps = false;
}
