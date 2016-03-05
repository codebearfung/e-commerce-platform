<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SystemController extends Controller
{
    /**
     * 修改管理员密码
     */
    public function systemModifyPassword(Request $request)
    {
        if ($request->session()->has('user'))
        {
            $user = $request->session()->get('user');

            return view('admin.system-modify-password');
        }
        else
            return redirect('admin/login');
    }
}
