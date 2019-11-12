import globby from 'globby';


const listFiles = async (context, extensions = []) => {
  const globs = (
    extensions.length > 0
      ? [].concact(extensions).map((ext) => `*.${ext}`)
      : ['*']
  );
  
  return globby(globs, { cwd: context });
};


export default listFiles;
