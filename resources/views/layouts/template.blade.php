<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="manifest" href="{{ asset('/manifest.json') }}">

    <meta name="theme-color" content="#00a6fb">
    <meta name="mobile-web-app-capable" content="yes">

    <link rel="apple-touch-icon" href="{{ asset('assets/icon/apple-icon-180x180.png') }}">
    <!-- https://appsco.pe/developer/splash-screens -->
    <link rel="apple-touch-startup-image" href="{{ asset('assets/icon/apple-icon-180x180.png') }}">

    <title>Web Informasi HKBP</title>

    <!-- preload -->
    <link rel="preload" href="/css/themes/default/assets/fonts/icons.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/fonts/slick.woff" as="font" type="font/woff" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com/css?family=Nunito:600&display=swap" as="font" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" as="font" crossorigin>

    <!-- Semantic CSS -->
    <link rel="stylesheet" href="{{ mix('css/semantic.css') }}">

    <!-- Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Nunito:600&display=swap');

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

        :root {
            --main-box-shadow:
                0 4.1px 3.7px rgb(0, 0, 0, 0.024),
                0 5.2px 6.9px rgb(0, 0, 0, 0.032),
                0 10.6px 14.2px rgb(0, 0, 0, 0.039),
                0 21.9px 29.2px rgb(0, 0, 0, 0.048),
                0 70px 90px rgb(0, 0, 0, 0.07);

            --big-shadow:
                0 5.2px 6.9px rgb(0, 0, 0, 0.032),
                0 8px 20px 0 rgba(0, 0, 0, 0.3);

            --small-box-shadow:
                0 7.4px 5.1px rgba(0, 0, 0, 0.028),
                0 30px 68px rgba(0, 0, 0, 0.07);


            --main-color-palete: #00a6fb;
            --main-color-palete-light: #A0F1FF;

            /* orange */
            --secondary-color-palete: #ef8354;
        }

        html,
        body {
            color: #414141;
            font-family: 'Nunito', sans-serif !important;
            font-weight: 300 !important;
            font-size: 95%;
            height: 100vh;
            margin: 0;
        }

        p,
        .ui.sub.header {
            font-size: 1.1rem !important;
        }

        .textIbadah {
            white-space: pre-line;
            white-space: pre-wrap;
            line-height: 1.5em !important;
        }

        /* modify semantic ui */

        .ui.primary.button {
            box-shadow: var(--main-box-shadow) !important
        }

        .ui.form .inline.field>.selection.dropdown,
        .ui.form .inline.fields .field>.selection.dropdown {
            z-index: 2
        }

        .ui.hidden.divider.huge,
        .ui.divider.huge {
            margin: 2.5rem 0
        }

        .ui.secondary.pointing.menu {
            background-color: white;
        }

        .content {
            text-align: center;
        }

        .content.left {
            text-align: left;
        }

        /* end of modify */

        .full-height {
            height: 100vh;
        }


        .title {
            font-size: 84px;
        }

        .links>a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .ui.parallax {
            height: 90vh;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
        }

        .ui.fluid.parallax {
            width: 100%;
        }

        #sticky-header {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 3;
            /* this is max of z-index! */
            margin: 0;
        }

        /* only on desktop will sticky sidebar content */
        @media only screen and (min-width: 720px) {
            #sticky-content {
                position: -webkit-sticky;
                position: sticky;
                top: 6rem;
            }
        }

        .icon-mentor>img {
            vertical-align: middle;
            height: 60px !important;
            margin: 10px
        }

        .raised-shadow {
            box-shadow: var(--small-box-shadow)
        }

        #tableJemaat {
            max-height: calc(100vh - 10em);
            overflow: auto;
        }

        #tableJemaat thead tr:first-child>th {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 0;
            z-index: 1;
        }

        #tableJemaat thead th.sorted {
            background: #e5e5e5;
        }

        #tableJemaat thead th {
            background: #f2f2f2;
        }

        /* affect hidden to child, for GSAP animation */
        .hiddenGSAP>div,
        .hiddenGSAP>a {
            visibility: hidden;
        }
    </style>

    @stack('any_css')

</head>

<body>
    @stack('top_content')

    <div class="overlay">
        <div class="ui large menu" id='sticky-header'>
            <div class="ui container">
                <div class="header item">
                    <a href="{{ route('home') }}">
                        <img style="width: 20px;" src="{{ asset('./assets/images/HKBP_40.jpg') }}" alt="logo hkbp">
                    </a>
                </div>
                <div class="right menu">
                    <div class="ui floating dropdown item" id="dropdown-menu"><i class="sidebar icon"></i>Menu<i class="dropdown icon"></i>
                        <div class="menu">
                            <a class="item" href="{{ route('home') }}">
                                <i class="home icon"></i>Beranda
                            </a>
                            <a class="item" href="{{ route('dashboard') }}">
                                <i class="th icon"></i>Dashboard
                            </a>
                            <div class="ui fitted divider"></div>
                            <a class="item" href="{{ route('about') }}">
                                <i class="user secret icon"></i>Pengembang
                            </a>
                            <div class="ui fitted divider"></div>
                            <div class="item">
                                @if(Session::has('account'))
                                <a class="fluid ui red inverted button" href="{{ route('logout') }}">Keluar</a>
                                @else
                                <div class="fluid ui primary button" id="btnLogin">Masuk</div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui tiny modal" id="account">
            <i class="close icon"></i>
            <div class="header">
                Silakan Masuk
            </div>
            <div class="content ui left aligned container">
                @if(Session::has('fail_login'))
                <div class="ui icon negative message">
                    <i class="lock icon"></i>
                    <div class="content">
                        <div class="header">
                            Gagal Masuk!
                        </div>
                        <p>{{ session('fail_login') }}</p>
                    </div>
                </div>
                @endif

                <form action="{{ route('login') }}" method="POST">
                    @csrf
                    <div class="ui form">
                        <div class="field">
                            <label>Alamat Email</label>
                            <input name="email" type="email" placeholder="Email">
                        </div>
                        <div class="field">
                            <label>Kata Sandi</label>
                            <input name="password" type="password" placeholder="Kata Sandi">
                        </div>
                        <button class="ui primary labeled icon button" type="submit">
                            <i class="unlock alternate icon"></i>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="ui container" style="margin-top:70px">
            @if(session('fail_dashboard'))
            <div class="ui negative message">
                <span>{{session('fail_dashboard')}}</span>
            </div>
            @endif

            <div class="content install-prompt">
                <p>Install aplikasi Web HKBP di ponsel kamu
                </p>
                <button href="#" class="ui positive button" onclick="addToHomeScreen()">Install
                </button>
            </div>
            <div class="ui hidden divider"></div>

            @yield('content')
        </div>
    </div>

    @if(!request()->is('*/dashboard'))
    <footer>
        <div class="ui huge hidden divider"></div>
        <div class="ui inverted vertical footer segment">
            <div class="ui container">
                <div class="ui stackable inverted divided equal height stackable grid">
                    <div class="wide column">
                        <h4 style="color: #bbb;">HKBP Padang Bulan Medan - 2021</h4>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    @endif

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

    <!-- using webpack -->
    <script src="{{ mix('js/semantic.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>

    <!-- Uncomment ini jika dalam fase development -->
    <!-- <script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin="anonymous"></script> -->

    <!-- react js v16 -->
    <script src="{{ asset('/assets/lib/react/react-production.min.js') }}"></script>
    <script src="{{ asset('/assets/lib/react/reactdom-production.min.js') }}"></script>


    <!-- Firebase JS CDN -->
    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-firestore.js"></script>

    <script>
        // className can be separate by '|' if there is multiple component to animate
        function animateFadeIn(className) {
            let elements = className.split('|');
            for (let element of elements) {
                TweenMax.from(element, {
                    x: 0, // move from 0px right to the current position
                    y: 50, // move from 100px down to the current position
                    duration: 1,
                    autoAlpha: 0,
                    stagger: 0.2,
                    delay: 0.5,
                    ease: Power3.easeInOut,
                });
            }
        }

        let firebaseConfig = {
            apiKey: "AIzaSyC8sOPhPviWiab6O19iNdVo2kc9PoRMCxo",
            authDomain: "hkbp-pbulan.firebaseapp.com",
            databaseURL: "https://hkbp-pbulan.firebaseio.com",
            projectId: "hkbp-pbulan",
            storageBucket: "hkbp-pbulan.appspot.com",
            messagingSenderId: "883338731802",
            appId: "1:883338731802:web:93354e0f924ed417ca8ca3",
            measurementId: "G-KX4CGXNV85"
        };

        let app = firebase.initializeApp(firebaseConfig);
        // using db
        let db = firebase.firestore(app);


        function sendData(msg) {
            const {
                serverTimestamp
            } = firebase.firestore.FieldValue;

            db.collection("nyanyian").add({
                    lagu: msg,
                    tanggal: serverTimestamp()
                })
                .then(docRef => console.log("Sending analytics: ", docRef.id))
                .catch(e => console.error("Fail sending analytics: ", e));
        }


        // Check that service workers are supported
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then(() => {
                        console.log("Pendaftaran ServiceWorker berhasil");
                    })
                    .catch(() => {
                        console.log("Pendaftaran ServiceWorker gagal");
                    });
            });
        }

        if (window.matchMedia('(display-mode: standalone)').matches) {
            document.querySelector('.install-prompt').style.display = 'none';
        }

        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            deferredPrompt = event;
            return false;
        });

        function addToHomeScreen() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    console.log(choiceResult.outcome);
                });
                deferredPrompt = null;
            }
        }

        // enums
        const method = {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE'
        }

        const handleRequestAPI = (url, method, data = undefined) => {
            if (!url) return; // guard clause
            return fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(result => {
                if (result.status === 200) {
                    return result.json()
                } else {
                    throw new Error('gagal data dari server')
                }
            }).then(resJson => {
                return resJson
            }).catch(err => console.error(err));
        }

        $(document).ready(() => {
            try {
                $('#dropdown-menu').dropdown();

                // Modal Login
                $('#btnLogin').click(function() {
                    $('#account')
                        .modal('setting', 'closable', false)
                        .modal('toggle');
                })
            } catch (error) {
                console.error(error);
            }
        });
    </script>

    @stack('any_js')

</body>

</html>