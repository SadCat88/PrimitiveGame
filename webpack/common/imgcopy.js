// Модуль конфига для копирования картинок (file-loader)
const baseConfig = require("../../webpack.config.js");

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              // маска для сохранения файлов - имя
              // [path] путь к исходному файлу до сборки из исходного файла CSS
              // [folder] папка в которой физически лежит файл
              publicPath: `${baseConfig.pathVars.PATHS.assets}/img`,
              // путь для добавления к картинкам в html и css
              outputPath: `${baseConfig.pathVars.PATHS.assets}/img`
              // маска для сохранения файлов - путь
            }
          }
        }
      ]
    }
  };
};
