<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>『豪情』后台管理</title>
    <link rel="stylesheet" href="{{asset('assets/css/admin_login.css')}}"/>
    <script type="text/javascript" src="{{asset('/assets/js/jquery1.12.js')}}"></script>
    <script type="application/javascript" src="{{asset('/assets/js/layer/layer.js')}}"></script>
</head>
<body>
<div class="admin_login_wrap">
    <h1>后台管理</h1>
    <div class="adming_login_border">
        <div class="admin_input">
            <form action="{{url('admin/valid')}}" method="post">
                <ul class="admin_items">
                    <li>
                        @if (count($errors) > 0)
                        <ul>
                            @foreach($errors->all() as $key=>$error)
                            <li><font color="#FF0000">{{$error}}</font></li><br/>
                            @endforeach
                        </ul>
                        @endif
			@if (session('hasExists'))
			<font color="#ff0000">{{session('hasExists')}}</font>
			@endif
                    </li>
                    <li>
                        <label for="user">用户名：</label>
                        <input type="text" name="username" value="请输入用户名" class="admin_input_style" />
                    </li>
                    <li>
                        <label for="pwd">密码：</label>
                        <input type="text" name="password" value="请输入密码" class="admin_input_style" />
                    </li>
                    <li>
                        <input type="submit" tabindex="3" value="提交" class="btn btn-primary" />
                    </li>
                </ul>
                {{--<input type="hidden" name="_token" value="{{csrf_token()}}"/>--}}
                {{ csrf_field() }}
            </form>
        </div>
    </div>
    <p class="admin_copyright"><a tabindex="5" href="http://www.mycodes.net/" target="_blank">返回首页</a> &copy; 2014 Powered by <a href="http://www.mycodes.net/" target="_blank">源码之家</a></p>
</div>
<script type="text/javascript">
    $(function(){
        $("input").focus(function(){
            $(this).val('');
        }).blur(function(){
            var val = $.trim($(this).val());
            if (val == '')
            {
                var name = $.trim($(this).attr('name'));
                if (name == 'username')
                    $(this).val('请输入用户名');
                if (name == 'password')
                {
                    $(this).val('请输入密码');
                    this.type = 'text';
                }
            }
        }).keyup(function(){
            if ($.trim($(this).attr('name')) == 'password')
            {
                var content = $(this).val();
                $(this).val('').focus().val(content);
                this.type = 'password';
            }
        });
    });
</script>
</body>
</html>

