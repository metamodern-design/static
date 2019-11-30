#!/usr/bin/env node

import meow from 'meow';
import index from './index';


(() => {
  const cli = meow(`
    Usage
      $ npx metamodern-static <path>
 
    Examples
      $ npx metamodern-static ./projects/my-site/
  `);

  index(cli.input[0]);
})();
