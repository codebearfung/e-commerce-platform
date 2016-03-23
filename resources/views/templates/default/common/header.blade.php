<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>@if ($meta['title']){{$meta['title']}}@endif</title>
    @if ($meta['keywords'])<meta name="keywords" content="{{$meta['keywords']}}"/>@endif
    @if ($meta['description'])<meta name="description" content="{{$meta['description']}}"/>@endif
    <link rel="stylesheet" href="{{asset('/assets/frontend/css/bootstrap.css')}}"/>
    <script type="text/javascript" src="{{asset('/assets/frontend/js/jquery-1.12.1.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('/assets/frontend/js/bootstrap.js')}}"></script>
    <script type="text/javascript" src="{{asset('/assets/layer/layer.js')}}"></script>
</head>
<body>
<div class="container-fluid">
    <div class="row" style="height:100px;border-bottom:1px solid #eae4e8">
        <div class="col-lg-4" style="padding:30px">
            <img src="{{asset('/assets/frontend/images/head_logo.jpg')}}" />
            <select style="width:100px;border-radius:5px">
                <option>北京</option>
                <option>邯郸</option>
            </select>
        </div>
        <div class="col-lg-2 col-lg-offset-5">
            <div class="col-lg-6 text-right" style="padding:20px">
                @if (Session::get('customer')['cellphone'])
                    <a href="{{url('/')}}/customer">Hi,{{Session::get('customer')['cellphone']}}</a>
                @else
                    <a href="{{url('/')}}/customer/login">登陆</a> | <a href="{{url('/')}}/customer/register">注册</a>
                @endif
            </div>
            <div class="col-lg-6 text-left" style="padding:10px">
                <img src="{{url('/assets/frontend/images/qrcode.png')}}"/>
            </div>
        </div>
    </div>
</div>