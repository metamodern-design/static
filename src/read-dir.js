import path from 'path';
import reduce from '@arr/reduce';
import listFiles from './list-files';
import pathToName from './path-to-name';


const readDir = async (
  context,
  parsers = {},
) => {
  const filepaths = await listFiles(context, Object.keys(parsers));
  const parsed = await Promise.all(
    filepaths.map((fp) => {
      const ext = path.extname(fp).slice(1);
      return readFile(fp, parsers[ext]);
    }),
  );
  
  return reduce(
    filepaths,
    (a, k, i) => a.set(pathToName(k), parsed[i]),
    new Map(),
  );
};


export default readDir;
