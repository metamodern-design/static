import pug from 'pug';
import minifyHtml from './minify-html';


const renderPug = (locals = {}) => (
  str,
  options = {},
) => minifyHtml(
  pug.render(str, { ...options, ...locals }),
);


export default renderPug;
