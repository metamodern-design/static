import htmlMinifier from 'html-minifier';
import readFile from './read-file';


const minifyHtml = async (
  fp,
  options = {
    collapseWhitespace: true,
  },
) => readFile(
  fp,
  (str) => htmlMinifier.minify(str, options),
);


export default minifyHtml;
