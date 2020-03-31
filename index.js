import flatten from '@arr/flatten';
import buildCss from './src/build-css';
import buildHtml from './src/build-html';
import buildJs from './src/build-js';
import copyAssets from './src/copy-assets';
import tryCatch from './src/try-catch';


const index = async (
  context = process.cwd(),
  options = {},
) => {
  const postcss = options.postcss || {};
  const rollup = options.rollup || {};

  return tryCatch(
    async () => {
      const htmlOut = (
        options.skipHtml
          ? []
          : await buildHtml(context, options)
      );
      
      const jsOut = await buildJs(context, {
        ...options,
        ...rollup,
      });

      const assetsOut = await Promise.all([
        buildCss(context, {
          ...options,
          ...postcss,
        }),
        copyAssets(context, options),
      ]);

      return flatten([htmlOut, jsOut, assetsOut]);
    },
    (err) => `Build failed: ${err}`,
  );
};


export default index;
