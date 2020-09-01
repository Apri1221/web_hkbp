const mix = require('laravel-mix');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.js(['resources/lib/jquery/jquery-address.1.6.min.js',
    'resources/lib/gsap/gsap.3.min.js',
    'resources/lib/tablesort/tablesort.min.js'], 'public/js/main.js')
    .styles(['resources/lib/slick/slick.css',
        'resources/lib/slick/slick-theme.css'], 'public/css/slick.css')
    .styles('semantic/dist/semantic.min.css', 'public/css/semantic.css')
    .js('resources/lib/slick/slick.min.js', 'public/js/slick.js')
    .js('semantic/dist/semantic.min.js', 'public/js/semantic.js')
    .version();
