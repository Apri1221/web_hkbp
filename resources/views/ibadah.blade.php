@extends('layouts.template')

@section('content')
<div id="contentIbadah" post-id={{$id}} ></div>
@endsection

@push('any_js')

<!-- https://codepen.io/cwiens/full/gyvqrg, https://greensock.com/cheatsheet/ -->

<script type="text/babel" src="{{ asset('assets/js/dataIbadah.js') }}"></script>
@endpush