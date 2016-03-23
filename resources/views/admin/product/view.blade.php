@extends('layout.admin')
@section('content')
    <div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/product')}}">产品列表</a><span class="crumb-step">&gt;</span><span>产品详情</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/attribute-create')}}" method="post" name="form-attribute-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>

                        @foreach ($product_columns as $key => $column)
                            <tr>
                                <th style="width:200px;">{{$column}}</th>
                                @if ($key == 'short_description' || $key == 'description')
                                    <td>{!! $product[$key] !!}</td>
                                @elseif($key == 'active')
                                    <td>
                                        @if ($product[$key] == 1)
                                            是
                                        @else
                                            否
                                        @endif
                                    </td>
                                @elseif ($key == 'id_category')
                                    <td>
                                        @foreach($categories as $category)
                                            @if ($category['id_category'] == $product[$key])
                                                {{$category['category_name']}}
                                            @endif
                                        @endforeach
                                    </td>
                                @else
                                    <td>{{$product[$key]}}</td>
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