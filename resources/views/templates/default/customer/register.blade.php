@extends('layout.frontend')
@section('main_content')
    <form name="form_register" action="{{url('/')}}/customer/register" method="post">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-lg-offset-4" style="margin-top:50px">
                <div class="row" style="padding:10px;font-size:20px;color:#523669">新用户注册</div>
                <div class="row" style="padding:10px"><input style="height:40px" placeholder="请输入您的手机" type="text" class="form-control" name="cellphone"/></div>
                <div class="row" style="padding:10px">
                    <div class="col-lg-6" style="padding:0px">
                        <input style="height:40px" id="cellphone" placeholder="请输入手机短信验证码" type="text" class="form-control" name="verify_code"/>
                    </div>
                    <div class="col-lg-5 col-lg-offset-1" style="padding:0px">
                        <input id="verify_code" style="width:100%;height:40px" type="button" class="btn btn-warning" value="获取验证码"/>
                    </div>
                </div>
                <div class="row" style="padding:10px"><input style="height:40px" placeholder="请输入您要设置的密码" type="password" class="form-control" name="password"/></div>
                <div class="row" style="padding:10px"><input style="height:40px" placeholder="请确认密码" type="password" class="form-control" name="password2"/></div>
                <div class="row" style="padding:10px"><input type="checkbox" checked="checked"/> 我已阅读并同意 <a href="">《增岭定制平台服务协议》</a></div>
                <div class="row" style="padding:10px"><input style="width:100%;height:50px" type="button" class="btn btn-warning" value="注册" id="btn_reg"/></div>
                {{csrf_field()}}
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var clock = 10;
        var url = "{{url('/')}}/customer/findCellphone";
        var _token = "{{csrf_token()}}}";
        $(function(){
            $('#cellphone').blur(function(){
                var cellphone = $(this).val();
                $.ajax({
                    url:url,
                    type:'post',
                    data:'cellphone='+cellphone+'&_token='+_token,
                    dataType:'json',
                    success:function(data) {
                        if (data.result == 0) {

                        } else {
                            $(this).appendTo("<span>"+data.msg+"</span>");
                            return;
                        }
                    }
                });
            });

            $('#verify_code').click(function(){
                var verify_code = $(this);
                var timer = window.setInterval(function(){
                    if (clock > 1) {
                        clock = clock - 1;
                        $(verify_code).attr('disabled', 'disabled');
                        $(verify_code).val('还剩下' + clock + '秒');
                    } else {
                        window.clearInterval(timer);
                        $(verify_code).removeAttr('disabled');
                        $(verify_code).val('获取验证码');
                        clock = 10;
                    }
                },1000);
            });

            $('#btn_reg').click(function(){
                var cellphone = $("input[name='cellphone']");
                var cellphone_reg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
                var password = $("input[name='password']");
                var password2 = $("input[name='password2']");
                var verify_code = $("input[name='verify_code']");

                if ($.trim(cellphone.val()) == '') {
                    cellphone.after("<font color='#FF0000'>手机号不能为空</font>");
                    return false;
                } else {
                    cellphone.next().remove();
                }
                if (!cellphone_reg.test(cellphone.val())) {
                    cellphone.after("<font color='#FF0000'>手机号格式不正确</font>");
                    return false;
                } else {
                    cellphone.next().remove();
                }
                if ($.trim(verify_code.val()) == '') {
                    verify_code.after("<font color='#FF0000'>验证码不能为空</font>");
                    return false;
                } else {
                    verify_code.next().remove();
                }
                if ($.trim(password.val()) == '') {
                    password.after("<font color='#FF0000'>密码不能为空</font>");
                    return false;
                } else {
                    password.next().remove();
                }
                if ($.trim(password2.val()) !== $.trim(password.val())) {
                    password2.after("<font color='#FF0000'>密码与上面输入的不符</font>");
                    return false;
                } else {
                    password2.next().remove();
                }

                $("form[name='form_register']").submit();

            });
        })
    </script>
@stop