import buildCss from './src/build-css';
import buildHtml from './src/build-html';
import buildJs from './src/build-js';
import copyAssets from './src/copy-assets';
import tryCatch from './src/try-catch';


const index = (
  context = process.cwd(),
) => tryCatch(
  async () => {
    console.log(context);
    await buildHtml(context);
    await Promise.all([
      buildCss(context),
      buildJs(context),
      copyAssets(
        [context, 'src/files'],
        [context, 'dist'],
      ),
      copyAssets(
        [context, 'src/fonts'],
        [context, 'dist/fonts'],
      ),
      copyAssets(
        [context, 'src/media'],
        [context, 'dist/media'],
      ),
    ]);
  },
  (err) => `Build failed: ${err}`,
);


export default index;
