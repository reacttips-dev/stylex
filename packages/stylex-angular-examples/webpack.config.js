const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");

module.exports = {
  entry: "./src/main.browser.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: StylexPlugin.loader,
            options: {
              inject: true,
            },
          },
          {
            loader: 'awesome-typescript-loader',
          },
          {
            loader: 'angular2-template-loader',
          },

        ]
      },
      {
        test: /\.(css|html)$/,
        exclude: [root('./src/index.html')],
        use: [
          {
            loader: 'raw-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src'),
      {}
    ),
    new StylexPlugin(),
  ],
  devServer: {
    historyApiFallback: true
  }
};

function root(__path) {
  return path.join(__dirname, __path);
}
