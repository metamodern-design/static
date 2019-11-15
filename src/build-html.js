import path from 'path';
import fs from 'fs-extra';
import caseOf from './case-of';
import importContent from './import-content';
import importData from './import-data';
import listFiles from './list-files';
import mapToObject from './map-to-object';
import minifyHtml from './minify-html';
import pathExt from './path-ext';
import readFile from './read-file';
import renderJstl from './render-jstl';
import renderPug from './render-pug';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildHtml = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  templates = 'templates',
} = {}) => {
  const templatesDir = path.resolve(context, src, templates);

  throwIf(
    !(await fs.pathExists(templatesDir)),
    () => `Looking for entry template, but ${templatesDir} does not exist`,
  );

  const entryFile = listFiles(
    templatesDir,
    ['html', 'jstl', 'pug'],
    name,
  );

  throwIf(
    entryFile.length === 0,
    () => `No entry file named "${name}.html" or "${name}.pug" was found in ${templatesDir}`,
  );

  throwIf(
    entryFile.length > 1,
    () => `Multiple entry files named "${name}" were found in ${templatesDir}. Rename each one that is not the entry template.`,
  );

  const content = mapToObject(importContent(context));
  const data = mapToObject(importData(context));
  const locals = { content, ...data };

  const htmlString = await caseOf(pathExt(entryFile), [
    [
      'html',
      () => readFile(entryFile, minifyHtml),
    ],
    [
      'jstl',
      () => readFile(entryFile, renderJstl(locals)),
    ],
    [
      'pug',
      () => readFile(entryFile, renderPug(locals), { basedir: templatesDir }),
    ],
  ])();

  await writeFile(
    [context, dist, `${name}.html`],
    htmlString,
  );
};


export default buildHtml;
