import parseMd from './parse-md';


const readContent = (context) => readDir(
  path.resolve(context, './content'),
  { md: parseMd },
);


export default readContent;
