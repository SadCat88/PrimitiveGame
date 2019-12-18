const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// для создания отдельного CSS, а не в составе JS
const baseConfig = require("../../webpack.config.js");

module.exports = function() {
  return {
    module: {
      rules: [
        {
          // для работы с CSS
          test: /\.css$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: true }
            }
          ]
        },
        {
          // для работы с SCSS
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name].[hash].css`
        // путь для сохранения файла
      })
    ]
  };
};
