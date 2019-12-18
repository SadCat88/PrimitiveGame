// Базовый конфиг bp которого собирается режим dev и prod

const path = require("path");
// модуль для работы с путями
const HtmlWebpackPlugin = require("html-webpack-plugin");
// для того чтобы Webpack умел работать с HTML файлами
const merge = require("webpack-merge");
// для слияния разбитого на модули конфига
const webpack = require("webpack");
// для обращения к стандартным модулям через константу
const { VueLoaderPlugin } = require("vue-loader");
// для того чтобы Webpack умел работать с vue
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
// для поиска неиспользуемых при сборке файлов
const { DuplicatesPlugin } = require("inspectpack/plugin");
// для поиска копий одной и той же библиотеки
const CircularDependencyPlugin = require("circular-dependency-plugin");
// для поиска круговых зависимостей модулей
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// для автоматического удаления папки prod перед новой сборкой
const TerserPlugin = require("terser-webpack-plugin");
// для минимизации и оптимизации сборки JS

// Модули конфига ============================================

const devserver = require("./webpack/dev/devserver.js");
const devpug = require("./webpack/dev/devpug.js");
const devcss = require("./webpack/dev/devcss");
const devsass = require("./webpack/dev/devsass.js");
const devExtractCSS = require("./webpack/dev/dev.css.extract.js");
const prodpug = require("./webpack/prod/prodpug.js");
const provide = require("./webpack/common/provide.js");
const prodExtractCSS = require("./webpack/prod/prod.css.extract.js");
const chunks = require("./webpack/common/chunks.js");
const imgCopy = require("./webpack/common/imgcopy.js");
const wdsImgCopy = require("./webpack/dev/wds.imgcopy.js");
const fontCopy = require("./webpack/common/fontcopy.js");
const wdsFontCopy = require("./webpack/dev/wds.fontcopy.js");
const filesCopy = require("./webpack/common/filescopy.js");
// ===========================================================

// мои переменные и функции ==================================
// ===========================================================
const ENTRIES = [
  // переменная для перечисления точек входа файлов js, которые являются страницами сайта
  "index",
];

const PATHS = {
  // константа с ярлыками, указывающими на пути к нужным папкам (PATHS.src)
  src: path.join(__dirname, "./src"),
  prod: path.join(__dirname, "./prod"),
  assets: "assets"
};

// console.log("env main kek = " + env);
// const ENV = env;
// console.log("ENV main kek = " + ENV);
// exports.imgCopyEnv = { ENV };

// экспорт локальных переменных для обращения через другие конфиги
exports.pathVars = { PATHS };
// в другом конфиге необходимо сделать const baseConfig = require("./");
// console.log(baseConfig.pathVars.PATHS.src)

// Функции для генерации===================================================================
var EntriesGen = {};
// переменная в которой будут храниться точки входа после генерации
ENTRIES.forEach(function(EntryName) {
  // генерация вышеупомянутых точек входа
  EntriesGen[EntryName] =
    PATHS.src + "/pages/" + EntryName + "/" + EntryName + ".js";
});
// ========================================================================================

// ↓ Базовая часть конфига ================================================
// ========================================================================
const baseWebpackConfig = merge([
  {
    // merge - слияние кода, что идет ниже и переменных в конце
    entry: EntriesGen,
    // точки входа из переменной, являющиеся страницами
    // если надо будет добавлять точки сборки для js, которые не тянут за собой html, надо будет как-то их добавлять
    output: {
      // output - вывод результата обработки
      path: PATHS.prod,
      // куда
      filename: `${PATHS.assets}/pages/[name]/[name].[hash].js`,
      // как назвать файл, эта же ссылка пойдет в тег script
      publicPath: "./"
      // для интернета?
    },
    plugins: ENTRIES.map(FILENAME => {
      return new HtmlWebpackPlugin({
        hash: false,
        // выключить hash (default)
        filename: FILENAME + ".html",
        // здесь описывается создаваемый файл
        chunks: [FILENAME, "vendors"],
        // здесь описываются ломти из которых будет собран файл
        template: PATHS.src + "/pages/" + FILENAME + "/" + FILENAME + ".jade",
        // здесь указывается из какого pug файла будет собран html
        inject: true,
        // проставлять тег script от точки входа
        favicon: `${PATHS.src}/${PATHS.assets}/static/favicon.ico`
        // путь до favicon
      });
    })
  },
  {
    module: {
      rules: [
        {
          // для обработки js через babel
          test: /\.js$/i,
          loader: "babel-loader",
          exclude: "/node_modules/"
        },
        {
          // для обработки Vue
          test: /\.vue$/i,
          loader: "vue-loader",
          options: {
            // опции, чтобы в <style> работал SCSS
            loader: {
              scss: "vue-style-loader!css-loader!sass-loader"
            }
          }
        }
        // {
        //   // для обработки html  в связке с file-loader для svg
        //   test: /\.html$/i,
        //   loader: "html-loader"
        // }
      ]
    }
  },
  {
    resolve: {
      alias: {
        // в index.js достаточно для подключения прописать window.Vue = require('vue');
        // и по ярлыку vue будет прописан путь в node_modules/vue/dist/vue.js
        vue$: "vue/dist/vue.js",
        "~": "src"
      }
    }
  },
  {
    plugins: [
      new VueLoaderPlugin(),
      // чтобы Webpack понимал vue
      new CircularDependencyPlugin({
        // для поиска круговых зависимостей модулей
        exclude: /a\.js|node_modules/,
        // исключения
        include: /prod/
        // где искать реверсии
      })
    ]
  },
  // вызов остальных констант для merge
  provide(),
  filesCopy()
]);

// ↓ Devbuild часть конфига================================================
// ========================================================================
const devBuildWebpackConfig = merge([
  // ↓ merge - слияние кода, что идет ниже, базового конфига и переменных в конце
  {
    mode: "development",
    devtool: "source-map",
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map', - медленный, можно в продакшен, в клиентских файлах только клиентский код
    // devtool: 'cheap-source-map', - самый быстрый способ разрешенный в продакшен, cheap - source-map становится чуть короче, т.к. он без учета номеров строк и позиции внутри строки
    // devtool: 'inline-source-map', - в продакшен нельзя, source-map будет создан прямо в клиентском файле последней строкой
    // devtool: 'cheap-inline-module-source-map', - в продакшен нельзя, т.к. одной строкой в клиентских файлах
    // devtool: 'eval', - самая быстрая сборка, source-map вообще не строится, eval встраивается в модули и браузер сам строит source-map
    watchOptions: {
      aggregateTimeout: 100
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
      new CleanWebpackPlugin()
      // для автоматического удаления папки prod перед новой сборкой
    ]
  },
  // ↓ вызов базового конфига для merge
  baseWebpackConfig,
  // ↓ вызов остальных констант для merge
  devpug(),
  devExtractCSS(),
  chunks(),
  imgCopy(),
  fontCopy()
]);

// ↓ Production часть конфига==============================================
// ========================================================================

// ↓ module.exports - экспорт модулей в Node.js
module.exports = function(env) {
  if (env === "production") {
    // ключ production для сборки в режиме prod, чтобы отдать в продакшен
    return merge([
      // ↓ merge - слияние кода, что идет ниже, базового конфига и переменных в конце
      {
        mode: "production",
        optimization: {
          minimize: true
          // минимизация JS
        },
        plugins: [
          new UnusedFilesWebpackPlugin({
            // Для поиска неиспользуемых файлов
            patterns: ["src/**/*.*"],
            ignore: [""]
          }),
          new DuplicatesPlugin({
            // для поиска дублей библиотек
            verbose: false
            // полная информация
          }),
          new CleanWebpackPlugin()
          // для автоматического удаления папки prod перед новой сборкой
        ]
      },
      // ↓ вызов базового конфига для merge
      baseWebpackConfig,
      // ↓ вызов остальных констант для merge
      prodpug(),
      prodExtractCSS(),
      chunks(),
      imgCopy(),
      fontCopy()
    ]);
  }
  // ↓ Development + Server часть конфига====================================
  // ========================================================================
  if (env === "development") {
    // ключ development для запуска WDS и быстрой сборки проекта в память
    return merge([
      // ↓ merge - слияние кода, что идет ниже, базового конфига и переменных в конце
      {
        mode: "development",
        plugins: []
      },
      // ↓ вызов базового конфига для merge
      baseWebpackConfig,
      // ↓ вызов остальных констант для merge
      devserver(),
      devpug(),
      devsass(),
      devcss(),
      chunks(),
      wdsImgCopy(),
      wdsFontCopy()
    ]);
  }
  // ↓ Devbuild часть конфига================================================
  // ========================================================================
  if (env === "devbuild") {
    // ключ devbuild для сборки в режиме dev, чтобы посмотреть и подумать
    return devBuildWebpackConfig;
    // Devbuild часть конфига вынесена в отдельную константу выше devBuildWebpackConfig
  }
  // ↓ WatchDevBuild часть конфига=============================================
  // ========================================================================
  if (env === "watchDevBuild") {
    // ключ watchDevBuild для сборки в режиме dev, чтобы посмотреть и подумать
    // опция watch запускает сборку в авто режиме, поэтому здесь используется оптимизация сборки JS
    return merge([
      // ↓ merge - слияние кода, что идет ниже, базового конфига и переменных в конце
      {
        watch: true,
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {},
              exclude: /node_modules/,
              // исключения
              cache: true,
              // кеширование  сборки JS, для быстрой повторной сборки
              parallel: true
              // параллельное использование процессорных ядер
            })
          ]
        }
      },
      // ↓ вызов devBuild конфига для merge
      devBuildWebpackConfig
      // ↓ вызов остальных констант для merge
    ]);
  }
};
