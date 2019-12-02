import path from 'path';
import camelcase from 'camelcase';
import pathResolve from './path-resolve';


const pathCamelize = (
  fp,
  numDirs = 0,
) => {
  const { dir, name } = path.parse(pathResolve(fp));

  return camelcase(
    dir.split(/[/\\]/g)
      .reverse()
      .slice(0, numDirs)
      .reverse()
      .concat(name)
      .join('-'),
  );
};


export default pathCamelize;
