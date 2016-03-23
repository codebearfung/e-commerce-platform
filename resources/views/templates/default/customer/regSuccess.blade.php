@extends('layout.frontend')
@section('main_content')
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-3 col-lg-offset-4" style="margin-top:50px">
            <div class="row" style="padding:10px;font-size:20px;color:#523669">恭喜您,注册成功</div>
            <div class="row" style="padding:10px;font-size:16px;color:#523669">您的帐号为:{{Session::get('customer')['cellphone']}}</div>
            <div class="row" style="padding:10px;"><input style="height:50px;width:100%" type="button" value="返回注册前页面" class="btn btn-warning"></div>
        </div>
    </div>
</div>
@stop