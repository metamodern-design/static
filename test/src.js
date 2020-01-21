import path from 'path';
import test from 'ava';
import listFiles from '../src/list-files';
import minifyHtml from '../src/minify-html';
import pathExt from '../src/path-ext';
import pathCamelize from '../src/path-camelize';
import readDir from '../src/read-dir';
import readFile from '../src/read-file';
import renderJstl from '../src/render-jstl';
import renderMd from '../src/render-md';
import renderPug from '../src/render-pug';


const contentPath = path.resolve(__dirname, './fixtures/content');
const templatePath = path.resolve(__dirname, './fixtures/templates');


test('pathExt', (t) => {
  t.is(
    pathExt('/this/that/the-other-thing.js'),
    'js',
  );
  t.is(
    pathExt(['/this/that/', 'the-other-thing.js']),
    'js',
  );
});


test('pathCamelize', (t) => {
  t.is(
    pathCamelize('/this/that/the-other-thing.js'),
    'theOtherThing',
  );
  t.is(
    pathCamelize('/this/that/the-other-thing.js', 1),
    'thatTheOtherThing',
  );
  t.is(
    pathCamelize('/this/that/the-other-thing.js', 2),
    'thisThatTheOtherThing',
  );
  t.is(
    pathCamelize('/this/that/the-other-thing.js', 10),
    'thisThatTheOtherThing',
  );
  t.is(
    pathCamelize(['/this/that/', 'the-other-thing.js'], 10),
    'thisThatTheOtherThing',
  );
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
    await listFiles(contentPath, { extensions: 'md' }),
    [
      'post-1.md',
      'post-2.md',
      'post-3.md',
    ].map((x) => path.resolve(contentPath, x)),
  );

  t.deepEqual(
    await listFiles(contentPath, { extensions: ['md', 'txt'] }),
    [
      'post-1.md',
      'post-2.md',
      'post-3.md',
      'something.txt',
    ].map((x) => path.resolve(contentPath, x)),
  );

  t.deepEqual(
    await listFiles(contentPath, { extensions: 'txt', recursive: true }),
    [
      'something.txt',
      'somedir/happy.txt',
    ].map((x) => path.resolve(contentPath, x)),
  );

  t.deepEqual(
    await listFiles(
      contentPath,
      { extensions: 'txt', recursive: true, relative: true },
    ),
    [
      'something.txt',
      'somedir/happy.txt',
    ],
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
    { md: renderMd },
  );

  t.deepEqual(
    [...mdOnly.keys()].sort(),
    ['post1', 'post2', 'post3'].sort(),
  );

  const mdTxt = await readDir(
    contentPath,
    { md: renderMd, txt: (s) => s },
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


const minifiedHtml = readFile([templatePath, 'minified/index.html']);
const locals = {
  greeting: { name: 'World', emoji: '🐣' },
  divClasses: ['box', 'rounded'],
  pClasses: ['text-bold', 'text-lg'],
};

test('minifyHtml', async (t) => {
  const result = await readFile([templatePath, 'html/index.html'], minifyHtml);

  t.is(`${result}\n`, await minifiedHtml);
});


test('renderJstl', async (t) => {
  const result = await readFile([templatePath, 'jstl/index.jstl'], renderJstl(locals));

  t.is(`${result}\n`, await minifiedHtml);
});


test('renderPug', async (t) => {
  const result = await readFile([templatePath, 'pug/index.pug'], renderPug(locals));

  t.is(`${result}\n`, await minifiedHtml);
});
