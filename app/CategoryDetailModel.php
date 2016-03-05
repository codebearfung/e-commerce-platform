<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryDetailModel extends BaseModel
{
    protected $table = 'category_detail';
    protected $fillable = [
        'id_category',
        'short_description',
        'description',
        'meta_title',
        'meta_keywords',
        'meta_description',
    ];

    public function getTableColumns()
    {
        $columns = [
            'id_category'=>'分类ID',
            'short_description'=>'分类短描述',
            'description'=>'分类描述',
            'meta_title'=>'meta标题',
            'meta_keywords'=>'meta关键字',
            'meta_description'=>'meta描述',
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
