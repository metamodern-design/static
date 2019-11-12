import fs from 'fs-extra';


const readFile = async (fp, parser) => {
  const str = await fs.readFile(filepath, 'utf8');

  return (
    !parser
      ? str
      : parser(str)
  );
};


export default readFile;
