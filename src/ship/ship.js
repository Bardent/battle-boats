class Ship {
  #length = 0;
  #hits = 0;

  constructor(length) {
    this.#length = length;
  }

  get length() {
    return this.#length;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits >= this.#length;
  }
}

export { Ship };
