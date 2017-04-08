var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './scripts/bootstrap.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/dist/',
    historyApiFallback: true
  }
};
