// Модуль конфига для копирования картинок (file-loader)
const baseConfig = require("../../webpack.config.js");

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              // маска для сохранения файлов - имя
              publicPath: `/assets/fonts`,
              // путь для добавления к шрифтам в css
              outputPath: `${baseConfig.pathVars.PATHS.assets}/fonts`
              // маска для сохранения файлов - путь
            }
          }
        }
      ]
    }
  };
};
