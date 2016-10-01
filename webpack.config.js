/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    name: 'app',
    entry: [
      './client/index.jsx',
      './client/index.scss'
    ],
    output: {
      path: path.join(__dirname, '/server/public/build'),
      publicPath: '/build/',
      filename: 'app.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: 'file'
        }
      ]
    },
    sassLoader: {
      includePaths: [
        path.resolve(__dirname, './node_modules/compass-mixins/lib')
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
      }),
      new ExtractTextPlugin('style.css', {
        allChunks: true
      })
    ]
  }
];
