<?php
namespace App\Http\Controllers\Frontend;

use App\CategoryModel;
use App\ProductModel;
use Illuminate\Http\Request;
use App\Http\Controllers\FrontendController;

class CategoryController extends FrontendController
{
    public function index($id_category)
    {
        if (intval($id_category) <= 0)
            exit('分类不存在');
        $category_model  = new CategoryModel();
        $categories = $category_model->getCategoryProducts(intval($id_category));
        $data = [
            'categories'=>$categories,
        ];
        return $this->render('category.index',$data);
    }
}