@extends('layouts.template')

@section('content')
<div class="ui container" style="margin:70px 0">
    <div id="contentIbadah" post-id={{$id}} ></div>
</div>
@endsection

@push('any_js')

<!-- https://codepen.io/cwiens/full/gyvqrg, https://greensock.com/cheatsheet/ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>

<script type="text/babel" src="{{ asset('assets/js/dataIbadah.js') }}"></script>
@endpush