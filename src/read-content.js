import readDir from './read-dir';
import renderMd from './render-md';


const readContent = (context) => readDir(
  [context, 'content'],
  { md: renderMd },
);


export default readContent;
