@extends('layouts.template')

@push('any_css')
<style>
</style>
@endpush

@section('content')
<div class="ui container" style="margin:70px 0">
    <div id="contentTingting" tingting-id={{$id}}></div>
</div>
@endsection

@push('any_js')
<script type="text/babel" src="{{ asset('assets/js/tingting/dataTingting.js') }}"></script>
@endpush