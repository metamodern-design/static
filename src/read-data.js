import toml from '@iarna/toml';
import yaml from 'yaml';
import readDir from './read-dir';


const readData = (context) => readDir(
  context,
  {
    json: JSON.parse,
    toml: toml.parse,
    yml: yaml.parse,
  },
);


export default readData;
