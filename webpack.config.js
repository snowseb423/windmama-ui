var path = require('path');
var root = path.resolve(__dirname);
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: ['./app/js/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        include: root
      }
    ]
  },
  plugins: [

  ]
};
