import path from 'path';
import pug from 'pug';


const renderPug = (basedir, {
  entry = 'index.pug',
  locals = {},
} = {}) => {
  const fp = path.resolve(basedir, entry);
  const options = { basedir, ...locals };
  
  return pug.renderFile(fp, options);
};


export default renderPug;
