// Модуль конфига для Sass

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: [
            "style-loader",
            // добавляет <style> в DOM
            "css-loader",
            // чтобы Webpack мог понимать CSS
            "sass-loader"
            // компилятор SCSS в CSS
          ]
        }
      ]
    }
  };
};
