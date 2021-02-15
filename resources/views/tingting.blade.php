@extends('layouts.template')

@push('any_css')
<style>
</style>
@endpush

@section('content')
<div id="contentTingting" tingting-id={{$id}}></div>
@endsection

@push('any_js')
<!-- <script type="text/babel" src="{{ asset('assets/js/tingting/dataTingting.js') }}"></script> -->
<script type="text/javascript" src="{{ asset('assets/prod/js/tingting/dataTingting.js') }}"></script>
@endpush