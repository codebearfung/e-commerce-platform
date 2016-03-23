<?php
namespace App\Http\Controllers\Backend;

use App\PaymentModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BackendController;

class PaymentController extends BackendController
{
    /**
     * 支付列表
     */
    public function index(Request $request)
    {
        $payment_model = new PaymentModel();
        $condition = [];

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $request = $request->all();
            $condition['where'] = [
                'payment_name'=>$request['keywords'],
            ];
        } else {

        }

        $pagination = $payment_model->pagination($condition);

        $data = [
            'payment_list'=>$pagination,
            'payment_columns'=>$this->setFormLabels($payment_model),
        ];

        return view('admin.payment.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $payment_model       = new PaymentModel();
        $payment_type_model  = new PaymentTypeModel();
        $payment_value_model = new PaymentValueModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'payment_name'=>$request['payment_name'],
                'payment_type'=>intval($request['payment_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($payment_model->readOneByCondition(['payment_name'=>$request['payment_name']]))
                return redirect('admin/payment-create');

            $payment = $payment_model->add($data);

            $id_payment  = intval($payment->id_payment);

            if ($id_payment > 0)
            {
                if (empty($request['payment_value']))
                    return redirect('admin/payment');

                if (strpos($request['payment_value'],parent::SEPERATOR))
                {
                    $payment_values = explode(parent::SEPERATOR,$request['payment_value']);
                    foreach ($payment_values as $payment_value)
                    {
                        $payment_value_insert = [
                            'id_payment'=>$id_payment,
                            'payment_value'=>$payment_value
                        ];
                        $payment_value_model->add($payment_value_insert);
                    }
                    return redirect('admin/payment');
                }
            }

            return redirect('admin/payment-add');
        }

        $data = [
            'payment_columns'=>$this->setFormLabels($payment_model,['id_payment','create_time','update_time'],['payment_value'=>'属性值']),
            'payment_types'=>$payment_type_model->readAll(),
        ];

        return view('admin.payment.create',$data);
    }

    /**
     * 更改属性
     * @param $id_payment
     */
    public function update(Request $request,$id_payment)
    {
        $payment_model       = new PaymentModel();
        $payment_type_model  = new PaymentTypeModel();
        $payment_value_model = new PaymentValueModel();

        $payment_values = '';
        $payment_value_list = $payment_model::find($id_payment)->paymentValues;

        foreach($payment_value_list as $payment_value)
            $payment_values .= $payment_value['payment_value'].parent::SEPERATOR;
        $payment_values = rtrim($payment_values,';');
        $payment_columns = $this->setFormLabels($payment_model,['id_payment','create_time','update_time'],['payment_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'payment_name'=>$request['payment_name'],
                'payment_type'=>$request['payment_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_payment = intval($id_payment);

            if (strpos($request['payment_value'],parent::SEPERATOR))
            {
                $is_updated = $payment_model->modify($id_payment,$data);

                if ($is_updated === true)
                {
                    foreach($payment_value_list as $payment_value)
                    {
                        $payment_value->destroy($payment_value['id_payment_value']);
                    }

                    $payment_values = explode(parent::SEPERATOR,$request['payment_value']);
                    foreach ($payment_values as $value)
                    {
                        $value_insert = [
                            'id_payment'=>$id_payment,
                            'payment_value'=>$value
                        ];
                        $payment_value_model->add($value_insert);
                    }

                    return redirect('admin/payment');
                }
            }

            return redirect("admin/payment-update/{$id_payment}");

        }

        $data = [
            'payment'=>$payment_model->readOne($id_payment),
            'payment_types'=>$payment_type_model->readAll(),
            'payment_values'=>$payment_values,
            'payment_columns'=>$payment_columns,
        ];

        return view('admin.payment.update',$data);
    }

    /**
     * 查看属性
     * @param $id_payment
     */
    public function view($id_payment)
    {
        $payment_model = new PaymentModel();
        $payment_type_model = new PaymentTypeModel;

        $payment_values = PaymentModel::find($id_payment)->paymentValues->toArray();
        $payment_columns = $this->setFormLabels($payment_model,['id_payment'],['payment_value'=>'属性值']);

        $data = [
            'payment'=>$payment_model->readOne($id_payment),
            'payment_types'=>$payment_type_model->readAll(),
            'payment_values'=>$payment_values,
            'payment_columns'=>$payment_columns,
        ];
        return view('admin.payment.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_payment = $request->input('id_payment');

        if (empty($id_payment))
            echo 'false';
        else
        {
            $payment_model = new PaymentModel;
            $result = $payment_model->del(intval($id_payment));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
