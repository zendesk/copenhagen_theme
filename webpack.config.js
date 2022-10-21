import path from 'path';
import { config as gulpConfig } from './gulp.config';

export const config = {
  entry: {
    script: `${gulpConfig.scripts.input.path}/${gulpConfig.scripts.input.file}`
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: gulpConfig.scripts.output.file
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
