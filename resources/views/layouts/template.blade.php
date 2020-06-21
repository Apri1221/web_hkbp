<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600" rel="stylesheet">

    <!-- Semantic CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">

    <!-- Library Carousel Slick -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <!-- Add the slick-theme.css if you want default styling -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />

    <!-- Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

        :root {
            --main-box-shadow:
                0 2.1px 2.7px rgb(0, 0, 0, 0.022),
                0 5.2px 6.9px rgb(0, 0, 0, 0.031),
                0 10.6px 14.2px rgb(0, 0, 0, 0.039),
                0 21.9px 29.2px rgb(0, 0, 0, 0.048),
                0 60px 80px rgb(0, 0, 0, 0.07);

            --small-box-shadow:
                0 7.4px 4.1px rgba(0, 0, 0, 0.018),
                0 20px 68px rgba(0, 0, 0, 0.07);


            --main-color-palete: #00a6fb;
            --main-color-palete-dark: #006494;

            /* pink */
            --secondary-color-palete: #ef8354;
            --third-color-palete: #ef8354;
        }

        html,
        body {
            background-color: #fff;
            color: #414141;
            font-family: 'Nunito', sans-serif !important;
            font-weight: 300;
            height: 100vh;
            margin: 0;
        }

        /* modify semantic ui */

        .ui.button,
        .ui.primary.button {
            box-shadow: var(--main-box-shadow) !important
        }

        .ui.form .inline.field>.selection.dropdown,
        .ui.form .inline.fields .field>.selection.dropdown {
            z-index: 1
        }

        .ui.hidden.divider.huge {
            margin: 3rem 0
        }

        .ui.secondary.pointing.menu {
            background-color: white;
        }

        /* end of modify */

        .full-height {
            height: 100vh;
        }

        .content {
            text-align: center;
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
            z-index: 2;
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
            overflow-x: auto;
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
        <div class="ui huge menu" id='sticky-header'>
            <div class="ui container">
                <div class="header item">
                    <a href="{{ route('home') }}">
                        <img style="width: 21px;" src="{{ asset('./assets/images/HKBP_40.jpg') }}"></a>
                </div>
                <div class="right menu">
                    <div class="item">
                        @if(Session::has('account'))
                        <a class="ui primary button" href="{{ route('logout') }}">Keluar</a>
                        @else
                        <div class="ui primary button" id="btnLogin">Masuk</div>
                        @endif
                    </div>
                    <div class="ui floating dropdown item" id="dropdown-menu"><i class="sidebar icon"></i>Menu<i class="dropdown icon"></i>
                        <div class="menu">
                            <a class="item">
                                <i class="user secret icon"></i>Pengembang
                            </a>

                            <a class="item" href="{{ route('dashboard') }}">
                                <i class="th icon"></i>Dashboard
                            </a>

                            <a class="item" href="{{ route('post_prototype') }}">
                                <i class="th icon"></i>Post
                            </a>
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
                @if(Session::has('gagal'))
                <div class="ui icon warning message">
                    <i class="lock icon"></i>
                    <div class="content">
                        <div class="header">
                            Gagal Masuk!
                        </div>
                        <p>Alamat email atau kata sandi mungkin salah!</p>
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
        @yield('content')
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin="anonymous"></script>

    <!-- react js v16 -->
    <script src="{{ asset('./assets/lib/react/react-production.min.js') }}"></script>
    <script src="{{ asset('./assets/lib/react/reactdom-production.min.js') }}"></script>

    <!-- Semantic JS -->
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>

    <script>
        function animateFadeIn(className) {
            TweenMax.from(className, {
                x: 0, // move from 0px right to the current position
                y: 50, // move from 100px down to the current position
                duration: 1,
                autoAlpha: 0, // fade in from opacity 0 to the current
                stagger: 0.1,
                delay: 0.75,
                ease: Power3.easeInOut,
            });
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

            $('.overlay.example .overlay')
                .visibility({
                    type: 'fixed',
                    offset: 15 // give some space from top of screen
                });
        });
    </script>

    @stack('any_js')

</body>

</html>