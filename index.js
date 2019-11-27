import buildCss from './src/build-css';
import buildHtml from './src/build-html';
import buildJs from './src/build-js';


const build = async () => {
  const context = process.cwd();

  await buildHtml(context);
  await buildCss(context);
  await buildJs(context);
};


export default build;
