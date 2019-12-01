import path from 'path';
import cssnano from 'cssnano';
import designSystem from '@metamodern/design-system';
import easyImport from 'postcss-easy-import';
import fs from 'fs-extra';
import postcss from 'postcss';
import presetEnv from 'postcss-preset-env';
import sugarss from 'sugarss';
import tailwindcss from 'tailwindcss';
import browserslistConfig from './browserslist.config';
import copyAssets from './copy-assets';
import listFiles from './list-files';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildCss = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  styles = 'styles',
  external = [],
  includeDefaultPlugins = true,
  postcssPlugins = [],
  tailwindConfig = designSystem(),
  targetBrowsers = browserslistConfig.join(', '),
} = {}) => {
  const stylesDir = path.resolve(context, src, styles);

  if (!(await fs.pathExists(stylesDir))) {
    await copyAssets(
      [__dirname, '../assets/styles'],
      stylesDir,
    );
  }

  const fileResults = await listFiles(stylesDir, {
    name,
    extensions: ['css', 'sss'],
  });

  throwIf(
    fileResults.length > 1,
    `Multiple entry files named "${name}" were found in ${stylesDir}. Rename each one that is not the entry stylesheet.`,
  );

  const buildCache = path.resolve(context, src, '.metamodern');
  const entryPath = path.resolve(buildCache, `${name}.sss`);

  const importsList = [].concat(
    external,
    includeDefaultPlugins
      ? 'tailwindcss/base'
      : [],
    fileResults.length === 1
      ? path.relative(buildCache, fileResults[0])
      : (await listFiles(stylesDir, {
        extensions: ['css', 'sss'],
        recursive: true,
      })).map((fp) => path.relative(buildCache, fp)),
  );

  await writeFile(
    entryPath,
    importsList.map((fp) => `@import '${fp}'`).join('\n'),
  );

  const plugins = (
    includeDefaultPlugins
      ? [
        easyImport({ extensions: ['.css', '.sss'] }),
        tailwindcss(tailwindConfig),
        ...postcssPlugins,
        presetEnv({ browsers: targetBrowsers }),
        cssnano({ preset: 'default' }),
      ]
      : postcssPlugins
  );

  const outputPath = path.resolve(context, dist, `${name}.css`);

  const cssString = await postcss(plugins).process(entryPath, {
    from: entryPath,
    parser: sugarss,
    to: outputPath,
  });
  
  console.log(cssString);

  await writeFile(
    outputPath,
    cssString,
  );
};


export default buildCss;
