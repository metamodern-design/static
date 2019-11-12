import path from 'path';
import reduce from '@arr/reduce';
import listFiles from './list-files';
import pathToName from './path-to-name';
import readFile from './read-file';


const readDir = async (
  context,
  parsers = {},
  { readAllFiles = false } = {},
) => {
  const extensions = readAllFiles ? [] : Object.keys(parsers);
  const filepaths = await listFiles(context, extensions);
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
