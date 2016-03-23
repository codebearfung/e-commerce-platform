@extends('layout.frontend')
@section('main_content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-lg-offset-4" style="margin-top:50px">
                <div class="row" style="padding:10px;font-size:20px;color:#523669">用户登录</div>
                <div class="row" style="padding:10px"><input style="height:40px" placeholder="请输入您的用户名" type="text" class="form-control"/></div>
                <div class="row" style="padding:10px"><input style="height:40px" placeholder="请输入您的密码" type="text" class="form-control"/></div>
                <div class="row" style="padding:10px">
                    <div class="col-lg-6 text-left">
                        <input type="checkbox" /> 下次自动登录
                    </div>
                    <div class="col-lg-6 text-right">
                      <a href="{{url('/')}}/findPassword">忘记密码</a>
                    </div>
                </div>
                <div class="row" style="padding:10px"><input type="button" class="btn btn-warning" value="登录" style="width:100%;height:50px"/></div>
                <div class="row" style="padding:10px">使用第三方帐号登录: <img src="{{asset('/assets/frontend/images/qq_login.jpg')}}"/> <img src="{{asset('/assets/frontend/images/weixin_login.jpg')}}"/></div>
            </div>
        </div>
    </div>
@stop