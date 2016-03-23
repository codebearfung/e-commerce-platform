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

                        @foreach ($attribute_columns as $key => $column)
                                <tr @if ($attribute['attribute_type']  == '1')id="{{$key}}" style="display:none;" @endif>
                                    <th style="width:80px;">{{$column}}</th>
                            @if ($key == 'attribute_value')
                                <td>
                                    @foreach ($attribute_types as $type)
                                        @if ($type['id_attribute_type'] == $attribute['attribute_type'])
                                            @if ($type['attribute_type_name'] == 'text')

                                            @elseif ($type['attribute_type_name'] == 'select')
                                                <select>
                                                    @foreach ($attribute['attribute_values'] as $value)
                                                        <option>{{$value['attribute_value']}}</option>
                                                    @endforeach
                                                </select>
                                            @elseif ($type['attribute_type_name'] == 'radio')
                                                @foreach ($attribute['attribute_values'] as $value)
                                                    <input type="radio" name="radio[]" />{{$value['attribute_value']}}
                                                @endforeach
                                            @elseif ($type['attribute_type_name'] == 'checkbox')
                                                @foreach ($attribute['attribute_values'] as $value)
                                                    <input type="checkbox"/>{{$value['attribute_value']}}
                                                @endforeach
                                            @else

                                            @endif
                                        @endif
                                    @endforeach
                                </td>
                            @elseif ($key == 'attribute_type')
                            <td>
                                @foreach ($attribute_types as $type)
                                    @if ($type['id_attribute_type'] == $attribute['attribute_type'])
                                        {{$type['attribute_type_name']}}
                                    @endif
                                @endforeach
                            </td>
                            @elseif ($key == 'active')
                                <td>
                                    @if ($attribute['active'] == 1)
                                        是
                                    @else
                                        否
                                    @endif
                                </td>
                            @else
                                <td>{{$attribute[$key]}}</td>
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