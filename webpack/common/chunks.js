// Модуль конфига для выноса общего кода из разных js и css

// module.exports = function() {
//   return {
//     optimization: {
//       splitChunks: {
//         cacheGroups: {
//           // объект который будет кэшироваться
//           vendor: {
//             name: "vendors",
//             // имя файла с общим chunk
//             test: /node_modules/,
//             // забрать все импортируемые библиотеки из node_modules
//             chunks: "all",
//             enforce: true
//           }
//         }
//       }
//     }
//   };
// };

module.exports = function() {
    return {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        // в файлы с этим именем будут записаны общие участки кода
                        chunks: 'all',
                        reuseExistingChunk: true,
                        priority: 1,
                        enforce: true,
                        test(module, chunks) {
                            const name = module.nameForCondition && module.nameForCondition();
                            return chunks.some(chunk => {
                                return chunk.name === 'index' && /[\\/]node_modules[\\/]/.test(name);
                                // здесь указывается имя основной точки входа
                            });
                        }
                    },
                    secondary: {
                        name: 'secondary',
                        chunks: 'all',
                        priority: 2,
                        enforce: true,
                        test(module, chunks) {
                            return chunks.some(chunk => chunk.name === 'secondary');
                            // здесь указывается имя вспомогательной точки входа
                        }
                    }
                }
            }
        }
    }
};
