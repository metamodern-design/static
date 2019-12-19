import path from 'path';
import cssnano from 'cssnano';
import designSystem from '@metamodern/design-system';
import easyImport from 'postcss-easy-import';
import fs from 'fs-extra';
import presetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';
import tailwindcss from 'tailwindcss';
import browserslistConfig from './browserslist.config';
import copyAssets from './copy-assets';
import listFiles from './list-files';
import processCss from './process-css';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildCss = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  styles = 'styles',
  templates = 'templates',
  external = [],
  postcssPlugins = [],
  includeDefaultPlugins = true,
  includeFullPalette = false,
  designSystemConfig = { includeFullPalette },
  tailwindConfig = designSystem(designSystemConfig),
  targetBrowsers = browserslistConfig.join(', '),
  usePurge = false,
} = {}) => {
  const stylesDir = path.resolve(context, src, styles);
  const templatesDir = path.resolve(context, src, templates);
  const outputPath = path.resolve(context, dist, `${name}.css`);

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
    [].concat(
      importsList.map((fp) => `@import '${fp}'`),
      includeDefaultPlugins
        ? '@tailwind utilities'
        : []
    ).join('\n'),
  );

  const purgecssConfig = {
    content: [
      `${templatesDir}/**/*.html`,
      `${templatesDir}/**/*.jstl`,
      `${templatesDir}/**/*.pug`,
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  };

  const plugins = (
    includeDefaultPlugins
      ? [].concat(
        easyImport({ extensions: ['.css', '.sss'] }),
        tailwindcss(tailwindConfig),
        postcssPlugins,
        usePurge ? purgecss(purgecssConfig) : [],
        presetEnv({ browsers: targetBrowsers }),
        cssnano({ preset: 'default' }),
      )
      : [].concat(
        postcssPlugins,
        usePurge ? purgecss(purgecssConfig) : [],
      )
  );

  await processCss({
    entryPath,
    outputPath,
    plugins,
  });

  return outputPath;
};


export default buildCss;
