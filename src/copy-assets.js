import cpy from 'cpy';
import pathResolve from './path-resolve';


const copyAssets = async (from, to) => {
  await cpy(
    `${pathResolve([__dirname, '../assets'].concat(from))}/*`,
    pathResolve(to),
  );
};


export default copyAssets;
