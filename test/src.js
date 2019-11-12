import path from 'path';
import test from 'ava';
import listFiles from '../src/list-files';
import parseMd from '../src/parse-md';
import pathToName from '../src/path-to-name';
import readDir from '../src/read-dir';
import readFile from '../src/read-file';


const contentPath = path.resolve(__dirname, './content');


test('listFiles', async (t) => {
  t.deepEqual(
    await listFiles(contentPath),
    [
      'post-1.md',
      'post-2.md',
      'post-3.md',
      'random',
      'something.txt',
    ].map((x) => path.resolve(contentPath, x)),
  );
  
  t.deepEqual(
    await listFiles(contentPath, 'md'),
    [
      'post-1.md',
      'post-2.md',
      'post-3.md',
    ].map((x) => path.resolve(contentPath, x)),
  );
  
  t.deepEqual(
    await listFiles(contentPath, ['md', 'txt']),
    [
      'post-1.md',
      'post-2.md',
      'post-3.md',
      'something.txt',
    ].map((x) => path.resolve(contentPath, x)),
  );
});


test('pathToName', (t) => {
  t.is(pathToName('/this/that/the-other-thing.js'), 'theOtherThing');
});


test('readDir', async (t) => {
  const mp = await readDir(contentPath, { md: parseMd });

  t.deepEqual(
    [...mp.keys()].sort(),
    ['post1', 'post2', 'post3'].sort(),
  );
});


test('readFile', async (t) => {
  t.is(
    await readFile(path.resolve(contentPath, './random')),
    '🐙\n',
  );
  t.is(
    await readFile(
      path.resolve(contentPath, './something.txt'),
      (str) => str.trim(),
    ),
    '🙈🙉🙊',
  );
});
