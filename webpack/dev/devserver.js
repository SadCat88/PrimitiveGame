// Модуль конфига для WDS
const baseConfig = require("../../webpack.config.js");

module.exports = function() {
  return {
    devServer: {
      // настройки Webpack-Dev-Server
      // contentBase: baseConfig.pathVars.PATHS.prod,
      // путь в котором WDS будет искать index.html для статического режима
      publicPath: "/",
      // необходимо чтобы отменить "./" из output
      stats: "errors-only",
      // вывод в консоль в которой крутится WDS только информации об ошибках
      port: 8088,
      // порт для сервера Webpack, на 8080 можно будет запускать другой, например из Gulp
      // hot: true,
      // горячая замена модулей
      // inline: true,
      //  inline: true - скрипты подключаются инлайном для live reload
      overlay: {
        // для вывода ошибок поверх окна браузера
        warnings: true,
        // показывает предупреждения
        errors: true
        // показывает ошибки
      }
    }
  };
};
