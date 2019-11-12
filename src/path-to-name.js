import path from 'path';
import camelcase from 'camelcase';


const pathToName = (fp) => {
  const { name } = path.parse(fp);

  return camelcase(name);
};


export default pathToName;
