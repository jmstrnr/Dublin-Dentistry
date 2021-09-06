const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: './dist/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '',
    watchContentBase: true,
    liveReload: true,
    hot: true, // Will cause conflicts with liveReload unless watchContentBase: true
    index: 'index.html',
    port: 8001,
    open: true, // Open a new tab in default browser
    watchOptions: {
      ignored: '/node_modules/', // Dont watch for changes in Node modules for better performance
      poll: 1000, // Check for changes every second, keep this as its needed for live-reload to work
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Must be the same as the value for devServer.index for dev-server to work
      chunks: ['main'],
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', // Inject styles into DOM/
          'css-loader', // Turns css into commonjs
        ],
      },
    ],
  },
});
