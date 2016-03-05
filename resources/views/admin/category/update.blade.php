@extends('layout.admin')
@section('content')
    <div class="main-wrap">

        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/category')}}">属性列表</a><span class="crumb-step">&gt;</span><span>更改属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/category-update')}}/{{$category['id_category']}}" method="post" name="form-category-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>
                        @foreach ($category_columns as $key=>$column)
                            @if ($key == 'category_type')
                                <tr>
                                    <th>{{$column}}</th>
                                    <td>
                                        <select name="category_type" id="category_type" class="required">
                                            @foreach ($category_types as $type)
                                                <option @if ($type['id_category_type'] == $category[$key])selected @endif value="{{$type['id_category_type']}}">{{$type['category_type_name']}}</option>
                                            @endforeach
                                        </select>
                                    </td>
                                </tr>
                            @elseif ($key == 'active')
                                <tr>
                                    <th>是否激活：</th>
                                    <td>
                                        <select name="active" id="active" class="required">
                                            <option value="1">是</option>
                                            <option value="0">否</option>
                                        </select>
                                    </td>
                                </tr>
                            @else
                                <tr @if ($key == 'category_value') id="category_value" @endif>
                                    <th>{{$column}}</th>
                                    <td><input type="text" class="common-text required" size="50" value="@if ($key == 'category_value'){{$category_values}}@else {{$category[$key]}} @endif" name="{{$key}}"/> </td>
                                </tr>
                            @endif
                        @endforeach
                            <tr>
                                <th></th>
                                <td>
                                    <input class="btn btn-primary btn6 mr10" value="提交" type="submit">
                                    <input class="btn btn6" onclick="history.go(-1)" value="返回" type="button">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>

    </div>
    <!--/main-->
</div>
    <script type="text/javascript">
        $(function(){
            if ($("#category_type").find("option:selected").text() != '文本框')
                $("category_value").show();
            else
                $("category_value").hide();

            $("#category_type").change(function(){
                var val = $.trim($(this).find("option:selected").text());
                if (val != '文本框')
                    $("#category_value").show();
                else
                    $("#category_value").hide();
            });
        });
    </script>
</body>
</html>
@stop