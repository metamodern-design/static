import path from 'path';
import fs from 'fs-extra';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import babelConfig from './babel.config';


const buildJs = async (context, {
  name = 'index',
  dist = 'dist',
  src = 'src',
  scripts = 'scripts',
  external = [],
  format = 'iife',
  includeDefaultPlugins = true,
  inputOptions = {},
  outputOptions = {},
  rollupPlugins = [],
  babelOptions = {},
  babelPlugins = babelConfig.plugins,
  babelPresets = babelConfig.presets,
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
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
          babel({
            plugins: babelPlugins,
            presets: babelPresets,
            ...babelOptions,
            exclude: [].concat(/\/core-js\//, babelOptions.exclude || []),
          }),
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
