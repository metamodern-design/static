import htmlMinifier from 'html-minifier';


const minifyHtml = (
  str,
  options = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    customAttrCollapse: /data-\w+/,
  },
) => htmlMinifier.minify(str, options);


export default minifyHtml;
