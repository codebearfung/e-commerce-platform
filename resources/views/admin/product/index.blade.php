@extends('layout.admin')
@section('content')
<div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('admin')}}">首页</a><span class="crumb-step">&gt;</span><span class="crumb-name">商品列表</span></div>
        </div>
        <div class="search-wrap">
            <div class="search-content">
                <form action="{{url('admin/product-search')}}" method="post">
                    <table class="search-tab">
                        {{csrf_field()}}
                        <tr>
                            <th width="70">关键字:</th>
                            <td><input class="common-text" value="请输入属性名" name="keywords" type="text"></td>
                            <td><input class="btn btn-primary btn2" name="sub" value="查询" type="submit"></td>
                            <td><input type="button" class="btn btn-primary" value="新增" id="product_add"/></td>
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
                            @foreach ($product_columns as $key => $column)
                                <th>{{$column}}</th>
                            @endforeach
                            <th>操作</th>
                        </tr>
                        @foreach ($product_list as $key=>$product)
                            <tr>
                                <td class="tc"><input name="id[]" value="59" type="checkbox"></td>
                                <td>
                                    @if (Request::has('page'))
                                        {{$product_list->perPage()*(Request::input('page')-1)+$key+1}}
                                    @else
                                        {{$key+1}}
                                    @endif
                                </td>
                                @foreach ($product_columns as $k=>$column)
                                    <td>{{$product[$k]}}</td>
                                @endforeach
                                <td>
                                    <a class="link-view" href="{{url('admin/product-view')}}/{{$product['id_product']}}">查看</a>
                                    <a class="link-update" href="{{url('admin/product-update')}}/{{$product['id_product']}}">修改</a>
                                    <a class="link-del" id_product="{{$product['id_product']}}" href="javascript:void(0);">删除</a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="list-page">
                        <span>共有{{$product_list->total()}}条记录</span>
                        <span>{{$product_list->links()}}</span>
                    </div>
                </div>
        </div>
    </div>
    <!--/main-->
    <script type="text/javascript">
        var url = "{{url('admin/product-delete')}}";
        var redirect_url = "{{url('admin/product')}}";
        var _token = "{{csrf_token()}}";
        $(function(){
            $("#product_add").click(function(){
                window.location.href='{{url('admin/product-create')}}';
            });

            $("a[class='link-del']").click(function(){
                var id_product = parseInt($(this).attr('id_product'));

                layer.confirm('delete it?',{icon:2,title:'Tips'},function(_index){
                    $.ajax({
                        'type':'post',
                        'url':url,
                        'data':'id_product='+id_product+'&_token='+_token,
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