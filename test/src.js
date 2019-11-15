import path from 'path';
import test from 'ava';
import listFiles from '../src/list-files';
import minifyHtml from '../src/minify-html';
import parseMd from '../src/parse-md';
import pathToName from '../src/path-to-name';
import readDir from '../src/read-dir';
import readFile from '../src/read-file';
import renderJstl from '../src/render-jstl';
import renderPug from '../src/render-pug';


const contentPath = path.resolve(__dirname, './fixtures/content');
const templatePath = path.resolve(__dirname, './fixtures/templates');


test('pathToName', (t) => {
  t.is(pathToName('/this/that/the-other-thing.js'), 'theOtherThing');
});


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


test('readDir', async (t) => {
  const mdOnly = await readDir(
    contentPath,
    { md: parseMd },
  );

  t.deepEqual(
    [...mdOnly.keys()].sort(),
    ['post1', 'post2', 'post3'].sort(),
  );
  
  const mdTxt = await readDir(
    contentPath,
    { md: parseMd, txt: (s) => s },
  );

  t.deepEqual(
    [...mdTxt.keys()].sort(),
    ['post1', 'post2', 'post3', 'something'].sort(),
  );
  
  const noParsers = await readDir(contentPath);
  
  t.deepEqual(
    [...noParsers.keys()].sort(),
    ['post1', 'post2', 'post3', 'random', 'something'].sort(),
  );
  
  const allFiles = await readDir(
    contentPath,
    { txt: (s) => s },
    { readAllFiles: true },
  );
  
  t.deepEqual(
    [...allFiles.keys()].sort(),
    ['post1', 'post2', 'post3', 'random', 'something'].sort(),
  );
});


test('minifyHtml', async (t) => {
  const result = await minifyHtml(path.resolve(templatePath, 'html/index.html'));
  const expected = await readFile(path.resolve(templatePath, 'minified/index.html'));
  
  t.is(`${result}\n`, expected);
});
