const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'none',
  entry: {
    style: "./styles/index.scss"
  },
  output: {
    path: __dirname,
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "convert-zass-functions-loader",
          "unescape-variables-loader",
          "sass-loader",
          "escape-variables-loader"
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    {
      apply(compiler) {
        const name = 'DeleteEmptyJSFilePlugin';
        compiler.hooks.thisCompilation.tap(name, (compilation) => {
          compilation.hooks.processAssets.tap(name, () => {
            compilation.deleteAsset('style.js');
          });
        });
      }
    }
  ],
};

