const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(ROOT_PATH,'app/src/index')
  ],
  module: {
    /*preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
        include: path.resolve(ROOT_PATH, './app')
      }
    ],*/
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    },
    {
      test   : /\.(ttf|eot|svg|mp3|woff(2)?)(\?[a-z0-9]+)?$/,
      loader : 'file-loader'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'),
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: path.resolve(__dirname, 'app'),
    },
   ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'app/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
    new HtmlwebpackPlugin({
      title: 'TempusFugit'
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};
