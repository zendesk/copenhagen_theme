import path from 'path';

export const config = {
  entry: {
    script: './src/js/script.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
};
