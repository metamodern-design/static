import pug from 'pug';


const renderPug = (locals = {}) => (str, options = {}) => {
  const htmlString = pug.render(str, {
    ...options,
    ...locals,
  });

  return htmlString.replace(/\s+/g, ' ');
};


export default renderPug;
