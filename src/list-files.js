import globby from 'globby';


const listFiles = async (context, extensions = []) => {
  const globs = (
    extensions.length > 0
      ? [].concat(extensions).map((ext) => `*.${ext}`)
      : ['*']
  );
  const results = await globby(globs, { cwd: context });
  
  return results.map(
    (filename) => path.resolve(context, `./${filename}`),
  );
};


export default listFiles;
