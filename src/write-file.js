import fs from 'fs-extra';
import pathResolve from './path-resolve';


const writeFile = async (fp, str) => {
  const out = (
    str.slice(-1) === '\n'
      ? str
      : `${str}\n`
  );

  await fs.outputFile(
    pathResolve(fp),
    out,
  );
};


export default writeFile;
