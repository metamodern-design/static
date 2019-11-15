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
import caseOf from './case-of';
import listFiles from './list-files';
import pathExt from './path-ext';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildCss = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  styles = 'styles',
  includeDefaultPlugins = true,
  postcssPlugins = [],
  tailwindConfig = designSystem(),
  targetBrowsers = browserslistConfig.join(', '),
} = {}) => {
  const stylesDir = path.resolve(context, src, styles);

  throwIf(
    !(await fs.pathExists(stylesDir)),
    () => `Looking for entry stylesheet, but ${stylesDir} does not exist`,
  );

  const entryFile = listFiles(stylesDir, {
    name,
    extensions: ['css', 'sss'],
  });

  throwIf(
    entryFile.length === 0,
    () => `No entry file named "${name}.css" or "${name}.sss" was found in ${stylesDir}`,
  );

  throwIf(
    entryFile.length > 1,
    () => `Multiple entry files named "${name}" were found in ${stylesDir}. Rename each one that is not the entry stylesheet.`,
  );

  const configPlugins = (ext) => (
    includeDefaultPlugins
      ? [
        easyImport({ extensions: `.${ext}` }),
        tailwindcss(tailwindConfig),
        ...postcssPlugins,
        presetEnv({ browsers: targetBrowsers }),
        cssnano({ preset: 'default' }),
      ]
      : postcssPlugins
  );

  const { plugins, parser } = caseOf(pathExt(entryFile), [
    [
      'css',
      () => ({ plugins: configPlugins('css') }),
    ],
    [
      'sss',
      () => ({ parser: sugarss, plugins: configPlugins('sss') }),
    ],
  ]);

  const outputFile = path.resolve(context, dist, `${name}.css`);

  const cssString = await postcss(plugins).process(
    entryFile,
    {
      parser,
      from: entryFile,
      to: outputFile,
    },
  );

  await writeFile(
    outputFile,
    cssString,
  );
};


export default buildCss;
