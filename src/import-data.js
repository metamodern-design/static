import yaml from 'yaml';
import readDir from './read-dir';


const importData = (context) => readDir(
  [context, 'data'],
  { yml: yaml.parse },
);


export default importData;
