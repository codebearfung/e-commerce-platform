@extends('layout.frontend')
@section('main_content')
    <div class="container-fluid">
        <div class="row" style="margin-top:50px">
            <div class="col-lg-2" style="height:600px">
                <div class="row">
                    <div class="row text-center"><a href=""><img src="{{asset('/assets/frontend/images/avatar.jpg')}}" /></a></div>
                    <div class="row text-center" style="padding:20px">{{Session::get('customer')['cellphone']}}</div>
                </div>
                <div class="row text-center"><h5><a show="myorder"   href="javascript:void(0);">我的订单</a></h5></div>
                <div class="row text-center"><h5><a show="mymessage" href="javascript:void(0);">我的消息</a></h5></div>
                <div class="row text-center"><h5><a show="myprofile" href="javascript:void(0);">我的设置</a></h5></div>
            </div>
            <div class="col-lg-6 col-lg-offset-1" id="customer" style="height:600px">
                <div class="row" id="myorder" style="display:none">
                    <div class="row" style="color:#523669"><h4>我的订单</h4></div>
                    <div class="row">
                        <div class="col-lg-2 text-center" style="padding:15px;border-top:1px solid #eae4e8;">商品</div>
                        <div class="col-lg-2 text-center" style="padding:15px;border-top:1px solid #eae4e8;">售后</div>
                        <div class="col-lg-2 text-center" style="padding:15px;border-top:1px solid #eae4e8;">合计</div>
                        <div class="col-lg-2 text-center" style="padding:15px;border-top:1px solid #eae4e8;">状态</div>
                        <div class="col-lg-2 text-center" style="padding:15px;border-top:1px solid #eae4e8;">操作</div>
                    </div>

                </div>
                <div class="row" id="mymessage" style="display:none">
                    <div class="row" style="color:#523669"><h4>我的消息</h4></div>
                </div>
                <div class="row" id="myprofile" style="display:none">
                    <div class="row" style="color:#523669"><h4>基本信息</h4></div>
                    <div class="row">
                        <div class="col-lg-2" style="padding:5px;">帐户名:</div>
                        <div class="col-lg-9" style="padding:5px;">{{Session::get('customer')['cellphone']}}</div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2" style="padding:5px;">昵称:</div>
                        <div class="col-lg-9" style="padding:5px;">
                            <input type="text" placeholder="请输入您的昵称" class="form-control"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2" style="padding:5px;">邮箱:</div>
                        <div class="col-lg-9" style="padding:5px;">
                            <input type="text" placeholder="请输入您的邮箱" class="form-control"/>
                        </div>
                    </div>
                    <div class="row" style="border-top:1px solid #eae4e8;color:#523669;margin-top:20px"><h4>头像设置</h4></div>
                    <div class="row">
                        <div class="col-lg-6"><img src="" id="target"/></div>
                        <div class="col-lg-6"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{asset('/assets/jcrop/js/jquery.jcrop.js')}}"></script>
    <link rel="stylesheet" href="{{asset('/assets/jcrop/css/jcrop.css')}}"/>
    <script type="text/javascript">
        $(function(){
            $("a").click(function(){
                var show = $.trim($(this).attr('show'));
                $("#customer").children("div[id='"+show+"']").show();
                $("#customer").children("div[id!='"+show+"']").hide();
            });
        })
    </script>
@stop