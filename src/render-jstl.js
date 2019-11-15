/* eslint no-new-func: "off" */

import minifyHtml from './minify-html';


const renderJstl = (locals = {}) => {
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
  const render = (str) => new Function(
    'locals',
    `${destructure}return \`${str}\``,
  )(locals);

  return (str, options) => minifyHtml(render(str), options);
};


export default renderJstl;
