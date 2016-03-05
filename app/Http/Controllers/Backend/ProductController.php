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
        $product_model = new ProductModel();

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
            'product_list'=>$pagination,
            'product_columns'=>$this->setFormLabels($product_model),
        ];

        return view('admin.product.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $product_model  = new ProductModel();
        $category_model = new CategoryModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'product_name'  => $request['product_name'],
                'product_type'  => intval($request['product_type']),
                'active'        => $request['active'],
                'create_time'   => $time,
                'update_time'   => $time,
                'sort'          => $request['sort'],
            ];

            if ($product_model->readOneByCondition(['product_name'=>$request['product_name']]))
                return redirect('admin/product-create');

            $product = $product_model->add($data);

            return redirect('admin/product-create');
        }

        $this->labels_del = ['id_product','id_product_detail'];

        $this->labels_add = [

        ];

        $data = [
            'product_columns'=>$this->setFormLabels($product_model,$this->labels_del),
            'product_category'=>$category_model,
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
        $product_type_model = new productTypeModel;

        $product_values = productModel::find($id_product)->productValues->toArray();
        $product_columns = $this->setFormLabels($product_model,['id_product'],['product_value'=>'属性值']);

        $data = [
            'product'=>$product_model->readOne($id_product),
            'product_types'=>$product_type_model->readAll(),
            'product_values'=>$product_values,
            'product_columns'=>$product_columns,
        ];
        return view('admin.product.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_product = $request->input('id_product');

        if (empty($id_product))
            echo 'false';
        else
        {
            $product_model = new productModel;
            $result = $product_model->del(intval($id_product));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
