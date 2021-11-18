const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

//配置
module.exports = {
  mode:"development",
  entry: './demo',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    host:getIPAddress(),
    port:3021,
    open:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react-keep-router",
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
};

//函数
function getIPAddress(){
  const interfaces = require('os').networkInterfaces();
  for(const devName in interfaces){
    const iface = interfaces[devName];
    for(let i=0;i<iface.length;i++){
      const alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}
