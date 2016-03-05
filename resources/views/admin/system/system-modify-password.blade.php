@extends('layout.admin')
@section('content')
    <div class="main-wrap">

        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/attribute-list')}}">属性列表</a><span class="crumb-step">&gt;</span><span>新增属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/attribute-add')}}" method="post" name="form-attribute-add">
                    <input type="hidden" name="_token" value="{{csrf_token()}}">
                    <table class="insert-tab" width="100%">
                        <tbody><tr>
                            <th width="120">属性名：</th>
                            <td><input class="common-text" name="attribute_name" size="50" type="text"></td>
                        </tr>
                            @if (!empty($attribute_types))
                            <tr>
                                <th>属性类型：</th>
                                <td>
                                    <select name="attribute_type" id="attribute_type" class="required">
                                        @foreach ($attribute_types as $type)
                                        <option id="{{$type['id_attribute_type']}}" value="{{$type['id_attribute_type']}}">{{$type['attribute_type_name']}}</option>
                                        @endforeach
                                    </select>
                                </td>
                            </tr>
                            @endif
                            <tr id="attribute_value" style="display:none">
                                <th>属性值：</th>
                                <td><input class="common-text" name="attribute_value" size="50" value="" type="text">&nbsp;<i class="require-red">(多个值请使用逗号隔开)</i></td>
                            </tr>
                            <tr>
                                <th>是否激活：</th>
                                <td>
                                    <select name="active" id="active" class="required">
                                        <option value="1">是</option>
                                        <option value="0">否</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>排序值：</th>
                                <td><input type="text" name="sort" class="common-text required" size="50"/></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <input class="btn btn-primary btn6 mr10" value="提交" type="submit">
                                    <input class="btn btn6" onclick="history.go(-1)" value="返回" type="button">
                                </td>
                            </tr>
                        </tbody></table>
                </form>
            </div>
        </div>

    </div>
    <!--/main-->
</div>
    <script type="text/javascript">
        $(function(){
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