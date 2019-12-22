import pug from 'pug';
import minifyHtml from 'minify-html';


const renderPug = (locals = {}) => (str, options = {}) => {
  const htmlString = pug.render(str, {
    ...options,
    ...locals,
  });

  return minifyHtml(htmlString, {});
};


export default renderPug;
