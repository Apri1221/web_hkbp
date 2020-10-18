@extends('layouts.template')

@push ('any_css')
<link rel="stylesheet" href="https://unpkg.com/react-jinke-music-player@4.19.0/assets/index.css"/>
@endpush

@section('content')
<div id="contentIbadah" post-id={{$id}}></div>
@endsection

@push('any_js')

<!-- https://codepen.io/cwiens/full/gyvqrg, https://greensock.com/cheatsheet/ -->

<script src="https://unpkg.com/react-jinke-music-player@4.19.0/dist/react-jinke-music-player.min.js"></script>

<script type="text/babel" src="{{ asset('assets/js/dataIbadah.js') }}"></script>
@endpush