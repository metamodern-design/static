/* eslint no-new-func: "off" */

import htmlMinifier from 'html-minifier';
import readFile from './read-file';


const renderJstl = async (
  fp,
  locals = {},
) => {
  const names = (
    !locals.length
      ? Object.keys(locals)
      : []
  );
  const destructure = (
    names.length > 0
      ? `const {${names.join(',')}} = locals;`
      : ''
  );
  const parser = (str) => new Function(
    'locals',
    `${destructure}return \`${str}\``,
  )(locals);

  const result = await readFile(fp, parser);

  return htmlMinifier.minify(result);
};


export default renderJstl;
