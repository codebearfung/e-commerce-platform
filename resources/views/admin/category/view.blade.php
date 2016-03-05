@extends('layout.admin')
@section('content')
    <div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/category')}}">属性列表</a><span class="crumb-step">&gt;</span><span>新增属性</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/category-create')}}" method="post" name="form-category-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>

                        @foreach ($category_columns as $key => $column)
                                <tr @if ($category['category_type']  == '1')id="{{$key}}" style="display:none;" @endif>
                                    <th style="width:80px;">{{$column}}</th>
                            @if ($key == 'category_value')
                                <td>
                                    @foreach ($category_types as $type)
                                        @if ($type['id_category_type'] == $category['category_type'])
                                            @if ($type['category_type_name'] == '文本框')

                                            @elseif ($type['category_type_name'] == '下拉列表')
                                                <select>
                                                    @foreach ($category_values as $value)
                                                        <option>{{$value['category_value']}}</option>
                                                    @endforeach
                                                </select>
                                            @elseif ($type['category_type_name'] == '单选按钮')
                                                @foreach ($category_values as $value)
                                                    <input type="radio" name="radio[]" />{{$value['category_value']}}
                                                @endforeach
                                            @elseif ($type['category_type_name'] == '多选框')
                                                @foreach ($category_values as $value)
                                                    <input type="checkbox"/>{{$value['category_value']}}
                                                @endforeach
                                            @else

                                            @endif
                                        @endif
                                    @endforeach
                                </td>
                            @elseif ($key == 'category_type')
                            <td>
                                @foreach ($category_types as $type)
                                    @if ($type['id_category_type'] == $category['category_type'])
                                        {{$type['category_type_name']}}
                                    @endif
                                @endforeach
                            </td>
                            @elseif ($key == 'active')
                                <td>
                                    @if ($category['active'] == 1)
                                        是
                                    @else
                                        否
                                    @endif
                                </td>
                            @else
                                <td>{{$category[$key]}}</td>
                            @endif
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </form>
            </div>
        </div>

    </div>
    <!--/main-->
</div>
</body>
</html>
@stop