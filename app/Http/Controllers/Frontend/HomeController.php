<?php

namespace App\Http\Controllers\Frontend;

use App\CategoryModel;
use App\Http\Controllers\FrontendController;

class HomeController extends FrontendController
{
    public function index() 
    {
        $category_model = new CategoryModel();
        $categories = $category_model->getCategoriesByParentId();
        $data = [
            'categories'=>$categories,
        ];
        return $this->render('home.index',$data);
    }
}
