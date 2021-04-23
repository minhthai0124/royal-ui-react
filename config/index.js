'use strict'

const path = require('path');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  FONTS: path.resolve(__dirname, '../src/assets/fonts'),
  PUBLIC: path.resolve(__dirname, '../public'),
  STATIC: path.resolve(__dirname, '../static')
};

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsTemplatePath: path.join(paths.PUBLIC),
    assetsPublicPath: path.join(paths.PUBLIC),
    proxyTable: {},

    // Various Dev Server Settings
    host: 'localhost',
    port: 8000,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    // User Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    userEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging in devtools,
    // set this to false - it *may* help
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.join(paths.PUBLIC, 'index.html'),

    // Paths
    assetsRoot: path.join(paths.DIST),
    assetsSubDirectory: 'static',
    assetsTemplatePath: path.join(paths.PUBLIC),
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['css', 'js', 'html', 'svg'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    }
  }
}
