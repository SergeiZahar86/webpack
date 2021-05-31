const path = require('path');


module.exports = {
	mode: "development",                                                // режим работы webpack. По-умолчанию 'production'
	entry:                                                              // точка входа в наше приложение
		{
			main: './src/index.js',
			analytics: './src/analytics.js'
		},
	output:                                                             // куда нужно складывать файлы
		{
			filename: "[name].bundle.js",                                   // в какой файл
			path: path.resolve(__dirname, 'dist')                        // __dirname - системная переменная. Указываем путь к папке
		}
}