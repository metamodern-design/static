import fs from 'fs-extra';
import resolvePath from './resolve-path';


const writeFile = async (paths, str) => {
  const fp = resolvePath(paths);
  const out = (
    str.slice(-1) === '\n'
      ? str
      : `${str}\n`
  );

  await fs.outputFile(fp, out);
};


export default writeFile;
