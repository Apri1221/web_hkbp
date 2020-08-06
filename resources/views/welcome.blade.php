@extends('layouts.template')
@push('any_css')
<style>
    #detailKeluarga {
        background-position: center;
        /* di dribble, dapat gunakn query compress=1&resize=400x300 utk mereduksi file gambar */
        background-image: url("https://cdn.dribbble.com/users/507883/screenshots/3717340/andy-hau-mountains-sunset-illustration.jpg?compress=1&resize=400x300");
        object-fit: cover;
        color: brown
    }

    body #title-massive {
        font-family: 'Montserrat', sans-serif;
        color: white
    }

    .ui.custom.header {
        font-size: 4rem !important;
    }

    .slider .content-slider {
        padding: 1rem;
        overflow: hidden;
        text-align: center;
    }

    .slick-slide, 
    .slick-slide:focus * {
        outline: none !important;
    }

    .slider img {
        object-fit: cover;
    }

    .slider-nav .slick-current {
        background: aqua; /* nanti ganti */
    }

    .slider .content.slide {
        position: relative
    }

    .content.slide .slide-description {
        position: absolute;
        background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(228,253,255,1) 100%);
        padding: 1rem;
        bottom: 0;
        display: inline-flex;
        right: 0;
        border-top-left-radius: 5px;
    }

    .content.slide .slide-description span {
        max-width: 250px;
        white-space: nowrap;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
    }

</style>
@endpush

@push('top_content')
<div class="ui fluid parallax" data-imgsrc="{{ asset('./assets/images/curch.jpg') }}">
    <div class="ui container" style="padding:40vh 0 0">
        <div class="ui two column stackable grid">
            <div class="column">
                <div class="ui custom left aligned header" id="title-massive">
                    HKBP Padang Bulan Medan
                </div>
            </div>
            <div class="column">
                <!-- Not yet content -->
            </div>
        </div>
    </div>
</div>
@endpush

@section('content')
<!-- modal ini digunakan untuk menampilkan data keluarga dari searchData.js (ini sangat kompleks) -->
<div class="ui tiny modal" id="modalDataKeluarga">
    <div class="header" id="detailKeluarga">
    </div>
    <div class="content ui left aligned container" id="dataKeluarga">
    </div>
</div>

<div class="ui container" style="margin:70px 0">
    <div class="ui stackable grid" style="align-items: flex-start;">
        <!-- section content -->
        <div class="twelve wide column">
            <div id="contentJemaat" type-user="{{ Session::has('account') ? 'admin' : 'user' }}"></div>
            <div class="ui hidden divider huge"></div>
            <h1 class="header">Protoype Tingting</h1>
            <div id="announcement"></div>
        </div>
        <!-- section ibadah -->
        <div class="four wide column" id="sticky-content">
            @foreach($ibadahs as $ibadah)
                <div class="ui grey fluid card">
                    <div class="content">
                        <div class="header">{{ $ibadah->title }}</div>
                    </div>
                    <div class="content">
                        <p class="ui description">{{ $ibadah->description }}</p>
                        <div class="ui divider"></div>
                        <a class="ui primary fluid button" href="/post/{{ $ibadah->id }}" rel="noopener noreferrer"></i>Lihat</a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection

@push('any_js')
<script>
    $(document).ready(() => {
        $.fn.uiParallax = function() {
            $(this).each(function() {
                var imageUrl = $(this).data('imgsrc');
                $(this).css('background-image', 'url(' + imageUrl + ')');
            });
        };
        $('.ui.parallax').uiParallax();
    });
</script>

<!-- Library Carousel Slick -->
<script src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

<!-- Library for table sorting -->
<script src="{{ asset('./assets/lib/tablesort/tablesort.min.js') }}"></script>

<script type="text/babel" src="{{ asset('assets/js/searchData.js') }}"></script>
<script type="text/babel" src="{{ asset('assets/js/announce.js') }}"></script>
@endpush