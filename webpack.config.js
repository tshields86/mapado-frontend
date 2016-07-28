var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: 'eval',
  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
  root: __dirname,
  alias: {
    AddTask: 'app/components/AddTask.js',
    EditTask: 'app/components/EditTask.js',
    Home: 'app/components/Home.js',
    keys: 'app/components/keys.js',
    ListTask: 'app/components/ListTask.js',
    Main: 'app/components/Main.js',
    AddContainer: 'app/containers/AddContainer.js',
    DeleteTemp: 'app/containers/DeleteTemp.js',
    EditTaskContainer: 'app/containers/EditTaskContainer.js',
    ListTaskContainer: 'app/containers/ListTaskContainer.js',
    routes: 'app/config/routes.js',
    HomeStyles: 'app/styles/HomeStyles.js',
    ajazHelpers: 'app/utils/ajazHelpers.js',
  },
  extensions: ['', '.js', '.jsx']
},
  plugins: [
    HtmlWebpackPluginConfig
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'app'),
    }]
  }
};
