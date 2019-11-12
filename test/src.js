import test from 'ava';
import pathToName from './src/path-to-name';


test('pathToName', (t) => {
  t.is(pathToName('/this/that/the-other-thing.js'), 'theOtherThing');
});
