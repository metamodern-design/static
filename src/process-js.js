import { rollup } from 'rollup';


const processJs = async ({
  entryPath,
  external,
  inputOptions,
  format,
  outputPath,
  outputOptions,
  plugins,
}) => {
  const bundle = await rollup({
    external,
    plugins,
    input: entryPath,
    ...inputOptions,
  });

  await bundle.write({
    format,
    file: outputPath,
    ...outputOptions,
  });
};


export default processJs;
