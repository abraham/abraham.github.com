const chunkHash = require('webpack-chunk-hash');
const copy = require('copy-webpack-plugin');
const exclude = require('html-webpack-exclude-assets-plugin');
const extension = require('script-ext-html-webpack-plugin');
const extract = require('mini-css-extract-plugin');
const html = require('html-webpack-plugin');
const inline = require('html-webpack-inline-source-plugin');
const path = require('path');
const workbox = require('workbox-webpack-plugin');
const sri = require('webpack-subresource-integrity');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: production ? 'production' : 'development',
  entry: './index.ts',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: false
  },
  output: {
    crossOriginLoading: 'anonymous',
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js', // Changed from `contenthash` because of https://github.com/waysact/webpack-subresource-integrity/issues/78
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new extract({ filename: '[name]-[contenthash].css' }),
    new html({
      excludeAssets: [/style-.*\.js/],
      filename: 'index.html',
      inlineSource: '.(css)$',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new inline(),
    new chunkHash(),
    new extension({ defaultAttribute: 'async' }),
    new workbox.InjectManifest({
      swSrc: path.resolve(__dirname, 'src', 'sw.js'),
      swDest: 'sw.js',
    }),
    new copy([
      {
        from: '*.txt',
        to: '.',
      },
      {
        from: '*.ico',
        to: '.',
      },
      {
        from: '*.png',
        to: '.',
      },
      {
        from: 'img/*',
        to: '.',
      },
      {
        from: '*.json',
        to: '.',
      },
    ]),
    new sri({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: production,
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          extract.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')]
            },
          },
        ],
      },
    ],
  },
};
