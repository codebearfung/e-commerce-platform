<?php

namespace App;

class ProductModel extends BaseModel
{
    protected $table = 'product';

    protected $fillable = [
        'id_product',
        'id_category',
        'category_name',
        'short_description',
        'description',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'product_price',
        'product_discount',
        'hot',
        'active',
        'create_time',
        'update_time',
        'sort'
    ];
    protected $primaryKey = 'id_product';

    public function productDetail()
    {
        return $this->hasOne('App\ProductDetailModel','id_product');
    }

    public function getTableColumns()
    {
        $columns = [
            'id_product'        => '商品ID',
            'id_category'       => '商品分类',
            'category_name'     => '商品名称',
            'short_description' => '商品短描述',
            'description'       => '商品描述',
            'meta_title'        => 'meta标题',
            'meta_keywords'     => 'meta关键字',
            'meta_description'  => 'meta描述',
            'product_price'     => '商品价格',
            'product_discount'  => '商品折扣',
            'hot'               => '热门商品',
            'active'            => '激活',
            'create_time'       => '创建时间',
            'update_time'       => '更新时间',
            'sort'              => '排序值'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
