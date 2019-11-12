import fs from 'fs-extra';


const readFile = async (fp, parser) => {
  const str = await fs.readFile(fp, 'utf8');

  return (
    !parser
      ? str
      : parser(str)
  );
};


export default readFile;
