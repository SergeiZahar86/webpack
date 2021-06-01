

import * as $ from 'jquery';
import Post from "@models/Post";                                        // вместо подключения в html
import json from './assets/json'                                  // импорт json
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import WebpackLogo from './assets/webpack-logo.png'               // импорт картинок
import './styles/styles.css';                                     // импорт стилей



const post = new Post('Webpack Post Title', WebpackLogo)
console.log('Post to String:', post.toString());
console.log('JSON:', json);
console.log('xml:', xml);
console.log('csv:', csv);
console.log( $('.brioso').width());