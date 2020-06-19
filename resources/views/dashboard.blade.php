@extends('layouts.template')
@push('any_css')
<style>
    .ui.vertical.tabular.menu {
        border: 0 !important
    }

    .ui.vertical.tabular.menu .item {
        box-shadow: var(--small-box-shadow) !important;
        margin: 16px 0 !important
    }

    .ui.vertical.tabular.menu .active.item {
        background-color: var(--secondary-color-palete);
        color: white
    }
</style>
@endpush

@section('content')
<div class="ui container" style="margin:70px 0">
    <div class="ui two column stackable grid">
        <div class="four wide column">
            <div class="ui vertical fluid tabular menu">
                <a class="item active" data-tab="dataJemaat">Data Jemaat</a>
                <a class="item" data-tab="dataTingting">Data Tingting</a>
                <a class="item" data-tab="dataIbadah">Data Ibadah</a>
            </div>
        </div>
        <div class="twelve wide column">
            <div class="ui tab active" data-tab="dataJemaat">
                <table class="ui compact celled table">
                    <thead>
                        <tr>
                            <th class="three wide">Distrik</th>
                            <th class="three wide">Resort</th>
                            <th>Sektor</th>
                            <th>Alamat Sheet</th>
                            <th>ID Sheet</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($dataHKBP as $item)
                        <tr>
                            <td>{{ $item->distrik }}</td>
                            <td>{{ $item->resort }}</td>
                            <td>{{ $item->sektor }}</td>
                            <td>{{ $item->url_sheet }}</td>
                            <td>{{ $item->id_sheet }}</td>
                            <td>
                                <div class="ui icon buttons">
                                    <button data-id="{{ $item->id }}" distrik="{{ $item->distrik }}" resort="{{ $item->resort }}" gereja="{{ $item->gereja }}" sektor="{{ $item->sektor }}" url_sheet="{{ $item->url_sheet }}" id_sheet="{{ $item->id_sheet }}" class="ui blue basic button btnModal">
                                        <i class="edit outline icon"></i>
                                    </button>

                                    <a class="ui red basic button" href="{{ route('destroy_data', ['id' => $item->id ]) }}"><i class="trash alternate outline icon"></i></a>
                                </div>

                                <!-- Modal form update data -->
                                <div class="ui small modal" id="dataGereja{{ $item->id }}">
                                    <i class="close icon"></i>
                                    <div class="header">
                                        Ubah Data
                                    </div>
                                    <div class="content">
                                        <form action="{{ route('update_data', ['id' => $item->id ]) }}" method="POST">
                                            @csrf
                                            <!-- dynamic modals -->
                                            <div id="valueFormUpdate{{ $item->id }}" class="ui form left aligned container"></div>
                                            <br>
                                            <button class="ui positive labeled icon button">Simpan<i class="save icon"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot class="full-width">
                        <tr>
                            <th colspan="6">
                                <div class="ui right floated small primary labeled icon button btnModal" id="addGereja">
                                    <i class="user icon"></i> Tambah Data
                                </div>
                                <div class="">
                                    NB: Pastikan integrasi data excel yang baru sudah benar
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>

                <!-- Modal form store data -->
                <div class="ui small modal" id="addGerejaModal">
                    <i class="close icon"></i>
                    <div class="header">
                        Tambah Data
                    </div>
                    <div class="content">
                        <form action="{{ route('store_data') }}" method="POST">
                            @csrf
                            <!-- dynamic modals without writing it with PHP trough foreach -->
                            <div id="valueFormStore" class="ui form left aligned container"></div>
                            <br>
                            <button class="ui positive labeled icon button">Simpan<i class="save icon"></i></button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="ui tab" data-tab="dataTingting">
                <div class="ui form">
                    <div class="field">
                        <input type="text" name="first-name" placeholder="First name">
                    </div>
                    <div class="field">
                        <textarea placeholder="Some example text..."></textarea>
                    </div>
                </div>
            </div>

            <div class="ui tab" data-tab="dataIbadah">
                <div id="contentIbadah"></div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('any_js')
<!-- this script use for data-tabular menu URL -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.address/1.6/jquery.address.min.js"></script>

<script>
    $(document).ready(() => {
        // semantic for data URL href
        $('.tabular.menu .item').tab({
            // require simple history, in-page links
            history: true
        });

        TweenMax.from(".tabular.menu .item", {
            x: 0, // move from 0px right to the current position
            y: 100, // move from 100px down to the current position
            duration: 1,
            autoAlpha: 0, // fade in from opacity 0 to the current
            stagger: 0.1, 
            delay: 0.75,
            ease: Power3.easeInOut,
        });

        // for modal editing Data Jemaat
        $('.btnModal').click(function() {
            var id = $(this).attr('data-id');
            var modal = id ? ('#dataGereja' + id) : '#addGerejaModal'

            // make dynamic modals without writing it with PHP trough foreach, its also on store new data, wow!

            const distrik_name = $(this).attr('distrik') ? $(this).attr('distrik') : '';
            const resort_name = $(this).attr('resort') ? $(this).attr('resort') : '';
            const gereja_name = $(this).attr('gereja') ? $(this).attr('gereja') : '';
            const sektor_name = $(this).attr('sektor') ? $(this).attr('sektor') : '';
            const url_sheet = $(this).attr('url_sheet') ? $(this).attr('url_sheet') : '';
            const id_sheet = $(this).attr('id_sheet') ? $(this).attr('id_sheet') : '';

            var formTarget = item == '#addGerejaModal' ? '#valueFormStore' : ('#valueFormUpdate' + id);

            $(formTarget).html('');
            $(formTarget).append('<div class="field">' +
                '<label>Nama Distrik</label>' +
                '<input type="text" name="distrik" value="' + distrik_name + '"/></div>' +

                '<div class="field">' +
                '<label>Nama Resort</label>' +
                '<input type="text" name="resort" value="' + resort_name + '"/></div>' +

                '<div class="field">' +
                '<label>Nama Gereja</label>' +
                '<input type="text" name="gereja" value="' + gereja_name + '"/></div>' +

                '<div class="field">' +
                '<label>Nama Sektor</label>' +
                '<input type="text" name="sektor" value="' + sektor_name + '"/></div>' +

                '<div class="field">' +
                '<label>URL Spreadsheet</label>' +
                '<input type="text" name="url_sheet" value="' + url_sheet + '"/></div>' +

                '<div class="field">' +
                '<label>ID Spreadsheet</label>' +
                '<input type="text" name="id_sheet" value="' + id_sheet + '"/></div>');

            $(modal)
                .modal('setting', 'closable', false)
                .modal('toggle');
        });
    });
</script>

<!-- https://codepen.io/cwiens/full/gyvqrg, https://greensock.com/cheatsheet/ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>

<script type="text/babel" src="{{ asset('assets/js/cobaPost.js') }}"></script>
@endpush