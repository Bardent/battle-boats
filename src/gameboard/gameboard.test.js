import { GameBoard } from './gameboard';
import { Ship } from '../ship/ship';

describe('Gameboard', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new GameBoard(4);
    ship = new Ship(3);
  });

  it('is defined', () => {
    expect(gameboard).toBeDefined();
  });

  it('returns if ship position is valid or not', () => {
    let isValid = gameboard.isPositionValid(ship, 0, 0, 2);
    expect(isValid).toBe(false);

    isValid = gameboard.isPositionValid(ship, 0, 0, 1);
    expect(isValid).toBe(true);

    isValid = gameboard.isPositionValid(ship, 0, 0, 3);
    expect(isValid).toBe(false);

    isValid = gameboard.isPositionValid(ship, 0, 0, 0);
    expect(isValid).toBe(true);
  });

  it('can add a ship', () => {
    expect(gameboard.ships.length).toBe(0);

    expect(gameboard.board).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    gameboard.addShip(ship, 0, 0, 0);

    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.board).toEqual([
      [ship, null, null, null],
      [ship, null, null, null],
      [ship, null, null, null],
      [null, null, null, null],
    ]);
  });

  it('can add a rotated ship', () => {
    gameboard.addShip(ship, 0, 0, 1);

    expect(gameboard.board).toEqual([
      [ship, ship, ship, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });

  it('can hit a ship', () => {
    gameboard.addShip(ship, 0, 0, 0);

    let hit = gameboard.receiveAttack(0, 0);

    expect(hit).toBe(true);

    hit = gameboard.receiveAttack(0, 1);

    expect(hit).toBe(false);
  });

  it('can sink ship', () => {
    gameboard.addShip(ship, 0, 0, 0);

    gameboard.receiveAttack(0, 0);

    expect(ship.isSunk()).toBe(false);

    gameboard.receiveAttack(1, 0);

    expect(ship.isSunk()).toBe(false);

    gameboard.receiveAttack(2, 0);

    expect(ship.isSunk()).toBe(true);
  });

  it('tracks missed shots', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedShots).toEqual([[0, 0]]);

    gameboard.receiveAttack(0, 1);
    expect(gameboard.missedShots).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });

  it('can report if all ships are sunk', () => {
    gameboard.addShip(ship, 0, 0, 0);

    expect(gameboard.areAllShipsSunk()).toBe(false);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
