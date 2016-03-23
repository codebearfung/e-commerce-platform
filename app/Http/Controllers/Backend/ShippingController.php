<?php
namespace App\Http\Controllers\Backend;

use App\ShippingModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BackendController;

class ShippingController extends BackendController
{
    /**
     * 地址列表
     */
    public function index(Request $request)
    {
        $shipping_model = new ShippingModel();
        $condition = [];
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $request = $request->all();
            $condition['where'] = [
                'shipping_name'=>$request['keywords'],
            ];
        } else {

        }

        $pagination = $shipping_model->pagination($condition);

        $data = [
            'shipping_list'=>$pagination,
            'shipping_columns'=>$this->setFormLabels($shipping_model),
        ];

        return view('admin.shipping.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $shipping_model       = new ShippingModel();
        $shipping_type_model  = new ShippingTypeModel();
        $shipping_value_model = new ShippingValueModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'shipping_name'=>$request['shipping_name'],
                'shipping_type'=>intval($request['shipping_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($shipping_model->readOneByCondition(['shipping_name'=>$request['shipping_name']]))
                return redirect('admin/shipping-create');

            $shipping = $shipping_model->add($data);

            $id_shipping  = intval($shipping->id_shipping);

            if ($id_shipping > 0)
            {
                if (empty($request['shipping_value']))
                    return redirect('admin/shipping');

                if (strpos($request['shipping_value'],parent::SEPERATOR))
                {
                    $shipping_values = explode(parent::SEPERATOR,$request['shipping_value']);
                    foreach ($shipping_values as $shipping_value)
                    {
                        $shipping_value_insert = [
                            'id_shipping'=>$id_shipping,
                            'shipping_value'=>$shipping_value
                        ];
                        $shipping_value_model->add($shipping_value_insert);
                    }
                    return redirect('admin/shipping');
                }
            }

            return redirect('admin/shipping-add');
        }

        $data = [
            'shipping_columns'=>$this->setFormLabels($shipping_model,['id_shipping','create_time','update_time'],['shipping_value'=>'属性值']),
            'shipping_types'=>$shipping_type_model->readAll(),
        ];

        return view('admin.shipping.create',$data);
    }

    /**
     * 更改属性
     * @param $id_shipping
     */
    public function update(Request $request,$id_shipping)
    {
        $shipping_model       = new ShippingModel();
        $shipping_type_model  = new ShippingTypeModel();
        $shipping_value_model = new ShippingValueModel();

        $shipping_values = '';
        $shipping_value_list = $shipping_model::find($id_shipping)->shippingValues;

        foreach($shipping_value_list as $shipping_value)
            $shipping_values .= $shipping_value['shipping_value'].parent::SEPERATOR;
        $shipping_values = rtrim($shipping_values,';');
        $shipping_columns = $this->setFormLabels($shipping_model,['id_shipping','create_time','update_time'],['shipping_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'shipping_name'=>$request['shipping_name'],
                'shipping_type'=>$request['shipping_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_shipping = intval($id_shipping);

            if (strpos($request['shipping_value'],parent::SEPERATOR))
            {
                $is_updated = $shipping_model->modify($id_shipping,$data);

                if ($is_updated === true)
                {
                    foreach($shipping_value_list as $shipping_value)
                    {
                        $shipping_value->destroy($shipping_value['id_shipping_value']);
                    }

                    $shipping_values = explode(parent::SEPERATOR,$request['shipping_value']);
                    foreach ($shipping_values as $value)
                    {
                        $value_insert = [
                            'id_shipping'=>$id_shipping,
                            'shipping_value'=>$value
                        ];
                        $shipping_value_model->add($value_insert);
                    }

                    return redirect('admin/shipping');
                }
            }

            return redirect("admin/shipping-update/{$id_shipping}");

        }

        $data = [
            'shipping'=>$shipping_model->readOne($id_shipping),
            'shipping_types'=>$shipping_type_model->readAll(),
            'shipping_values'=>$shipping_values,
            'shipping_columns'=>$shipping_columns,
        ];

        return view('admin.shipping.update',$data);
    }

    /**
     * 查看属性
     * @param $id_shipping
     */
    public function view($id_shipping)
    {
        $shipping_model = new ShippingModel();
        $shipping_type_model = new ShippingTypeModel;

        $shipping_values = ShippingModel::find($id_shipping)->shippingValues->toArray();
        $shipping_columns = $this->setFormLabels($shipping_model,['id_shipping'],['shipping_value'=>'属性值']);

        $data = [
            'shipping'=>$shipping_model->readOne($id_shipping),
            'shipping_types'=>$shipping_type_model->readAll(),
            'shipping_values'=>$shipping_values,
            'shipping_columns'=>$shipping_columns,
        ];
        return view('admin.shipping.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_shipping = $request->input('id_shipping');

        if (empty($id_shipping))
            echo 'false';
        else
        {
            $shipping_model = new ShippingModel;
            $result = $shipping_model->del(intval($id_shipping));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
