<?php
namespace App;

class OrderModel extends BaseModel
{
    protected $table = 'orders';

    protected $fillable = [
        'id_order',
        'id_shipping',
        'id_payment',
        'reference',
        'order_state',
        'total_quantity',
        'total_price',
        'create_time',
        'update_time',
        'sort'
    ];

    public $primaryKey = 'id_order';
    public $timestamps = false;

    public function getTableColumns()
    {
        $columns = [
            'id_order'       => '订单ID',
            'id_shipping'    => '订单地址',
            'id_payment'     => '付款方式',
            'reference'      => '订单编号',
            'order_state'    => '订单状态',
            'total_quantity' => '订单总商品数',
            'total_price'    => '订单总金额数',
            'create_time'    => '创建时间',
            'update_time'    => '更新时间',
            'sort'           => '排序'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}