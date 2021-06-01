const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// из package.json
/*"scripts": {
        "dev": "webpack --mode development",            // сборка в режиме development
        "build": "webpack --mode production",           // сборка в режиме production
        "watch": "webpack --mode development --watch"   // для отслеживания изменения файлов без выхода из процесса
},*/




module.exports = {
    context: path.resolve(__dirname,'src'),            // указываем папку с исходниками, так можно указать относительный путь
    mode: "development",                               // режим работы webpack. По-умолчанию 'production'
    entry:                                             // точка входа в наше приложение
        {
            main: './index.js',
            analytics: './analytics.js'
        },
    output:                                            // куда нужно складывать файлы
        {
            // в какой файл, [name] - это паттерн для названия собранных файлов (main.bundle.js, analytics.bundle.js)
            //filename: "[name].bundle.js",

            // [contenthash] - паттерн для создания названий исходя из содержимого файла (решается проблема с кешом)
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, 'dist')      // __dirname - системная переменная. Указываем путь к папке
        },
    plugins: [
        new HTMLWebpackPlugin({
            //title: "Webpack App",
            template: "./index.html"             // копирует содержимое html файла
        }),
        new CleanWebpackPlugin()                 // удаляет не актуальные файлы из папки сборки
    ],

    // подключение загрузчиков (loader) для работы с разными тапами файлов (не только js или json)
    module:
        {
        rules: [
            {
                test: /\.css$/,  // как только webpack встречает это регулярное выражение - будет запущен лоэдер
                // этот загрузчик работает справа на лево (сначала 'css-loader', затем 'style-loader')
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: ['file-loader']
            }
        ]
    }

}