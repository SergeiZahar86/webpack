const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');         // плагин для копирования файлов с места на место
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // собирает отдельные файлы css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');  // минимизация css
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer'); // для анализа размеров подключенных библиотек


const isDev = process.env.NODE_ENV === 'development';             // можно указать в каком режиме мы хотим работать
const isProd = !isDev;
console.log('IS DEV:', isDev);
console.log('IS PROD', isProd);

const optimization = () =>
{
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd)
	{
		config.minimizer = [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = () =>
{
	const base = [
		new HTMLWebpackPlugin({
			//title: "Webpack App",
			template: "./index.html",             // копирует содержимое html файла
			minify: {
				collapseWhitespace: isProd        // минификация
			}
		}),
		new CleanWebpackPlugin(),                 // удаляет не актуальные файлы из папки сборки
		new CopyWebpackPlugin({            // копирует файлы
			patterns: [
				{
					from: path.resolve(__dirname, 'src/money.ico'),
					to: path.resolve(__dirname, 'dist'),
				}
			]
		}),
		new MiniCssExtractPlugin({
			//filename: "[name].[contenthash].css"
			//filename: "[name].[hash].css"
			filename: filename('css')
		})
	]
	if(isProd){
		base.push(new BundleAnalyzerPlugin())
	}
	return base
}

// из package.json
/*"scripts": {
        "dev": "webpack --mode development",            // сборка в режиме development
        "build": "webpack --mode production",           // сборка в режиме production
        "watch": "webpack --mode development --watch"   // для отслеживания изменения файлов без выхода из процесса
},*/


module.exports = {
	context: path.resolve(__dirname, 'src'),            // указываем папку с исходниками, так можно указать относительный путь
	mode: "development",                               // режим работы webpack. По-умолчанию 'production'
	entry:                                             // точка входа в наше приложение
		{
			main: ['@babel/polyfill', './index.js', './index.jsx'],
			analytics: './analytics.js',
			analyticsTS: './analyticsTS.ts',
		},
	output:                                            // куда нужно складывать файлы
		{
			// в какой файл, [name] - это паттерн для названия собранных файлов (main.bundle.js, analytics.bundle.js)
			//filename: "[name].bundle.js",

			// [contenthash] - паттерн для создания названий исходя из содержимого файла (решается проблема с кешом)
			//filename: "[name].[contenthash].js",
			//filename: "[name].[hash].js",
			filename: filename('js'),
			path: path.resolve(__dirname, 'dist')      // __dirname - системная переменная. Указываем путь к папке
		},
	resolve: {
		extensions: ['.js', '.ts', '.json', '.png'],            // указываем расширения по-умолчанию (которые можно не указывать при импорте)
		alias:                                           // заменяем части относительных путей
			{
				'@models': path.resolve(__dirname, 'src/models'),
				'@': path.resolve(__dirname, 'src'),
			}
	},
	optimization: optimization(),
	/*{
		// для того чтобы несколько раз не подгружать одну и ту же библиотеку (jquery например,
		// если она подключена в двух разных файлах)
		splitChunks:
			{
				chunks: "all"
			}
	}*/

	devServer: // запускает локальный сервер (обновление страницы происходит автоматически)
		{
			port: 4200,
			hot: isDev
		},
	devtool: isDev ? 'source-map' : false,
	plugins: plugins()   /*[
		new HTMLWebpackPlugin({
			//title: "Webpack App",
			template: "./index.html",             // копирует содержимое html файла
			minify: {
				collapseWhitespace: isProd        // минификация
			}
		}),
		new CleanWebpackPlugin(),                 // удаляет не актуальные файлы из папки сборки
		new CopyWebpackPlugin({            // копирует файлы
			patterns: [
				{
					from: path.resolve(__dirname, 'src/money.ico'),
					to: path.resolve(__dirname, 'dist'),
				}
			]
		}),
		new MiniCssExtractPlugin({
			//filename: "[name].[contenthash].css"
			//filename: "[name].[hash].css"
			filename: filename('css')
		})
	]*/,

	// подключение загрузчиков (loader) для работы с разными тапами файлов (не только js или json)
	module:
		{
			rules: [
				{
					test: /\.css$/,  // как только webpack встречает это регулярное выражение - будет запущен лоэдер
					// этот загрузчик работает справа на лево (сначала 'css-loader', затем 'style-loader')
					//use: ['style-loader', 'css-loader']  // подключение стилей прямо в html
					//use: [MiniCssExtractPlugin.loader, 'css-loader']   // подключение стилей через отдельный файл css
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'] // в продакшине стили встраиваются в html

					/*use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true
						}
					}, 'css-loader']*/
				},
				{
					test: /\.less$/,  // как только webpack встречает это регулярное выражение - будет запущен лоэдер
					// этот загрузчик работает справа на лево (сначала 'css-loader', затем 'style-loader')
					//use: ['style-loader', 'css-loader']  // подключение стилей прямо в html
					//use: [MiniCssExtractPlugin.loader, 'css-loader']   // подключение стилей через отдельный файл css
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // в продакшине стили встраиваются в html

					/*use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true
						}
					}, 'css-loader']*/
				},
				{
					test: /\.s[ac]ss$/,  // как только webpack встречает это регулярное выражение - будет запущен лоэдер
					// этот загрузчик работает справа на лево (сначала 'css-loader', затем 'style-loader')
					//use: ['style-loader', 'css-loader']  // подключение стилей прямо в html
					//use: [MiniCssExtractPlugin.loader, 'css-loader']   // подключение стилей через отдельный файл css
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] // в продакшине стили встраиваются в html

					/*use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true
						}
					}, 'css-loader']*/
				},
				{
					test: /\.(png|jpg|svg|gif)$/,
					use: ['file-loader']
				},
				{
					test: /\.(ttf|woff|woff2|eot|otf)$/,
					use: ['file-loader']
				},
				{
					test: /\.xml$/,
					use: ['xml-loader']
				},
				{
					test: /\.csv$/,
					use: ['csv-loader']
				},
				{ // лоэдер для бэйбла
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-class-properties'
							]
						}
					}
				},
				{ // лоэдер для бэйбла
					test: /\.m?ts$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript'],
							plugins: [
								'@babel/plugin-proposal-class-properties'
							]
						}

					}
				},
				{ // лоэдер для бэйбла
					test: /\.m?jsx$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: [
								'@babel/plugin-proposal-class-properties'
							]
						}

					}
				}
			]
		}

}