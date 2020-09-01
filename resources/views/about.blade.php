@extends('layouts.template')

@section('content')
<div class="ui stackable grid">
    <div class="ten wide column">
        <div class="ui two cards">
            <div class="ui fluid card">
                <a target="_blank" rel="noopener noreferrer" class="image" href="https://www.instagram.com/aprijplt/">
                    <img src="" id="apri">
                </a>
                <div class="content">
                    <a class="header" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aprijplt/">Apri</a>
                    <div class="meta">
                        <a>Developer, Team Leader</a>
                    </div>
                </div>
            </div>
            <div class="ui fluid card">
                <a target="_blank" rel="noopener noreferrer" class="image" href="https://www.instagram.com/joelmatondangg/">
                    <img src="" id="joel">
                </a>
                <div class="content">
                    <a target="_blank" rel="noopener noreferrer" class="header" href="https://www.instagram.com/joelmatondangg/">Joel</a>
                    <div class="meta">
                        <a>Developer</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="six wide column">
        <div class="hiddenGSAP">
            <div class="content" id="img_code">
                <img src="{{ asset('./assets/images/code_people_hero.svg') }}" x="0" y="0" width="95%">
            </div>
        </div>
        <div class="ui hidden divider"></div>
        <a class="ui black fluid button" href="https://github.com/Apri1221/web_hkbp" target="_blank" rel="noopener noreferrer"><i class="github icon"></i>Bergabung</a>
    </div>
</div>
<div class="ui stackable grid">

    <div class="column">
        <div class="ui info message">
            <div class="header">Apa yang baru?</div>
            <ul>
                <li>Dukungan Progressif Web App. Dengan PWA, aplikasi HKBP ini bisa diinstall di Android dan IOS, <a href="#" class="ui positive compact button" onclick="addToHomeScreen()">Install</a> sekarang</li>
                <li>Image compression. Otomatis kompresi image ketika Admin upload tingting</li>
            </ul>
            <span>Yang akan datang: pemutar musik lagu ibadah pada fitur tata ibadah</span>
        </div>
        <h1 class="ui header">Misi</h1>
        <h3>Pengembangan website ini bertujuan untuk mempermudah penyebaran informasi semua hal tentang ibadah untuk jemaat HKBP Padang Bulan yang diinisiasikan selama pandemi Corona Virus Disease 2019.
        </h3>

        <div class="ui hidden divider"></div>
        <p>
            Dibangun di atas teknologi <strong>Laravel, React JS, Greensock, Semantic UI, Google Spreadsheet, dan MySQL</strong>, pengembangan website ini juga bertujuan sebagai ajang pembelajaran bagi developer.
        </p>
    </div>
</div>
@endsection

@push('any_js')
<script>
    $(document).ready(() => {
        function getPhoto(username, idImg) {
            // validation for instagram usernames
            var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
            var validation = regex.test(username);
            if (validation) {
                $.get("https://www.instagram.com/" + username + "/?__a=1")
                    .done(function(data) {
                        // getting the url
                        var photoURL = data["graphql"]["user"]["profile_pic_url_hd"];
                        // update img element
                        $(idImg).attr("src", photoURL)
                    }).fail(function() {
                        // code for 404 error 
                        console.log('Username was not found!')
                    })
            } else {
                alert('The username is invalid!')
            }
        }
        getPhoto('aprijplt', '#apri');
        getPhoto('joelmatondangg', '#joel');

        animateFadeIn('#img_code');

    });
</script>

<!-- library animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>
@endpush