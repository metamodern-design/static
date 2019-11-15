import pug from 'pug';


const renderPug = (locals = {}) => (
  str,
  options = {},
) => pug.render(str, { ...options, ...locals });


export default renderPug;
