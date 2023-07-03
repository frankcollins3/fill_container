const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  entry: './server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^child_process$/,
    }),
  ],
  resolve: {
    fallback: {
      fs: false, // Disable resolving 'fs' module
      stream: require.resolve('stream-browserify'), // Resolve 'stream' module using 'stream-browserify' package
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      querystring: require.resolve('querystring-es3'), // Add fallback for 'querystring' module
      crypto: require.resolve('crypto-browserify'), // Add fallback for 'crypto' module
      constants: require.resolve('constants-browserify'), // Add fallback for 'constants' module
      module: require.resolve('module'), // Add fallback for 'module' module
      url: require.resolve('url/'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      assert: require.resolve('assert/'),
      './zlib_bindings': require.resolve('browserify-zlib/lib/binding'),
    },
  },
};
