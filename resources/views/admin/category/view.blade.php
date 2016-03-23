@extends('layout.admin')
@section('content')
    <div class="main-wrap">
        <div class="crumb-wrap">
            <div class="crumb-list"><i class="icon-font"></i><a href="{{url('/admin')}}">首页</a><span class="crumb-step">&gt;</span><a class="crumb-name" href="{{url('admin/category')}}">分类列表</a><span class="crumb-step">&gt;</span><span>新增分类</span></div>
        </div>
        <div class="result-wrap">
            <div class="result-content">
                <form action="{{url('admin/category-create')}}" method="post" name="form-category-add">
                    {{csrf_field()}}
                    <table class="insert-tab" width="100%">
                        <tbody>

                        @foreach ($category_columns as $key => $column)
                            <tr>
                                <th style="width:200px;">{{$column}}</th>
                                @if ($key == 'active')
                                    <td>
                                        @if ($category['active'] == 1)
                                            是
                                        @else
                                            否
                                        @endif
                                    </td>
                                @elseif ($key == 'short_description' || $key == 'description')
                                    <td>{!! $category[$key] !!}</td>
                                @elseif ($key == 'id_parent_category')
                                    <td>
                                        @if ($category[$key] == 0)
                                            根目录
                                        @else
                                            @foreach($categories as $cate)
                                                @if ($category[$key] == $cate['id_category'])
                                                    {{$cate['category_name']}}
                                                @endif
                                            @endforeach
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