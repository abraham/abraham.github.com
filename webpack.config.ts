import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import WebpackChunkHash from 'webpack-chunk-hash';
import Stylish from 'webpack-stylish';
import SriPlugin from 'webpack-subresource-integrity';
import { InjectManifest } from 'workbox-webpack-plugin';

const production = process.env.NODE_ENV === 'production';
const mode = production ? 'production' : 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: './index.ts',
  stats: 'none',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: false,
    port: 5000,
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
          enforce: true,
        },
      },
    },
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
      swSrc: path.resolve(__dirname, 'src', 'sw.ts'),
      swDest: 'sw.js',
      mode,
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
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384', 'sha512'],
      enabled: production,
    }),
    new Stylish(),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
    ],
  },
};
