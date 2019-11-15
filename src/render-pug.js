import path from 'path';
import pug from 'pug';
import readFile from './read-file';


const renderPug = async (
  basedir,
  entry,
  locals = {},
) => readFile(
  path.resolve(basedir, entry),
  (str) => pug.render(str, { basedir, ...locals }),
);


export default renderPug;
