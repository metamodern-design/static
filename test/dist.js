import path from 'path';
import del from 'del';
import fs from 'fs-extra';
import test from 'ava';
import index from '../index';


const example = path.resolve(__dirname, 'example');


test.after(async (t) => {
  await del(path.resolve(example, 'dist*'));
});


test('build script generated the public files', async (t) => {
  const built = await index(example, {
    dist: 'dist1',
  });

  t.true((await Promise.all([
    fs.exists(path.resolve(example, 'dist1/index.html')),
    fs.exists(path.resolve(example, 'dist1/index.css')),
    fs.exists(path.resolve(example, 'dist1/index.js')),
    fs.exists(path.resolve(example, 'dist1/media/logo.svg')),
    fs.exists(path.resolve(example, 'dist1/404.html')),
  ])).every((x) => x));
});


test('skipHtml option', async (t) => {
  const built = await index(example, {
    skipHtml: true,
    dist: 'dist2',
  });

  t.true((await Promise.all([
    fs.exists(path.resolve(example, 'dist2/index.css')),
    fs.exists(path.resolve(example, 'dist2/index.js')),
    fs.exists(path.resolve(example, 'dist2/media/logo.svg')),
    fs.exists(path.resolve(example, 'dist2/404.html')),
  ])).every((x) => x));
  
  t.false(await fs.exists(path.resolve(example, 'dist2/index.html')));
});
