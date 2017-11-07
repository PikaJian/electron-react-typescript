const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require("glob");
module.exports = {
  entry: {
    app : glob.sync("./src/*.tsx"),
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-redux'
    ],
  },  
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              //configFileName: './src/tsconfig.json'
            }
          },
        ]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // 
  plugins: [
    new HtmlPlugin({
      // 指定index.html的模板文件路径
      template: path.resolve(__dirname, './dist/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin(
      {name : 'vendors', filename : 'vendors.js'}),
  ],
  devServer: {
    historyApiFallback: true, // 404将会重定向至index.html
    port: 8888 // 端口号
  }
};
