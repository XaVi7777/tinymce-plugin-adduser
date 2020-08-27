const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
  })],
  devServer: {
    historyApiFallback: true,
    proxy: [{
      path: '/api/',
      target: 'http://localhost:4000'
    }],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        }
      }
    ]
  }
}