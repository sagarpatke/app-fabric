const path = require('path');

module.exports = {
  entry: {
    app: ['./client/app']
  },
  output: {
    path: path.join(__dirname,'client','assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['','.jsx','.js','/index','/index.jsx','/index.js']
  }
}
