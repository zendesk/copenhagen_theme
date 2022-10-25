import path from 'path';
import { config as gulpConfig } from './gulp.config';

export const config = {
  entry: ['./src/js/index.js', './src/js/legacy.js'],
  output: {
    path: path.resolve(__dirname, gulpConfig.scripts.output.path),
    filename: gulpConfig.scripts.output.file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
};
