import importContent from './import-content';
import importData from './import-data';


const buildHtml = async (context, {
  name = 'index',
  public = 'dist',
  src = 'src',
  templates = 'templates',
} = {}) => {
  const templatesDir = path.resolve(context, './${src}', './${templates}');
  
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
  
  const html = caseOf(ext(indexFile), [
    ['html', () => readFile(indexFile)],
    ['pug', () => renderPug(templatesDir, { locals })],
  ])();
  
  const out = path.resolve(context, './${public}', './${name}.html');

  await fs.outputFile(out, `${html}\n`);
};