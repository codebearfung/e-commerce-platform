<?php
namespace App\Http\Controllers\Backend;

use App\CategoryModel;
use App\ProductModel;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\BackendController;

class ProductController extends BackendController
{
    /**
     * 属性列表
     */
    public function index(Request $request)
    {
        $product_model  = new ProductModel();
        $categories = [];
        CategoryModel::getAllCategories($categories);
        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $where = [
                'product_name'=>$request['keywords'],
            ];
            $pagination = $product_model->pagination($where);
        }
        else
            $pagination = $product_model->pagination();

        $data = [
            'categories'=>$categories,
            'product_list'=>$pagination,
            'product_columns'=>$this->setFormLabels($product_model,['id_product','short_description','description','meta_title','meta_keywords','meta_description']),
        ];

        return view('admin.product.index',$data);
    }

    /**
     * 新增商品
     */
    public function create(Request $request)
    {
        $product_model  = new ProductModel();
        $category_model = new CategoryModel();
        $categories = [];
        $category_model->getAllCategories($categories);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();

            $time = date('Y-m-d H:i:s',time());
            $product_create_data = [
                'id_category'       => $request['id_category'],
                'category_name'     => $request['category_name'],
                'short_description' => $request['short_description'],
                'description'       => $request['description'],
                'meta_title'        => $request['meta_title'],
                'meta_keywords'     => $request['meta_keywords'],
                'meta_description'  => $request['meta_description'],
                'product_price'     => $request['product_price'],
                'product_discount'  => $request['product_discount'],
                'active'            => $request['active'],
                'create_time'       => $time,
                'update_time'       => $time,
                'sort'              => $request['sort'],
            ];

            $product = $product_model->add($product_create_data);

            if ($product !== false)
                return redirect('admin/product');
            else
                return redirect('admin/product-create');
        }

        $data = [
            'product_columns'=>$this->setFormLabels($product_model,['id_product','create_time','update_time']),
            'categories'=>$categories,
        ];

        return view('admin.product.create',$data);
    }

    /**
     * 更改属性
     * @param $id_product
     */
    public function update(Request $request,$id_product)
    {
        $product_model       = new productModel();
        $product_type_model  = new productTypeModel();
        $product_value_model = new productValueModel();

        $product_values = '';
        $product_value_list = $product_model::find($id_product)->productValues;

        foreach($product_value_list as $product_value)
            $product_values .= $product_value['product_value'].parent::SEPERATOR;
        $product_values = rtrim($product_values,';');
        $product_columns = $this->setFormLabels($product_model,['id_product','create_time','update_time'],['product_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'product_name'=>$request['product_name'],
                'product_type'=>$request['product_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_product = intval($id_product);

            if (strpos($request['product_value'],parent::SEPERATOR))
            {
                $is_updated = $product_model->modify($id_product,$data);

                if ($is_updated === true)
                {
                    foreach($product_value_list as $product_value)
                    {
                        $product_value->destroy($product_value['id_product_value']);
                    }

                    $product_values = explode(parent::SEPERATOR,$request['product_value']);
                    foreach ($product_values as $value)
                    {
                        $value_insert = [
                            'id_product'=>$id_product,
                            'product_value'=>$value
                        ];
                        $product_value_model->add($value_insert);
                    }

                    return redirect('admin/product');
                }
            }

            return redirect("admin/product-update/{$id_product}");

        }

        $data = [
            'product'=>$product_model->readOne($id_product),
            'product_types'=>$product_type_model->readAll(),
            'product_values'=>$product_values,
            'product_columns'=>$product_columns,
        ];

        return view('admin.product.update',$data);
    }

    /**
     * 查看属性
     * @param $id_product
     */
    public function view($id_product)
    {
        $product_model = new productModel();
        $categories = [];
        CategoryModel::getAllCategories($categories);
        $data = [
            'categories'      => $categories,
            'product'         => $product_model->readOneById(intval($id_product)),
            'product_columns' => $this->setFormLabels($product_model,['id_product'])
        ];

        return view('admin.product.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_product = $request->input('id_product');

        if (empty($id_product)) {
            echo 'false';
        } else {
            $product_model = new productModel;
            $result = $product_model->del(intval($id_product));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
