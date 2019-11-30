import readDir from './read-dir';
import renderMd from './render-md';


const readContent = (context) => readDir(
  context,
  {
    md: renderMd,
    txt: (str) => str,
  },
);


export default readContent;
