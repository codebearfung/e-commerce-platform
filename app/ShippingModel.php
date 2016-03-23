<?php

namespace App;

class ShippingModel extends BaseModel
{
    protected $table = 'shipping';
    protected $fillable = [

    ];

    public $primaryKey = 'id_shipping';

    public function getTableColumns()
    {
        $columns = [

        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
