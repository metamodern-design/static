import reduce from '@arr/reduce';
import listFiles from './list-files';
import pathCamelize from './path-camelize';
import pathExt from './path-ext';
import pathResolve from './path-resolve';
import readFile from './read-file';


const readDir = async (
  context,
  parsers = {},
  { readAllFiles = false } = {},
) => {
  const filepaths = await listFiles(
    pathResolve(context),
    readAllFiles ? [] : Object.keys(parsers),
  );
  const parsed = await Promise.all(
    filepaths.map(
      (fp) => readFile(fp, parsers[pathExt(fp)]),
    ),
  );

  return reduce(
    filepaths,
    (a, k, i) => a.set(pathCamelize(k), parsed[i]),
    new Map(),
  );
};


export default readDir;
