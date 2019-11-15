import fs from 'fs-extra';
import ext from './ext';
import caseOf from './case-of';
import importContent from './import-content';
import importData from './import-data';
import listFiles from './list-files';
import mapToObject from './map-to-object';
import minifyHtml from './minify-html';
import readFile from './read-file';
import renderJstl from './render-jstl';
import renderPug from './render-pug';
import resolvePath from './resolve-path';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildHtml = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  templates = 'templates',
} = {}) => {
  const templatesDir = resolvePath([context, src, templates]);

  throwIf(
    !(await fs.pathExists(templatesDir)),
    () => `Looking for entry template, but ${templatesDir} does not exist`,
  );

  const indexFile = listFiles(
    templatesDir,
    ['html', 'jstl', 'pug'],
    'index',
  );

  throwIf(
    indexFile.length === 0,
    () => `No entry file named "index.html" or "index.pug" was found in ${templatesDir}`,
  );

  throwIf(
    indexFile.length > 1,
    () => `Multiple entry files names "index" were found in ${templatesDir}. Rename each one that is not the entry template.`,
  );

  const content = mapToObject(importContent(context));
  const data = mapToObject(importData(context));
  const locals = { content, ...data };

  const htmlString = await caseOf(ext(indexFile), [
    [
      'html',
      () => readFile(indexFile, minifyHtml),
    ],
    [
      'jstl',
      () => readFile(indexFile, renderJstl(locals)),
    ],
    [
      'pug',
      () => readFile(indexFile, renderPug(locals), { basedir: templatesDir }),
    ],
  ])();

  await writeFile(
    [context, dist, `${name}.html`],
    htmlString,
  );
};


export default buildHtml;
