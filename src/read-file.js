import fs from 'fs-extra';
import pathResolve from './path-resolve';


const readFile = async (
  fp,
  parser,
  options,
) => {
  const str = await fs.readFile(
    pathResolve(fp),
    'utf8',
  );

  return (
    !parser
      ? str
      : parser(str, options)
  );
};


export default readFile;
