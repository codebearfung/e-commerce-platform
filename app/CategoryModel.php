<?php

namespace App;

class CategoryModel extends BaseModel
{
    protected $table = 'category';
    protected $fillable = [
        'id_category',
        'id_category_detail',
        'category_images',
        'category_link',
        'id_category_parent',
        'level',
        'active',
        'create_time',
        'update_time',
        'sort'
    ];

    public function categoryDetail()
    {
        return $this->hasOne('App\CategoryDetailModel','id_category','id_category');
    }

    public function getTableColumns()
    {
        $columns = [
            'id_category'=>'分类ID',
            'id_category_detail'=>'分类详情ID',
            'category_images'=>'分类图片',
            'category_link'=>'分类链接',
            'id_parent_category'=>'父分类',
            'level'=>'层级',
            'active'=>'激活',
            'create_time'=>'创建时间',
            'update_time'=>'更新时间',
            'sort'=>'排序值'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }

    public function getAllCategories(&$categories,$id_parent_category = 0)
    {
        $category_list = $this->with('categoryDetail')->where('id_parent_category',$id_parent_category)->get()->toArray();
        if (empty($category_list))
            return;
        foreach ($category_list as $key => $category)
        {
            $categories[] = $category;
            $this->getAllCategories($categories, $category['id_category']);
        }
    }
}
