import path from 'path';
import globby from 'globby';


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
  
  console.log(context);
  console.log(globs);

  const results = await globby(globs, { cwd: context });

  return (
    relative
      ? results
      : results.map((filename) => path.resolve(context, filename))
  );
};


export default listFiles;
