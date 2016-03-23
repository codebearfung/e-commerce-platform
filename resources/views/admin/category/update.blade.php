@extends('layout.admin')
@section('content')
    <div class="main-wrap">

        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/category')}}">属性列表</a><span class="crumb-step">&gt;</span><span>更改属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/category-modify')}}/{{$category['id_category']}}" method="post" name="form-category-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>
                        @foreach ($category_columns as $key=>$column)
                            <tr>
                                <th>{{$column}}</th>
                                @if (array_key_exists($key,$category_detail_columns))
                                    <td>
                                    @if (in_array($key,['short_description','description']))
                                    <textarea id="{{$key}}" name="{{$key}}">
                                        {!! $category['category_detail'][$key] !!}
                                    </textarea>
                                    @else
                                        <input type="text" class="common-text required" size="50" name="{{$key}}" value="{{$category['category_detail'][$key]}}" />
                                    @endif
                                    </td>
                                @elseif ($key == 'active')
                                    <td>
                                        <select name="active" id="active" class="required">
                                            <option value="1">是</option>
                                            <option value="0">否</option>
                                        </select>
                                    </td>
                                @else
                                    <td><input type="text" class="common-text" size="50" value="{{$category[$key]}}" name="{{$key}}"/></td>
                                @endif
                            </tr>
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
    <script type="text/javascript" src="{{asset('assets/ckeditor/ckeditor.js')}}"></script>
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

        CKEDITOR.replace('short_description');
        CKEDITOR.replace('description');
    </script>
</body>
</html>
@stop