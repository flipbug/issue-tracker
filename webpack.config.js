var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './resources/js/index.js',
  output: {
    path: './public/dist',
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.tag.html$/,
        loader: 'tag',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!sass?sourceMap'
        )
      }
    ]
  },
  sassLoader: {
    includePaths: [ './node_modules/bootstrap/scss' ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
}