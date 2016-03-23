@extends('layout.frontend')
@section('main_content')
<div class="container-fluid">
    @if ($categories !== NULL)
        <div class="row">
            {{var_dump($hotProducts)}}
        </div>
    @endif
</div>
@stop