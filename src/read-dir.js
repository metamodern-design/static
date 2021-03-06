import reduce from '@arr/reduce';
import listFiles from './list-files';
import pathCamelize from './path-camelize';
import pathExt from './path-ext';
import readFile from './read-file';


const readDir = async (context, parsers = {}, {
  readAllFiles = false,
  recursive = false,
} = {}) => {
  const extensions = (
    readAllFiles
      ? []
      : Object.keys(parsers)
  );

  const filepaths = await listFiles(context, {
    extensions,
    recursive,
  });

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
