<?php
namespace App\Http\Controllers\Frontend;

use App\CategoryModel;
use App\CustomerModel;
use App\OrderModel;
use Illuminate\Http\Request;
use App\Http\Controllers\FrontendController;

class CustomerController extends FrontendController
{
    public function index()
    {
        $order_model = new OrderModel();
        $data = [
            'orders'=>$order_model->readAll()
        ];
        return $this->render('customer.index',$data);
    }
    public function login()
    {
        $data = [];
        return $this->render('customer.login',$data);
    }

    public function register(Request $request)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $post = $request->all();
                $time = date('Y-m-d H:i:s',time());
                $customer_add = [
                    'password'=>md5($post['password']),
                    'cellphone'=>$post['cellphone'],
                    'active'=>1,
                    'create_time'=>$time,
                    'update_time'=>$time,
                    'sort'=>100,
                ];
                $customer_model = new CustomerModel();
                $customer = $customer_model->add($customer_add);
                if ($customer !== false) {
                    $customer_update = ['nickname'=>'zl_'.$this->getRandomString()];
                    $is_updated = $customer_model->upd($customer['id_customer'],$customer_update);
                    if ($is_updated == 1)
                        $customer_info = ['id'=>$customer['id_customer'],'cellphone'=>$customer['cellphone']];
                    else
                        return direct('/customer/register');
                    $request->session()->put('customer',$customer_info);
                    return redirect('/customer/regSuccess');
                } else {
                    return redirect('/customer/register');
                }
        }

        $data = [];
        return $this->render('customer.register',$data);
    }

    public function findPassword()
    {

    }

    public function findCellphone($cellphone)
    {
        $category_model = new CategoryModel();
        $customer = $category_model->readOneByCondition(['cellphone'=>$cellphone]);

        if ($customer !== NULL )
            echo json_encode(['result'=>1,'msg'=>'手机号已注册']);
        else
            echo json_encode(['result'=>0,'msg'=>'手机号未注册']);
    }

    public function regSuccess(Request $request)
    {
        return $this->render('customer.regSuccess');
    }

    public function getRandomString($number = 6)
    {
        $seeder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';
        $seeder_length = strlen($seeder);
        $string = '';
        for ($i=0;$i<$number;$i++) {
            $index = rand(0,$seeder_length);
            $string .= substr($seeder,$index,1);
        }

        return $string;

    }
}