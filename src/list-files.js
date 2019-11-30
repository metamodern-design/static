import globby from 'globby';
import pathResolve from './path-resolve';


const listFiles = async (context, {
  extensions = [],
  name = '*',
  recursive = false,
  relative = false,
} = {}) => {
  const prefix = recursive ? '**/' : '';
  const postfix = (name !== '*') ? '.*' : '';
  const globs = (
    extensions.length > 0
      ? [].concat(extensions).map((ext) => `${prefix}${name}.${ext}`)
      : `${name}${postfix}`
  );

  const results = await globby(
    globs,
    { cwd: pathResolve(context) },
  );

  return (
    relative
      ? results
      : results.map((filename) => pathResolve([].concat(context, filename)))
  );
};


export default listFiles;
