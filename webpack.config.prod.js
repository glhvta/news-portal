const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [
          {
            loader: path.resolve("./config/loaders/json-loader.js"),
            options: {
              output: "./jsonFiles/[name].json",
              reversBoolean: true,
              stringToUpperCase: true
            }
          }
        ],
        type: "javascript/auto"
      }
    ]
  }
});
