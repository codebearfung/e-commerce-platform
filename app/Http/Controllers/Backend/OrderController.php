<?php
namespace App\Http\Controllers\Backend;

use App\OrderModel;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\BackendController;

class OrderController extends BackendController
{
    /**
     * 属性列表
     */
    public function index(Request $request)
    {
        $order_model = new OrderModel();
        $condition = [];
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $request = $request->all();
            $condition['where'] = [
                'order_name'=>$request['keywords'],
            ];
        } else {

        }

        $pagination = $order_model->pagination($condition);

        $data = [
            'order_list'    => $pagination,
            'order_columns' => $this->setFormLabels($order_model,['id_order','deleted_at']),
        ];

        return view('admin.order.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $order_model       = new orderModel();
        $order_type_model  = new orderTypeModel();
        $order_value_model = new orderValueModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'order_name'=>$request['order_name'],
                'order_type'=>intval($request['order_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($order_model->readOneByCondition(['order_name'=>$request['order_name']]))
                return redirect('admin/order-create');

            $order = $order_model->add($data);

            $id_order  = intval($order->id_order);

            if ($id_order > 0)
            {
                if (empty($request['order_value']))
                    return redirect('admin/order');

                if (strpos($request['order_value'],parent::SEPERATOR))
                {
                    $order_values = explode(parent::SEPERATOR,$request['order_value']);
                    foreach ($order_values as $order_value)
                    {
                        $order_value_insert = [
                            'id_order'=>$id_order,
                            'order_value'=>$order_value
                        ];
                        $order_value_model->add($order_value_insert);
                    }
                    return redirect('admin/order');
                }
            }

            return redirect('admin/order-add');
        }

        $data = [
            'order_columns'=>$this->setFormLabels($order_model,['id_order','create_time','update_time'],['order_value'=>'属性值']),
            'order_types'=>$order_type_model->readAll(),
        ];

        return view('admin.order.create',$data);
    }

    /**
     * 更改属性
     * @param $id_order
     */
    public function update(Request $request,$id_order)
    {
        $order_model       = new orderModel();
        $order_type_model  = new orderTypeModel();
        $order_value_model = new orderValueModel();

        $order_values = '';
        $order_value_list = $order_model::find($id_order)->orderValues;

        foreach($order_value_list as $order_value)
            $order_values .= $order_value['order_value'].parent::SEPERATOR;
        $order_values = rtrim($order_values,';');
        $order_columns = $this->setFormLabels($order_model,['id_order','create_time','update_time'],['order_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'order_name'=>$request['order_name'],
                'order_type'=>$request['order_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_order = intval($id_order);

            if (strpos($request['order_value'],parent::SEPERATOR))
            {
                $is_updated = $order_model->modify($id_order,$data);

                if ($is_updated === true)
                {
                    foreach($order_value_list as $order_value)
                    {
                        $order_value->destroy($order_value['id_order_value']);
                    }

                    $order_values = explode(parent::SEPERATOR,$request['order_value']);
                    foreach ($order_values as $value)
                    {
                        $value_insert = [
                            'id_order'=>$id_order,
                            'order_value'=>$value
                        ];
                        $order_value_model->add($value_insert);
                    }

                    return redirect('admin/order');
                }
            }

            return redirect("admin/order-update/{$id_order}");

        }

        $data = [
            'order'=>$order_model->readOne($id_order),
            'order_types'=>$order_type_model->readAll(),
            'order_values'=>$order_values,
            'order_columns'=>$order_columns,
        ];

        return view('admin.order.update',$data);
    }

    /**
     * 查看属性
     * @param $id_order
     */
    public function view($id_order)
    {
        $order_model = new orderModel();
        $order_type_model = new orderTypeModel;

        $order_values = orderModel::find($id_order)->orderValues->toArray();
        $order_columns = $this->setFormLabels($order_model,['id_order'],['order_value'=>'属性值']);

        $data = [
            'order'=>$order_model->readOne($id_order),
            'order_types'=>$order_type_model->readAll(),
            'order_values'=>$order_values,
            'order_columns'=>$order_columns,
        ];
        return view('admin.order.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_order = $request->input('id_order');

        if (empty($id_order))
            echo 'false';
        else
        {
            $order_model = new orderModel;
            $result = $order_model->del(intval($id_order));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
