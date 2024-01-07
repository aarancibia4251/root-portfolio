const merge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "arancibia";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    entry: {
      index: path.resolve(__dirname, "src") + "/arancibia-root-config.ts",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: (compilation, assets, assetTags, options) => {
          return {
            isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          };
        },
      }),
      new webpack.DefinePlugin({
        isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from:
              "src/import-maps/import-map." +
              webpackConfigEnv.importMap +
              ".json",
            to: "import-map.json",
          },
          {
            from: "src/assets",
            to: "assets",
          },
        ],
      }),
    ],
  });
};
