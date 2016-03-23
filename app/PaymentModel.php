<?php

namespace App;

class PaymentModel extends BaseModel
{
    protected $table = 'payment';
    protected $fillable = [

    ];

    public $primaryKey = 'id_payment';

    public function getTableColumns()
    {
        $columns = [

        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
