#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import mri from 'mri';
import index from './index';
import tryCatch from './src/try-catch';


(() => {
  tryCatch(
    async () => {
      const cliArgs = mri(process.argv.slice(2));
      const context = path.resolve(
        process.cwd(),
        cliArgs._[0] || '',
      );
    
      const configPath = path.resolve(context, 'metamodern.config.js');
    
      const config = (
        await fs.pathExists(configPath)
          ? await import(configPath)
          : {}
      );
    
      const outputPaths = await index(context, config);
    
      console.log(`Files generated:\n${outputPaths.join('\n')}`);
    },
    (err) => `Build failed: ${err}`,
  );
})();
