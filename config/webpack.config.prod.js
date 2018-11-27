const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(["dist"], { root: path.resolve(__dirname, "../") }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
