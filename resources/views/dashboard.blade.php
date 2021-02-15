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

    .ui.action.input input[type="file"] {
        display: none;
    }
</style>
@endpush

@section('content')
<div class="ui two column stackable grid">
    <div class="four wide column">
        <div class="ui vertical fluid tabular menu hiddenGSAP">
            <a class="item active" data-tab="dataJemaat">Data Jemaat</a>
            <a class="item" data-tab="dataTingting">Data Tingting</a>
            <a class="item" data-tab="dataIbadah">Data Ibadah</a>
        </div>
    </div>
    <div class="twelve wide column">
        <div class="ui tab active" data-tab="dataJemaat">
            <h1>Kelola Data Jemaat</h1>
            <table class="ui compact celled table">
                <thead>
                    <tr>
                        <th>Distrik</th>
                        <th>Resort</th>
                        <th>Sektor</th>
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
                        <td>{{ $item->id_sheet }}</td>
                        <td>
                            <div class="ui icon buttons">
                                <button data-id="{{ $item->id }}" distrik="{{ $item->distrik }}" resort="{{ $item->resort }}" gereja="{{ $item->gereja }}" sektor="{{ $item->sektor }}" url_sheet="{{ $item->url_sheet }}" id_sheet="{{ $item->id_sheet }}" class="ui blue basic button btnModal">
                                    <i class="edit outline icon"></i>
                                </button>

                                <a class="ui red basic button" href="{{ route('destroy_data', ['id' => $item->id ]) }}"><i class="trash alternate outline icon"></i></a>
                            </div>

                            <!-- Modal form update data -->
                            <form action="{{ route('update_data', ['id' => $item->id ]) }}" method="POST">
                                <div class="ui small modal" id="dataGereja{{ $item->id }}">
                                    <i class="close icon"></i>
                                    <div class="header">
                                        Ubah Data
                                    </div>
                                    <div class="scrolling content">
                                        @csrf
                                        <!-- dynamic modals -->
                                        <div id="valueFormUpdate{{ $item->id }}" class="ui form left aligned container"></div>
                                    </div>
                                    <div class="actions">
                                        <button class="ui positive labeled icon button">Simpan<i class="save icon"></i></button>
                                    </div>
                                </div>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot class="full-width">
                    <tr>
                        <th colspan="6">
                            <div class="ui right floated small primary labeled icon button btnModal" id="addGereja">
                                <i class="plus icon"></i> Tambah Data
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
            <div id="contentTingting"></div>
        </div>

        <div class="ui tab" data-tab="dataIbadah">
            <div id="contentIbadah"></div>
        </div>
    </div>
</div>
@endsection

@push('any_js')
<script>
    // call this in your jsx react, on mount or on update to close message Semantic UI Component
    function clossableMessage() {
        $('.message .close').click(function() {
            $(this).closest('.message').transition('fade down');
        });
    }
    $(document).ready(() => {
        // semantic for data URL href
        $('.tabular.menu .item').tab({
            // require simple history, in-page links
            history: true
        });

        // calling method from template blade
        animateFadeIn('.tabular.menu .item');

        // for modal editing Data Jemaat
        $('.btnModal').click(function() {
            var id = $(this).attr('data-id');
            var modal = id ? ('#dataGereja' + id) : '#addGerejaModal'

            /** 
             * make dynamic modals without writing it with PHP trough foreach, its also on store new data, wow!
             * 
             * in php, there is null colescing ternary or shorthand ternary
             * in js, no shorthand, we use || operator
             */ 
            
            let formTarget = modal == '#addGerejaModal' ? '#valueFormStore' : (`#valueFormUpdate${id}`);

            $(formTarget).html('');
            
            const dataGereja = {
                distrik: $(this).attr('distrik') || '',
                resort: $(this).attr('resort') || '',
                gereja: $(this).attr('gereja') || '',
                sektor: $(this).attr('sektor') || '',
                url_sheet: $(this).attr('url_sheet') || '',
                id_sheet: $(this).attr('id_sheet') || ''
            }

            const arrData = Object.keys(dataGereja);
            const arrValue = Object.values(dataGereja);
            arrData.forEach((data, id) => {
                $(formTarget).append(`<div class="field"><label>Nama Distrik</label><input type="text" name=${data} value="${arrValue[id]}"/></div>`);
            })

            $(modal)
                .modal('setting', 'closable', false)
                .modal('toggle');
        });
    });
</script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/browser-image-compression@latest/dist/browser-image-compression.js"></script>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- <script type="text/babel" src="{{ asset('assets/js/admin/dashboard/dataIbadah.js') }}"></script>
<script type="text/babel" src="{{ asset('assets/js/admin/dashboard/dataTingting.js') }}"></script> -->

<script type="text/javascript" src="{{ asset('assets/prod/js/admin/dashboard/dataIbadah.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/prod/js/admin/dashboard/dataTingting.js') }}"></script>
@endpush