<?php

namespace App;

class CategoryModel extends BaseModel
{
    protected $table = 'category';
    protected $fillable = [
        'id_category',
        'category_name',
        'short_description',
        'description',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'category_images',
        'category_link',
        'id_parent_category',
        'level',
        'active',
        'create_time',
        'update_time',
        'sort'
    ];

    public $primaryKey = 'id_category';

    public function categoryDetail()
    {
        return $this->hasOne('App\CategoryDetailModel','id_category','id_category');
    }

    public function categoryProducts()
    {
        return $this->hasMany('App\ProductModel','id_category','id_category');
    }
    public function getTableColumns()
    {
        $columns = [
            'id_category'=>'分类ID',
            'category_name'=>'分类名称',
            'short_description'=>'分类短描述',
            'description'=>'分类描述',
            'meta_title'=>'meta标题',
            'meta_keywords'=>'meta关键字',
            'meta_description'=>'meta描述',
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

    /**
     * 获取所有分类
     * @param array $categories          分类数组
     * @param int   $id_parent_category  父分类ID
     */
    public static function getAllCategories(&$categories,$id_parent_category = 0)
    {
        $category_list = CategoryModel::where('id_parent_category',$id_parent_category)->get()->toArray();
        if (empty($category_list))
            return;
        foreach ($category_list as $key => $category)
        {
            $categories[] = $category;
            CategoryModel::getAllCategories($categories, $category['id_category']);
        }
    }

    /**
     * 根据父分类ID获取分类'
     * @param  int        $id_parent_category 父分类ID
     * @return array|null
     */
    public function getCategoriesByParentId($id_parent_category = 0)
    {
        $categories = $this->readAll(['id_parent_category'=>$id_parent_category]);
        return $categories ? $categories : NULL;
    }

    public function getCategoryProducts($id_category)
    {
        $categoryProducts = $this->readAll(['id_category'=>$id_category],'categoryProducts');
        return $categoryProducts ? $categoryProducts : NULL;
    }
}
