import reduce from '@arr/reduce';
import ext from './ext';
import listFiles from './list-files';
import pathToName from './path-to-name';
import readFile from './read-file';


const readDir = async (
  context,
  parsers = {},
  { readAllFiles = false } = {},
) => {
  const extensions = (
    readAllFiles
      ? []
      : Object.keys(parsers)
  );
  const filepaths = await listFiles(context, extensions);
  const parsed = await Promise.all(
    filepaths.map((fp) => readFile(fp, parsers[ext(fp)])),
  );

  return reduce(
    filepaths,
    (a, k, i) => a.set(pathToName(k), parsed[i]),
    new Map(),
  );
};


export default readDir;
