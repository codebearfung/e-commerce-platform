<?php
namespace App\Http\Controllers\Frontend;


use App\Http\Controllers\FrontendController;
use App\ProductModel;

class ProductController extends FrontendController
{
    public function index()
    {
        $data = [];
        return $this->render('product.index',$data);
    }
}