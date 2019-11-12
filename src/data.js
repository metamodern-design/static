import yaml from 'yaml';


const data = (context) => readDir(
  path.resolve(context, './data'),
  { yml: yaml.parse },
);


export default data;
