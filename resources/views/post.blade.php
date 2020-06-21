@extends('layouts.template')

@section('content')
<div class="ui container" style="margin:70px 0">
    <h1>Title</h1>
    <p>Deskripsi</p>
    <div class="ui hidden divider"></div>
    <div class="ui stackable grid">
        <div class="sixteen wide column">
            <div class="hiddenGSAP">
                <div class="ui raised segment">
                    <h3>Pembukaan</h3>
                    <p>Halo</p>
                </div>
                <div class="ui raised segment">
                    <h3>Bernyanyi</h3>
                    <p>Halo</p>
                </div>
                <div class="ui raised segment">
                    <h3>Votum</h3>
                    <p>Halo</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('any_js')

<script>
    $(document).ready(() => {
        // calling method from template blade
        animateFadeIn('.ui.segment');
    });
</script>

<!-- https://codepen.io/cwiens/full/gyvqrg, https://greensock.com/cheatsheet/ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>
@endpush