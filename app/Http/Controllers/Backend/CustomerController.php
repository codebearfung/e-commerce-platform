<?php
namespace App\Http\Controllers\Backend;

use App\CustomerModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BackendController;

class CustomerController extends BackendController
{
    /**
     * 顾客列表
     */
    public function index(Request $request)
    {
        $customer_model = new CustomerModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $request = $request->all();
            $this->condition['condition'] = [
                'customer_name'=>$request['keywords'],
            ];
        } else {

        }

        $pagination = $customer_model->pagination($this->condition);

        $data = [
            'customer_list'=>$pagination,
            'customer_columns'=>$this->setFormLabels($customer_model),
        ];

        return view('admin.customer.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $customer_model       = new CustomerModel();
        $customer_type_model  = new CustomerTypeModel();
        $customer_value_model = new CustomerValueModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'customer_name'=>$request['customer_name'],
                'customer_type'=>intval($request['customer_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($customer_model->readOneByCondition(['customer_name'=>$request['customer_name']]))
                return redirect('admin/customer-create');

            $customer = $customer_model->add($data);

            $id_customer  = intval($customer->id_customer);

            if ($id_customer > 0)
            {
                if (empty($request['customer_value']))
                    return redirect('admin/customer');

                if (strpos($request['customer_value'],parent::SEPERATOR))
                {
                    $customer_values = explode(parent::SEPERATOR,$request['customer_value']);
                    foreach ($customer_values as $customer_value)
                    {
                        $customer_value_insert = [
                            'id_customer'=>$id_customer,
                            'customer_value'=>$customer_value
                        ];
                        $customer_value_model->add($customer_value_insert);
                    }
                    return redirect('admin/customer');
                }
            }

            return redirect('admin/customer-add');
        }

        $data = [
            'customer_columns'=>$this->setFormLabels($customer_model,['id_customer','create_time','update_time'],['customer_value'=>'属性值']),
            'customer_types'=>$customer_type_model->readAll(),
        ];

        return view('admin.customer.create',$data);
    }

    /**
     * 更改属性
     * @param $id_customer
     */
    public function update(Request $request,$id_customer)
    {
        $customer_model       = new CustomerModel();
        $customer_type_model  = new CustomerTypeModel();
        $customer_value_model = new CustomerValueModel();

        $customer_values = '';
        $customer_value_list = $customer_model::find($id_customer)->customerValues;

        foreach($customer_value_list as $customer_value)
            $customer_values .= $customer_value['customer_value'].parent::SEPERATOR;
        $customer_values = rtrim($customer_values,';');
        $customer_columns = $this->setFormLabels($customer_model,['id_customer','create_time','update_time'],['customer_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'customer_name'=>$request['customer_name'],
                'customer_type'=>$request['customer_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_customer = intval($id_customer);

            if (strpos($request['customer_value'],parent::SEPERATOR))
            {
                $is_updated = $customer_model->modify($id_customer,$data);

                if ($is_updated === true)
                {
                    foreach($customer_value_list as $customer_value)
                    {
                        $customer_value->destroy($customer_value['id_customer_value']);
                    }

                    $customer_values = explode(parent::SEPERATOR,$request['customer_value']);
                    foreach ($customer_values as $value)
                    {
                        $value_insert = [
                            'id_customer'=>$id_customer,
                            'customer_value'=>$value
                        ];
                        $customer_value_model->add($value_insert);
                    }

                    return redirect('admin/customer');
                }
            }

            return redirect("admin/customer-update/{$id_customer}");

        }

        $data = [
            'customer'=>$customer_model->readOne($id_customer),
            'customer_types'=>$customer_type_model->readAll(),
            'customer_values'=>$customer_values,
            'customer_columns'=>$customer_columns,
        ];

        return view('admin.customer.update',$data);
    }

    /**
     * 查看属性
     * @param $id_customer
     */
    public function view($id_customer)
    {
        $customer_model = new CustomerModel();
        $customer_type_model = new CustomerTypeModel;

        $customer_values = CustomerModel::find($id_customer)->customerValues->toArray();
        $customer_columns = $this->setFormLabels($customer_model,['id_customer'],['customer_value'=>'属性值']);

        $data = [
            'customer'=>$customer_model->readOne($id_customer),
            'customer_types'=>$customer_type_model->readAll(),
            'customer_values'=>$customer_values,
            'customer_columns'=>$customer_columns,
        ];
        return view('admin.customer.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_customer = $request->input('id_customer');

        if (empty($id_customer))
            echo 'false';
        else
        {
            $customer_model = new CustomerModel;
            $result = $customer_model->del(intval($id_customer));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
