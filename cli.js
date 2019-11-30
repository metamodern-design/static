#!/usr/bin/env node

import mri from 'mri';
import index from './index';


(() => {
  const cliArgs = mri(process.argv.slice(2));

  index(cliArgs._[0]);
})();
