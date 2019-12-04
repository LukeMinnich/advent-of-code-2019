module.exports = class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  taxiDistance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  static fromString(str) {
    let split = (str + '').split(',');
    return new Coordinate(parseInt(split[0]), parseInt(split[1]));
  }
  toString() {
    return `${this.x},${this.y}`;
  }
}
