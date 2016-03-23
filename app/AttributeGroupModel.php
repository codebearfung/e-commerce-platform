<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttributeGroupModel extends Model
{
    protected $table = 'attribute_group';
    protected $fillable = [
        'id_attribute_group',
        'id_attribute_attribute',
    ];

    public $timestamps = false;

    public function attributes()
    {
        return $this;
    }
}
