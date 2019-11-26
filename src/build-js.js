const buildJs = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  scripts = 'scripts',
  babelOptions = babelConfig,
  external = [],
  format = 'iife',
  includeDefaultPlugins = true,
  inputOptions = {},
  outputOptions = {},
  rollupPlugins = [],
} = {}) => {
  const scriptsDir = path.resolve(context, src, scripts);
  const entryPath = path.resolve(scriptsDir, `${name}.js`);

  
  if (await fs.pathExists(entryPath)) {
    const plugins = (
      includeDefaultPlugins
        ? [
          nodeResolve(),
          commonjs(),
          ...rollupPlugins,
          replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
          babel(babelOptions),
          terser(),
        ]
        : rollupPlugins
    );
  
    const bundle = await rollup({
      input: entryPath,
      external,
      plugins,
      ...inputOptions,
    });
  
    await bundle.write({
      file: path.resolve(context, dist, `${name}.js`),
      format,
      ...outputOptions,
    });
  }
};


export default buildJs;
