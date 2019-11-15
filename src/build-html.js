import path from 'path';
import fs from 'fs-extra';
import ext from './ext';
import caseOf from './case-of';
import importContent from './import-content';
import importData from './import-data';
import listFiles from './list-files';
import mapToObject from './map-to-object';
import minifyHtml from './minify-html';
import renderJstl from './render-jstl';
import renderPug from './render-pug';
import throwIf from './throw-if';


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

  const extensions = ['html', 'pug'];
  const indexFile = listFiles(templatesDir, extensions, 'index');

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

  const html = await caseOf(ext(indexFile), [
    ['html', () => minifyHtml(indexFile)],
    ['jstl', () => renderJstl(indexFile, locals)],
    ['pug', () => renderPug(templatesDir, 'index.pug', locals)],
  ])();
  
  const out = path.resolve(context, dist, `${name}.html`);

  await fs.outputFile(out, `${html}\n`);
};


export default buildHtml;
