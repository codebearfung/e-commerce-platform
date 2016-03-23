<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>增岭定制后台管理</title>
    <link rel="stylesheet" href="{{asset('assets/backend/css/common.css')}}"/>
    <link rel="stylesheet" href="{{asset('assets/backend/css/main.css')}}"/>
    <script type="text/javascript" src="{{asset('/assets/backend/js/jquery1.12.js')}}"></script>
    <script type="application/javascript" src="{{asset('/assets/layer/layer.js')}}"></script>
</head>
<body>
<div class="topbar-wrap white">
    <div class="topbar-inner clearfix">
        <div class="topbar-logo-wrap clearfix">
            <h1 class="topbar-logo none"><a href="index.html" class="navbar-brand">后台管理</a></h1>
            <ul class="navbar-list clearfix">
                <li><a class="on" href="{{url('/admin')}}">首页</a></li>
                <li><a href="{{url('/')}}" target="_blank">网站首页</a></li>
            </ul>
        </div>
        <div class="top-info-wrap">
            <ul class="top-info-list clearfix">
                <li><a href="{{url('admin/system-modify-password')}}">@if (session('user')){{json_decode(session('user'),true)['name']}} @endif</a>,您好</li>
                <li><a id="logout"  href="javascript:void(0)">退出</a></li>
            </ul>
        </div>
    </div>
</div>
<script type="text/javascript">
    var url = "{{url('admin/logout')}}";
    var redirect_url = "{{url('admin/login')}}";
    var _token = "{{csrf_token()}}";
    $(function(){
        $("#logout").click(function(){
            layer.confirm('确定要退出登陆吗？',function(_index){
                $.ajax({
                    url:url,
                    type:'post',
                    data:'_token='+_token,
                    dataType:'json',
                    success:function(data)
                    {
                        layer.close(_index);
                        if (data.result == 1)
                            window.location.href=redirect_url;
                        else
                            layer.alert(data.msg);
                    }
                });
            });
        });
    });
</script>

