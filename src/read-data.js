import yaml from 'yaml';


const readData = (context) => readDir(
  path.resolve(context, './data'),
  { yml: yaml.parse },
);


export default readData;
