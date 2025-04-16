test('module exists', () => {
  expect(require('./ship.js')).toBeDefined();
});

import { Ship } from './ship.js';

test('class exists', () => {
  expect(Ship).toBeDefined();
});

test('ship initialized with length', () => {
  expect(new Ship(3).length).toBe(3);
  expect(new Ship(4).length).toBe(4);
});

test('ship is sunk', () => {
  let ship = new Ship(3);

  expect(ship.isSunk()).toBe(false);

  ship.hit();

  expect(ship.isSunk()).toBe(false);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
