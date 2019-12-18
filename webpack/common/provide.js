// Модуль конфига для ProvidePlugin

const webpack = require('webpack');
// для обращения к стандартным модулям через константу

module.exports = function() {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                // запуск ProvidePlugin, который подключит нужные модули автоматом
                $: 'jquery',
                // если встретит в коде файла "$"
                jQuery: 'jquery'
                    // если встретит в коде файла "JQuery"
            })
        ],
    };
};