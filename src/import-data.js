import path from 'path';
import yaml from 'yaml';
import readDir from './read-dir';


const importData = (context) => readDir(
  path.resolve(context, './data'),
  { yml: yaml.parse },
);


export default importData;
