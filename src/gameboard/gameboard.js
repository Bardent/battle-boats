function getCoordinates(x, y, size, rotation) {
  let coordinates = [];
  let angle = 90 * rotation * (Math.PI / 180);

  for (let i = 0; i < size; i++) {
    coordinates[i] = [];

    let orignalX = x + i;
    let orignalY = y;

    let rotatedX =
      (orignalX - x) * Math.cos(angle) - (orignalY - y) * Math.sin(angle) + x;

    let rotatedY =
      (orignalX - x) * Math.sin(angle) + (orignalY - y) * Math.cos(angle) + y;

    coordinates[i].push(Math.round(rotatedX));
    coordinates[i].push(Math.round(rotatedY));
  }

  return coordinates;
}

class GameBoard {
  #board = [];

  #ships = [];

  #missedShots = [];

  get board() {
    return [...this.#board];
  }

  get ships() {
    return [...this.#ships];
  }

  get missedShots() {
    return [...this.#missedShots];
  }

  constructor(boardSize = 10) {
    this.#generateBoard(boardSize);
  }

  areAllShipsSunk() {
    for (let i = 0; i < this.#ships.length; i++) {
      const ship = this.#ships[i];

      if (!ship.isSunk()) return false;
    }

    return true;
  }

  isPositionValid(ship, x, y, rotation) {
    let shipCoordinates = getCoordinates(x, y, ship.length, rotation);

    for (let i = 0; i < shipCoordinates.length; i++) {
      let coordinate = shipCoordinates[i];
      if (!this.#isCoordinateValid(coordinate[0], coordinate[1])) return false;
    }

    return true;
  }

  addShip(ship, x, y, rotation) {
    this.#ships.push(ship);

    let shipCoordinates = getCoordinates(x, y, ship.length, rotation);

    for (let i = 0; i < shipCoordinates.length; i++) {
      let coordinate = shipCoordinates[i];

      let boardX = coordinate[0];
      let boardY = coordinate[1];

      this.#board[boardX][boardY] = ship;
    }
  }

  receiveAttack(x, y) {
    let ship = this.#board[x][y];

    if (ship != null) {
      ship.hit();
    } else {
      this.#missedShots.push([x, y]);
    }

    return ship != null;
  }

  #isCoordinateValid(x, y) {
    let size = this.#board.length;

    return x >= 0 && x < size && y >= 0 && y < size;
  }

  #generateBoard(size) {
    for (let x = 0; x < size; x++) {
      this.#board[x] = [];
      for (let y = 0; y < size; y++) {
        this.#board[x].push(null);
      }
    }
  }
}

export { GameBoard };
