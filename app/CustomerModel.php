<?php

namespace App;

class CustomerModel extends BaseModel
{
    protected $table = 'customers';
    protected $fillable = [
        'id_customer',
        'username',
        'password',
        'nickname',
        'avatar',
        'email',
        'cellphone',
        'active',
        'create_time',
        'update_time',
        'sort'

    ];


    public $primaryKey = 'id_customer';

    public function getTableColumns()
    {
        $columns = [
            'id_customer'=>'顾客ID',
            'username'=>'用户名',
            'password'=>'密码',
            'nickname'=>'昵称',
            'avatar'=>'头像',
            'email'=>'电子邮箱',
            'cellphone'=>'手机',
            'active'=>'激活',
            'create_time'=>'创建时间',
            'update_time'=>'更新时间',
            'sort'=>'排序值'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
