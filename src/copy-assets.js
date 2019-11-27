import cpy from 'cpy';
import pathResolve from './path-resolve';


const copyAssets = async (fromPath, toPath) => {
  const resolved = pathResolve(fromPath);

  if (await fs.pathExists(resolved)) {
    cpy(
      `${resolved}/*`,
      pathResolve(toPath),
    );
  }
};


export default copyAssets;
