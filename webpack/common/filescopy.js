// Модуль конфига для копирования всех нужных файлов (file-loader)
const CopyWebpackPlugin = require("copy-webpack-plugin");
const baseConfig = require("../../webpack.config.js");

module.exports = function() {
  return {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: `${baseConfig.pathVars.PATHS.src}/${baseConfig.pathVars.PATHS.assets}/static`,
          to: ``
        },
        // {
        //   from: `${baseConfig.pathVars.PATHS.src}/${baseConfig.pathVars.PATHS.assets}/fonts`,
        //   to: `${baseConfig.pathVars.PATHS.assets}/fonts`
        // },
        {
          from: `${baseConfig.pathVars.PATHS.src}/pages/**/*.svg`,
          to: `${baseConfig.pathVars.PATHS.assets}/img/`,
          flatten: true
          // удаляет в папке назначения лишний путь из источника
        },
        {
          from: `${baseConfig.pathVars.PATHS.src}/pages/**/*.SVG`,
          to: `${baseConfig.pathVars.PATHS.assets}/img/`,
          flatten: true
          // удаляет в папке назначения лишний путь из источника
        }
      ])
    ]
  };
};
