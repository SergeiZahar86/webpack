const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",                                  // режим работы webpack. По-умолчанию 'production'
    entry:                                                // точка входа в наше приложение
        {
            main: './src/index.js',
            analytics: './src/analytics.js'
        },
    output:                                               // куда нужно складывать файлы
        {
            // в какой файл, [name] - это паттерн для названия собранных файлов (main.bundle.js, analytics.bundle.js)
            //filename: "[name].bundle.js",

            // [contenthash] - паттерн для создания названий исходя из содержимого файла (решается проблема с кешом)
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, 'dist')         // __dirname - системная переменная. Указываем путь к папке
        },
    plugins: [
        new HTMLWebpackPlugin({
            //title: "Webpack App",
            template: "./src/index.html"  // копирует содержимое html файла
        })
    ]

}