'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = require('../config')
const utils = require('./utils')

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  FONTS: path.resolve(__dirname, '../src/assets/fonts'),
  PUBLIC: path.resolve(__dirname, '../public'),
  CONTEXT: path.resolve(__dirname, '..'),
  TEST: path.resolve(__dirname, '../test')
}

// Constant createLintingRule
const createLintingRule = () => ({
  test: /\.(ts|tsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [paths.SRC, paths.TEST],
  options: {
    formater: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const publicPath = process.env.NODE_ENV === 'production'
  ? config.build.assetsPublicPath
  : config.dev.assetsPublicPath

const publicUrl = process.env.NODE_ENV === 'production'
  ? publicPath.slice(0, -1)
  : publicPath

const env = utils.getClientEnvironment(publicUrl)

// Webpack configuration
module.exports = {
  context: paths.CONTEXT,
  entry: {
    app: path.join(paths.SRC, 'index.tsx')
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': paths.SRC,
      'jquery': 'jquery/src/jquery'
    }
  },
  module: {
    rules: [
      ...(config.dev.userEslint ? [createLintingRule()]: []),
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /(favicon\.ico|manifest\.json)$/,
        loader: 'url',
        query: {
          limit: 1,
          name: '[name].[ext]',
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].[chunkhash].css`,
      chunkFilename: `styles/[id].[chunkhash].css`,
      publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsRoot
        : config.dev.assetsPublicPath
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
  ]
}
