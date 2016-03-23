@extends('layout.frontend')
@section('main_content')
        <div class="row">
           <img width="100%" src="{{asset('assets/frontend/images/business uniform.jpg')}}"/>
        </div>
        @if (!is_null($categories))
        <div class="row">
            @foreach ($categories as $category)
                <div class="col-lg-4" style="height:450px;text-align:center">
                    <div class="row" style="margin:40px;font-size:25px"><a href="{{url('/')}}/category/{{$category['id_category']}}">{{$category['category_name']}}</a></div>
                    <div class="row"><a href="{{url('/')}}/category/{{$category['id_category']}}"><img src="{{asset('assets/frontend/images')}}/{{$category['category_images']}}"/></a></div>
                    <div class="row" style="margin:40px;font-size:16px">{!!$category['short_description']!!}</div>
                </div>
            @endforeach
        </div>
        @endif
        <div class="row">
            <div class="col-lg-12" style="height:450px;background:deepskyblue"></div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="height:750px;background:orangered"></div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="height:500px;background:lightgrey"></div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="height:250px;background:lightseagreen"></div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="height:400px;background:whitesmoke"></div>
        </div>
    </div>
@stop