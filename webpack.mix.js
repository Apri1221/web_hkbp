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
    'resources/lib/semantic-ui/semantic.min.js',
    'resources/lib/gsap/gsap.3.min.js',
    'resources/lib/tablesort/tablesort.min.js'], 'public/js/main.js');

