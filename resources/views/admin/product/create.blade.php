@extends('layout.admin')
@section('content')
    <div class="main-wrap">

        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/product')}}">商品列表</a><span class="crumb-step">&gt;</span><span>新增属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/product-create')}}" method="post" name="form-product-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>
                            @foreach ($product_columns as $key=>$column)
                                @if ($key == 'product_type')
                                    @if (!empty($product_types))
                                        <tr>
                                            <th>{{$column}}:</th>
                                            <td>
                                                <select name="product_type" id="product_type" class="required">
                                                    @foreach ($product_types as $type)
                                                        <option id="{{$type['id_product_type']}}" value="{{$type['id_product_type']}}">{{$type['product_type_name']}}</option>
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
                                    <tr @if ($key=='product_value')id="{{$key}}" @endif>
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
            if ($("#product_type").find("option:selected").text() == '文本框')
                $("#product_value").hide();

            $("#product_type").change(function(){
                var val = $.trim($(this).find("option:selected").text());
                if (val != '文本框')
                    $("#product_value").show();
                else
                    $("#product_value").hide();
            });
        });
    </script>
</body>
</html>
@stop