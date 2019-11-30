import path from 'path';
import fs from 'fs-extra';
import compileRouteMap from './compile-route-map';
import listFiles from './list-files';
import mapToObject from './map-to-object';
import readContent from './read-content';
import readData from './read-data';
import renderTemplate from './render-template';
import throwIf from './throw-if';
import writeFile from './write-file';


const buildHtml = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  content = 'content',
  data = 'data',
  templates = 'templates',
} = {}) => {
  const templatesDir = path.resolve(context, src, templates);

  throwIf(
    !(await fs.pathExists(templatesDir)),
    `Looking for entry template, but ${templatesDir} does not exist`,
  );

  const fileResults = await listFiles(templatesDir, {
    name,
    extensions: ['html', 'jstl', 'pug'],
  });

  throwIf(
    fileResults.length === 0,
    `No entry file named "${name}.html", "${name}.jstl", or "${name}.pug" was found in ${templatesDir}`,
  );

  throwIf(
    fileResults.length > 1,
    `Multiple entry files named "${name}" were found in ${templatesDir}. Rename each one that is not the entry template.`,
  );

  const contentMap = await readContent([context, src, content]);
  const dataMap = await readData([context, src, data]);

  const locals = {
    content: mapToObject(contentMap),
    ...mapToObject(dataMap),
  };

  const options = {
    basedir: templatesDir,
  };

  const htmlString = await renderTemplate(
    fileResults[0],
    locals,
    options,
  );

  await writeFile(
    [context, dist, `${name}.html`],
    htmlString,
  );

  if (dataMap.has('routes')) {
    const publicUrl = (
      dataMap.has('meta')
        ? dataMap.get('meta').publicUrl
        : ''
    );

    const jsString = await compileRouteMap(
      dataMap.get('routes'),
      locals,
      options,
      publicUrl,
    );

    await writeFile(
      [context, src, '.metamodern/route-map.js'],
      jsString,
    );
  }
};


export default buildHtml;
