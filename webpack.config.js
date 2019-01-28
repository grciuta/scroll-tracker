const path = require('path');
module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "sass-loader",
          options: {
              includePaths: ["example"]
          }
      }]
    }]
  },
  entry: {
    index: './src/index.js',
    example: './exm/example.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib')
  }
};