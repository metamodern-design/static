import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import pkg from './package.json';


const plugins = [
  nodeResolve({
    preferBuiltins: true,
  }),
  commonjs(),
];


const external = [].concat(
  'path'
  Object.keys(pkg.dependencies),
);


const rollupConfig = [
  {
    external,
    plugins,
    input: 'index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
  {
    external,
    input: 'cli.js',
    output: [
      { file: pkg.cli, format: 'cjs' },
    ],
    plugins: [
      preserveShebangs(),
      ...plugins,
    ],
  },
];


export default rollupConfig;
