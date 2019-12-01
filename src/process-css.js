import postcss from 'postcss';
import sugarss from 'sugarss';
import readFile from './read-file';
import writeFile from './write-file';


const processCss = async ({
  entryPath,
  outputPath,
  plugins,
  parser = sugarss,
} = {}) => {
  const entryFile = await readFile(entryPath);

  const result = await postcss(plugins).process(entryFile, {
    parser,
    from: entryPath,
    to: outputPath,
  });

  await writeFile(
    outputPath,
    result.css,
  );
};


export default processCss;
