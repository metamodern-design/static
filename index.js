import importContent from './src/import-content';
import importData from './src/import-data';
import mapToObject from './stc/map-to-object';

const context = process.cwd();

const content = mapToObject(importContent(context));

const data = mapToObject(importData(context));

const locals = { content, ...data };

export default locals;
