import path from 'path';
import globby from 'globby';


const listFiles = async (context, {
  extensions = [],
  name = '*',
  recursive = false,
} = {}) => {
  const prefix = recursive ? '**/' : '';
  const postfix = (name !== '*') ? `.*` : '';
  const globs = (
    extensions.length > 0
      ? [].concat(extensions).map((ext) => `${prefix}${name}.${ext}`)
      : `${name}${postfix}`
  );

  const results = await globby(globs, { cwd: context });

  return results.map(
    (filename) => path.resolve(context, filename),
  );
};


export default listFiles;
