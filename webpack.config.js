const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const languages = {
  "de-DE": require("./locales/de-DE.json"),
  "en-GB": require("./locales/en-GB.json"),
};

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlBundlerPlugin({
      // define templates here
      // you can generate this `entry` object instead of multiple configurations for HtmlWebpackPlugin
      entry: {
        index : { // => dist/index.html
          import: './public/index.html',
          data: {
            // pass variables into the template
            title: languages['en-GB'].title,
            // - OR - you can pass completelly all translates into template, then use in template as `i18n.title`
            i18n: languages['en-GB'],
            // pass data into inline JS, that are accessible from a JS file
            locales: JSON.stringify(languages['en-GB']),
          }
        },
        'de-DE/index' : { // => dist/de-DE/index.html
          import: './public/index.html',
          data: {
            // pass variables into the template
            title: languages['de-DE'].title,
            // - OR - you can pass completelly all translates into template, then use in template as `i18n.title`
            i18n: languages['de-DE'],
            // pass data into inline JS, that are accessible from a JS file
            locales: JSON.stringify(languages['de-DE']),
          }
        },
      },
      js: {
        // JS output filename
        filename: '[name].[contenthash:8].js'
      },
      css: {
        // CSS output filename
        filename: '[name].[contenthash:8].css',
        //inline: 'true', // you can inline CSS into HTML
      }
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
}