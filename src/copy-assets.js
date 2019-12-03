import path from 'path';
import flatten from '@arr/flatten';
import copyDir from './copy-dir';


const copyAssets = async (context, {
  src = 'src',
  dist = 'dist',
  assets = [],
}) => {
  const assetMap = new Map([
    [
      path.resolve(context, src, 'files'),
      path.resolve(context, dist),
    ],
    [
      path.resolve(context, src, 'fonts'),
      path.resolve(context, dist, 'fonts'),
    ],
    [
      path.resolve(context, src, 'media'),
      path.resolve(context, dist, 'media'),
    ],
  ]);
  
  assets.forEach(([fromPath, toPath]) => {
    assetMap.set(
      path.resolve(context, fromPath),
      path.resolve(context, dist, toPath),
    );
  });
  
  const outputPaths = await Promise.all(
    [...assetMap.entries()].map(
      ([fromPath, toPath]) => copyDir(fromPath, toPath),
    ),
  );
  
  return flatten(outputPaths);
};


export default copyAssets;
