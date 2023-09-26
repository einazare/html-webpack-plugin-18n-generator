const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const languages = {
  "de-DE": require("./locales/de-DE.json"),
  "en-GB": require("./locales/en-GB.json"),
};

module.exports = Object.keys(languages).map(language => {
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, `/dist${language === "en-GB" ? "" : `/${language}`}`),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: false,
        hash: true,
        templateParameters: {
          title: languages[language].title
        }
      })
    ]
  };
});