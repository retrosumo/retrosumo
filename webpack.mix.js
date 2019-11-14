const mix = require("laravel-mix");

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

mix.react("resources/js/index.js", "public/js")
    .extract(["react", "react-dom"])
    .sass("resources/sass/app.scss", "public/css")
    .postCss("resources/css/main.css", "public/css", [require("tailwindcss")])
    .browserSync({
        proxy: "retrosumo.test",
        browser: "chromium",
        notify: {
            styles: {
                top: "auto",
                bottom: 0,
                left: 0,
                right: "auto"
            }
        }
    });

if (mix.inProduction()) {
    mix.version();
}
