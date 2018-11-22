import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import WebpackChunkHash from 'webpack-chunk-hash';
import { InjectManifest } from 'workbox-webpack-plugin';

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
    chunkFilename: '[name]-[hash].js',
    filename: '[name]-[hash].js',
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
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
    new HtmlWebpackPlugin({
      excludeAssets: [/style-.*\.js/],
      filename: 'index.html',
      inlineSource: '.(css)$',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new WebpackChunkHash(),
    new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src', 'sw.js'),
      swDest: 'sw.js',
    }),
    new CopyWebpackPlugin([
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
    // new sri({
    //   hashFuncNames: ['sha256', 'sha384', 'sha512'],
    //   enabled: production,
    // }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
