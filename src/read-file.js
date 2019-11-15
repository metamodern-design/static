import fs from 'fs-extra';
import resolvePath from './resolve-path';


const readFile = async (
  paths,
  parser,
  options,
) => {
  const fp = resolvePath(paths);
  const str = await fs.readFile(fp, 'utf8');

  return (
    !parser
      ? str
      : parser(str, options)
  );
};


export default readFile;
