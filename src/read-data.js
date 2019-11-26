import yaml from 'yaml';
import readDir from './read-dir';


const readData = (context) => readDir(
  [context, 'data'],
  { yml: yaml.parse },
);


export default readData;
