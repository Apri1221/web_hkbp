@extends('layouts.template')

@push('any_css')
<style>
</style>
@endpush

@section('content')
<div id="testPage"></div>
@endsection

@push('any_js')
<script type="text/babel" src="{{ asset('assets/js/testPage.js') }}"></script>
@endpush