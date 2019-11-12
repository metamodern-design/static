import parseMd from './parse-md';


const content = (context) => readDir(
  path.resolve(context, './content'),
  { md: parseMd },
);


export default content;
