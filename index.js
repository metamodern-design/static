import importContent from './src/import-content';
import importData from './src/import-data';

const context = process.cwd();

const locals = { importContent(context), ...importData(context) };

export default locals;
