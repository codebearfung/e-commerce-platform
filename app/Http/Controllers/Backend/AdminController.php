<?php
namespace App\Http\Controllers\Backend;

use Validator,Session;
use App\AdminModel;
use Illuminate\Http\Request;
use App\Http\Controllers\BackendController;

class AdminController extends BackendController
{
	//属性值分隔符
	const SEPERATOR = ';';

	public function index(Request $request)
	{
		if ($request->session()->has('user'))
			return view('admin.index');
		else
			return redirect('admin/login');	
	}

	public function login(Request $request)
	{
		dd($request->session());
		if ($request->session()->has('user'))
			return redirect('admin');
		else
			return view('admin.login');
	}

	public function valid(Request $request)
	{
		$r = $request->all();
		$validator = Validator::make($r,[
			'username'=>'bail|required',
			'password'=>'bail|required|integer',
		]);

		if ($validator->fails()) {
			return redirect('admin/login')->withErrors($validator)->withInput();
		}

		$where = [
			'name'=>$r['username'],
			'pwd'=>md5($r['password']),
		];

		$hasExists = AdminModel::hasExists($where);

		if (null !== $hasExists) {
			$request->session()->put('user',json_encode(['name'=>$r['username']]));
			return redirect('admin');
		} else {
			return redirect('admin/login')->with('hasExists','用户名或密码错误');
		}
	}

	public function logout(Request $request)
	{
		if ($request->session()->has('user')) {
			//var_dump($request->session()->all());
			$is_forgotten = $request->session()->forget('user');
			var_dump($request->session());

			if ($is_forgotten === null)
				echo json_encode(['result' => 1]);
			exit;
		}

		echo json_encode(['result'=>0,'msg'=>'退出失败']);
		exit;
	}
}
