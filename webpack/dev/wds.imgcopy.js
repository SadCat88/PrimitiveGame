// Модуль конфига для копирования картинок (file-loader)
// В режиме WDS необходимо отменить publicPath
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
              // publicPath: `../../img`,
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
