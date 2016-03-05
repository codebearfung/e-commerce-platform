@extends('layout.admin')
@section('content')
    <div class="main-wrap">

        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/attribute')}}">属性列表</a><span class="crumb-step">&gt;</span><span>新增属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/attribute-create')}}" method="post" name="form-attribute-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>
                            @foreach ($attribute_columns as $key=>$column)
                                @if ($key == 'attribute_type')
                                    @if (!empty($attribute_types))
                                        <tr>
                                            <th>{{$column}}:</th>
                                            <td>
                                                <select name="attribute_type" id="attribute_type" class="required">
                                                    @foreach ($attribute_types as $type)
                                                        <option id="{{$type['id_attribute_type']}}" value="{{$type['id_attribute_type']}}">{{$type['attribute_type_name']}}</option>
                                                    @endforeach
                                                </select>
                                            </td>
                                        </tr>
                                    @endif
                                @elseif ($key == 'active')
                                    <tr>
                                        <th>{{$column}}:</th>
                                        <td>
                                            <select name="active" id="active" class="required">
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                        </td>
                                    </tr>
                                @else
                                    <tr @if ($key=='attribute_value')id="{{$key}}" @endif>
                                        <th>{{$column}}:</th>
                                        <td><input type="text" name="{{$key}}" id="{{$key}}" class="common-text required" size="50"/></td>
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
            if ($("#attribute_type").find("option:selected").text() == '文本框')
                $("#attribute_value").hide();

            $("#attribute_type").change(function(){
                var val = $.trim($(this).find("option:selected").text());
                if (val != '文本框')
                    $("#attribute_value").show();
                else
                    $("#attribute_value").hide();
            });
        });
    </script>
</body>
</html>
@stop