import caseOf from './case-of';
import minifyHtml from './minify-html';
import pathExt from './path-ext';
import readFile from './read-file';
import renderJstl from './render-jstl';
import renderPug from './render-pug';


const renderTemplate = async (
  entryPath,
  locals = {},
  options = {},
) => {
  const parser = caseOf(pathExt(entryPath), [
    ['html', minifyHtml],
    ['jstl', renderJstl(locals)],
    ['pug', renderPug(locals)],
  ]);
  
  return readFile(entryPath, parser, options);
};
  

export default renderTemplate;
