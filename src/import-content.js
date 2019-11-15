import readDir from './read-dir';
import renderMd from './render-md';


const importContent = (context) => readDir(
  [context, 'content'],
  { md: renderMd },
);


export default importContent;
