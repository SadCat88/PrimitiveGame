// Модуль PostCSS

module.exports = {
    plugins: [
        require('autoprefixer'),
        // проставляет префиксы
        require('css-mqpacker'),
        // группирует медиа запросы
        require('cssnano')({
        // сжимает css
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                        // удаляет все комментарии из CSS
                    }
                }
            ]
        })
    ]
}