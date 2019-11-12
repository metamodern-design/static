import path from 'path';
import parseMd from './parse-md';
import readDir from './read-dir';


const importContent = (context) => readDir(
  path.resolve(context, './content'),
  { md: parseMd },
);


export default importContent;
