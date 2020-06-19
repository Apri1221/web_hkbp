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

    .ui.form .inline.fields .field {
        padding: 0 1em 1em 0 !important
    }

    .section.blue {
        background-color: var(--main-color-palete)
    }

    .slider .content-custom {
        background: #fff;
        color: #3498db;
        font-size: 36px;
        line-height: 100px;
        margin: 10px;
        padding: 1rem;
        text-align: center;
    }
</style>
@endpush

@push('any_content')
<div class="ui fluid parallax" data-imgsrc="{{ asset('./assets/images/curch.jpg') }}">
    <div class="ui container" style="padding:60vh 0 0">
        <div class="ui two column stackable grid">
            <div class="column">
                <div class="ui custom left aligned header" id="title-massive">
                    We Worship You
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
            <div id="announcement"></div>
        </div>
        <!-- section announcement -->
        <div class="four wide column" id="sticky-content">
            <div class="ui fluid card">
                <div class="content">
                    <div class="header">Pelayanan Minggu, 28 Oktober 2020</div>
                </div>
                <div class="content">
                    <h4 class="ui sub header">Misa Pagi</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                    <h4 class="ui sub header">Misa Siang</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                    <h4 class="ui sub header">Misa Sore</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                </div>
            </div>
            <div class="ui fluid card">
                <div class="content">
                    <div class="header">Pelayanan Minggu, 28 Oktober 2020</div>
                </div>
                <div class="content">
                    <h4 class="ui sub header">Misa Pagi</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                    <h4 class="ui sub header">Misa Siang</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                    <h4 class="ui sub header">Misa Sore</h4>
                    <p>06.00 - 08.00</p>
                    <p>Pelayan: </p>
                </div>
            </div>
            <a class="fluid ui positive labeled icon button" href="admin/dashboard#/dataTingting">
                <i class="edit icon"></i>
                Tambah Pelayanan
            </a>
        </div>
    </div>
</div>
@endsection

@push('any_js')
<script type="text/babel" src="{{ asset('assets/js/searchData.js') }}"></script>
<script type="text/babel" src="{{ asset('assets/js/announce.js') }}"></script>
@endpush