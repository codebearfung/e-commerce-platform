<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductModel extends BaseModel
{
    protected $table = 'product';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'id_product',
        'id_product_detail',
        'id_product_price',
        'id_category',
        'active',
        'create_time',
        'update_time',
        'sort'
    ];
    public $timestamps = false;

    public function productDetail()
    {
        return $this->hasOne('App\ProductDetailModel','id_product');
    }

    public function getTableColumns()
    {
        $columns = [
            'id_product'=>'商品ID',
            'id_product_detail'=>'商品详情ID',
            'id_product_price'=>'商品价格ID',
            'id_category'=>'商品分类',
            'active'=>'激活',
            'create_time'=>'创建时间',
            'update_time'=>'更新时间',
            'sort'=>'排序值'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }

}
