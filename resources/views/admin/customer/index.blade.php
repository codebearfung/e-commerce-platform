@extends('layout.admin')
@section('content')
<div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('admin')}}">首页</a><span class="crumb-step">&gt;</span><span class="crumb-name">属性列表</span></div>
        </div>
        <div class="search-wrap">
            <div class="search-content">
                <form action="{{url('admin/customer-search')}}" method="post">
                    <table class="search-tab">
                        <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                        <tr>
                            <th width="70">关键字:</th>
                            <td><input class="common-text" value="请输入属性名" name="keywords" type="text"></td>
                            <td><input class="btn btn-primary btn2" name="sub" value="查询" type="submit"></td>
                            <td><input type="button" class="btn btn-primary" value="新增" id="customer_add"/></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
        <div class="result-wrap">
                <div class="result-content">
                    <table class="result-tab" width="100%">
                        <tr>
                            <th class="tc" width="5%"><input class="allChoose" name="" type="checkbox"><a href="javascript:void(0);">删</a></th>
                            <th>序号</th>
                            @foreach ($customer_columns as $key => $column)
                                <th>{{$column}}</th>
                            @endforeach
                            <th>操作</th>
                        </tr>
                        @foreach ($customer_list as $key=>$customer)
                            <tr>
                                <td class="tc"><input name="id[]" value="59" type="checkbox"></td>
                                <td>
                                    @if (Request::has('page'))
                                        {{$customer_list->perPage()*(Request::input('page')-1)+$key+1}}
                                    @else
                                        {{$key+1}}
                                    @endif
                                </td>
                                @foreach ($customer_columns as $k=>$column)
                                    @if ($k == 'active')
                                        <td>
                                            @if ($customer['active'] == 1)
                                                <label class="label-success">是</label>
                                            @else
                                                <label class="label-warning">否</label>
                                            @endif
                                        </td>
                                    @else
                                        <td>{{$customer[$k]}}</td>
                                    @endif
                                @endforeach
                                <td>
                                    <a class="link-view" href="{{url('admin/customer-view')}}/{{$customer['id_customer']}}">查看</a>
                                    <a class="link-update" href="{{url('admin/customer-update')}}/{{$customer['id_customer']}}">修改</a>
                                    <a class="link-del" id_customer="{{$customer['id_customer']}}" href="javascript:void(0);">删除</a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="list-page">
                        <span>共有{{$customer_list->total()}}条记录</span>
                        <span>{{$customer_list->links()}}</span>
                    </div>
                </div>
        </div>
    </div>
    <!--/main-->
    <script type="text/javascript">
        var url = "{{url('admin/customer-delete')}}";
        var redirect_url = "{{url('admin/customer')}}";
        var _token = "{{csrf_token()}}";
        $(function(){
            $("#customer_add").click(function(){
                window.location.href='{{url('admin/customer-create')}}';
            });

            $("a[class='link-del']").click(function(){
                var id_customer = parseInt($(this).attr('id_customer'));

                layer.confirm('delete it?',{icon:2,title:'Tips'},function(_index){
                    $.ajax({
                        'type':'post',
                        'url':url,
                        'data':'id_customer='+id_customer+'&_token='+_token,
                        dataType:'json',
                        success:function(data)
                        {
                            layer.close(_index);

                            if (data.result == 1)
                                window.location.href=redirect_url;
                            else
                                alert(data.msg);
                            return;
                        }
                    });
                });
            });

            $("input[name='keywords']").focus(function(){
                $(this).val('');
            });
        });
    </script>
@stop