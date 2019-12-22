import htmlMinifier from 'html-minifier';


const minifyHtml = (
  str,
  options = {
    collapseWhitespace: true,
  },
) => htmlMinifier.minify(str, options);


export default minifyHtml;
