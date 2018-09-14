const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({  // 项目中可以获取到判断当前环境
      'process.env': {
        NODE_ENV: isDev ? '"developmemnt"' : '"production"'
      }
    })
  ]
  // alias: {
  //   components: path.join(__dirname, components),
  //   views: path.join(__dirname, views),
  //   styles: path.join(__dirname, styles),
  //   store: path.join(__dirname, store),
  // }
};

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    compress: true,
    port: 8080,
    overlay: {
      errors: true, // 错误显示到网页
    },
    hot: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()  // 不必要信息不展示
  );
}

module.exports = config;