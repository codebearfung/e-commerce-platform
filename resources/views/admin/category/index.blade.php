@extends('layout.admin')
@section('content')
<div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('admin')}}">首页</a><span class="crumb-step">&gt;</span><span class="crumb-name">分类列表</span></div>
        </div>
        <div class="search-wrap">
            <div class="search-content">
                <form action="{{url('admin/category-search')}}" method="post">
                    <table class="search-tab">
                        <input type="hidden" name="_token" value="{{csrf_token()}}"/>
                        <tr>
                            <th width="70">关键字:</th>
                            <td><input class="common-text" value="请输入属性名" name="keywords" type="text"></td>
                            <td><input class="btn btn-primary btn2" name="sub" value="查询" type="submit"></td>
                            <td><input type="button" class="btn btn-primary" value="新增" id="category_add"/></td>
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
                            @foreach ($category_columns as $key => $column)
                                <th>{{$column}}</th>
                            @endforeach
                            <th>操作</th>
                        </tr>
                        @foreach ($category_list as $key=>$category)
                            <tr>
                                <td class="tc"><input name="id[]" value="59" type="checkbox"></td>
                                <td>
                                    @if (Request::has('page'))
                                        {{$category_list->perPage()*(Request::input('page')-1)+$key+1}}
                                    @else
                                        {{$key+1}}
                                    @endif
                                </td>
                                @foreach ($category_columns as $k=>$column)
                                    @if ($k == 'category_type')
                                        <td>
                                            @foreach ($category_types as $category_type)
                                                @if ($category['category_type'] == $category_type['id_category_type'])
                                                    {{$category_type['category_type_name']}}
                                                @endif
                                            @endforeach
                                        </td>
                                    @elseif ($k == 'active')
                                        <td>
                                            @if ($category['active'] == 1)
                                                <label class="label-success">是</label>
                                            @else
                                                <label class="label-warning">否</label>
                                            @endif
                                        </td>
                                    @else
                                        <td>{{$category[$k]}}</td>
                                    @endif
                                @endforeach
                                <td>
                                    <a class="link-view" href="{{url('admin/category-view')}}/{{$category['id_category']}}">查看</a>
                                    <a class="link-update" href="{{url('admin/category-update')}}/{{$category['id_category']}}">修改</a>
                                    <a class="link-del" id_category="{{$category['id_category']}}" href="javascript:void(0);">删除</a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="list-page">
                        <span>共有{{$category_list->total()}}条记录</span>
                        <span>{{$category_list->links()}}</span>
                    </div>
                </div>
        </div>
    </div>
    <!--/main-->
    <script type="text/javascript">
        var url = "{{url('admin/category-delete')}}";
        var redirect_url = "{{url('admin/category')}}";
        var _token = "{{csrf_token()}}";
        $(function(){
            $("#category_add").click(function(){
                window.location.href='{{url('admin/category-create')}}';
            });

            $("a[class='link-del']").click(function(){
                var id_category = parseInt($(this).attr('id_category'));

                layer.confirm('delete it?',{icon:2,title:'Tips'},function(_index){
                    $.ajax({
                        'type':'post',
                        'url':url,
                        'data':'id_category='+id_category+'&_token='+_token,
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