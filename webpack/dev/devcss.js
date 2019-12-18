// Модуль конфига для обработки CSS файлов

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: [
            "style-loader",
            // добавляет <style> в DOM
            "css-loader"
            // чтобы Webpack мог понимать CSS
          ]
        }
      ]
    }
  };
};
