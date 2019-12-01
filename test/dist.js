import path from 'path';
import fs from 'fs-extra';
import test from 'ava';
import index from '../index';


const example = path.resolve(__dirname, 'example');


test('build script generated the public files', async (t) => {
  await index(example);

  t.true((await Promise.all([
    fs.exists(path.resolve(example, 'dist/index.html')),
    fs.exists(path.resolve(example, 'dist/index.css')),
    fs.exists(path.resolve(example, 'dist/index.js')),
    fs.exists(path.resolve(example, 'dist/media/logo.svg')),
    fs.exists(path.resolve(example, 'dist/404.html')),
  ])).every((x) => x));
});
