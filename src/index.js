import Post from "./Post";                                        // вместо подключения в html
import json from './assets/json'                                  // импорт json
import WebpackLogo from './assets/webpack-logo.png'               // импорт картинок
import './styles/styles.css';                                     // импорт стилей



const post = new Post('Webpack Post Title', WebpackLogo)
console.log('Post to String:', post.toString());
console.log('JSON:', json);
console.log('JSON:', json)