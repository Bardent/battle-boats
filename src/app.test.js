import { someFunction } from './app';

test('test test', () => {
  expect(someFunction(1, 2)).toBe(3);
  expect(someFunction(2, 5)).toBe(7);
  expect(someFunction(2, 6)).toBe(8);
});
