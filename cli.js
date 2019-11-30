#!/usr/bin/env node

import path from 'path';
import mri from 'mri';
import index from './index';


(() => {
  const cliArgs = mri(process.argv.slice(2));
  const context = path.resolve(
    process.cwd(),
    cliArgs._[0] || '',
  );

  index(context);
})();
