const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '/client/public'),
  },
  devServer: {
    contentBase: path.join(__dirname, './src/client/public'),
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Клиент-серверное приложение',
      template: './src/client/public/index.html',
    }),
  ],
};
