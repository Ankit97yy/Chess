type MoveParams = {
  x_loc: number;
  y_loc: number;
};
type PieceParams = {
  color: string;
  x: number;
  y: number;
  name: string;
};

export class Piece {
  protected color: string;
  protected x_loc: number;
  protected y_loc: number;
  protected name: string;
  protected alive: boolean;

  constructor(color: string, x: number, y: number, name: string) {
    this.color = color;
    this.x_loc = x;
    this.y_loc = y;
    this.name = name;
    this.alive = true;
  }

  moveTo(x_loc: number, y_loc: number) {
    console.log("something moved");
    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }

  getLocation(): number[] {
    return [this.x_loc, this.y_loc];
  }

  getColor(): string {
    return this.color;
  }
  getName(): string {
    return this.name;
  }

  isObstructed(x_loc: number, y_loc: number): boolean {
    let x = this.x_loc;
    let y = this.y_loc;
    while (x !== x_loc || y !== y_loc) {
      if (x > x_loc) x--;
      else if (x < x_loc) x++;
      if (y > y_loc) y--;
      else if (y < y_loc) y++;
      if (x == x_loc && y == y_loc) {
        if (Pieces_location[x][y]?.getColor() === this.color) return true;
        else return false;
      }
      if (Pieces_location[x][y] !== null) return true;
    }
    return false;
  }
}

export class King extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }
  moveTo(x_loc: number, y_loc: number): void {
    console.log("king moved");
    if (this.isObstructed(x_loc, y_loc)) console.log("obstructed");

    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }
  isValidMove(x_loc: number, y_loc: number): boolean {
    if (x_loc - this.x_loc == 0 && y_loc - this.y_loc == 0) return false;
    if (Math.abs(x_loc - this.x_loc) > 1 || Math.abs(y_loc - this.y_loc) > 1)
      return false;
    else {
      return true;
    }
  }
}

export class Knight extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }
  moveTo(x_loc: number, y_loc: number): void {
    if (this.isObstructed(x_loc, y_loc)) console.log("knight obstructed");
    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (
      (Math.abs(y_loc - this.y_loc) === 2 &&
        Math.abs(x_loc - this.x_loc) === 1) ||
      (Math.abs(this.x_loc - x_loc) === 2 && Math.abs(this.y_loc - y_loc) === 1)
    ) {
      return true;
    } else return false;
  }

  isObstructed(x_loc: number, y_loc: number): boolean {
    let somePiece = Pieces_location[x_loc][y_loc];
    if (somePiece !== null && somePiece.getColor() === this.color) return true;
    else return false;
  }
}

export class Bishop extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }

  moveTo(x_loc: number, y_loc: number): void {
    console.log("bishop moved");
    if (this.isObstructed(x_loc, y_loc)) console.log("obstructed");

    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (
      Math.abs(x_loc - this.x_loc) === Math.abs(y_loc - this.y_loc) &&
      x_loc !== this.x_loc
    ) {
      return true;
    } else return false;
  }
}

export class Queen extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }
  moveTo(x_loc: number, y_loc: number): void {
    if (this.isObstructed(x_loc, y_loc)) console.log("queen obstructed");

    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (
      Math.abs(x_loc - this.x_loc) === Math.abs(y_loc - this.y_loc) ||
      (y_loc == this.y_loc && x_loc <= this.x_loc + 1 && x_loc > this.x_loc) ||
      (x_loc == this.x_loc && y_loc != this.y_loc) ||
      (x_loc != this.x_loc && y_loc == this.y_loc)
    ) {
      return true;
    } else return false;
  }
}

export class Pawn extends Piece {
  private isFirstMove: boolean = true;
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }
  moveTo(x_loc: number, y_loc: number): void {
    if (this.isObstructed(x_loc, y_loc)) console.log("pawn obstructed");
    this.x_loc = x_loc;
    this.y_loc = y_loc;
    if (this.isFirstMove) this.isFirstMove = false;
  }
  isObstructed(x_loc: number, y_loc: number): boolean {
    console.log("hik");
    if (this.y_loc === y_loc) {
      if (this.color === "b") {
        let x = this.x_loc + 1;
        while (x <= x_loc) {
          if (Pieces_location[x++][y_loc] !== null) return true;
        }
      } else {
        let x = this.x_loc - 1;
        while (x >= x_loc) {
          if (Pieces_location[x--][y_loc] !== null) return true;
        }
      }
    }
    return false;
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (y_loc === this.y_loc) {
      if (
        this.color === "w" &&
        (x_loc === this.x_loc - 1 ||
          (this.isFirstMove && x_loc === this.x_loc - 2))
      )
        return true;
      else if (
        this.color === "b" &&
        (x_loc === this.x_loc + 1 ||
          (this.isFirstMove && x_loc === this.x_loc + 2))
      )
        return true;
      else return false;
    } else if (
      Math.abs(x_loc - this.x_loc) === 1 &&
      Math.abs(y_loc - this.y_loc) === 1 &&
      Pieces_location[x_loc][y_loc] !== null
    ) {
      let x = this.color === "w" ? this.x_loc - 1 : this.x_loc + 1;
      if (Pieces_location[x][this.y_loc - 1]?.getColor() !== this.color)
        return true;
      if (Pieces_location[x][this.y_loc + 1]?.getColor() !== this.color)
        return true;
      return false;
    } else return false;
  }
}

export class Rook extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (
      (x_loc === this.x_loc && y_loc !== this.y_loc) ||
      (x_loc !== this.x_loc && y_loc === this.y_loc)
    ) {
      return true;
    } else return false;
  }

  moveTo(x_loc: number, y_loc: number): void {
    console.log("rook moved");
    if (this.isObstructed(x_loc, y_loc)) console.log("obstructed");

    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }
}

var Pieces_location: (Bishop | King | Knight | Pawn | Queen | Rook | null)[][] =
  [];

console.log("create board");
for (let i = 0; i < 8; i++) {
  Pieces_location.push([]);
  for (let j = 0; j < 8; j++) {
    if (i === 6) {
      Pieces_location[i][j] = new Pawn("w", i, j, "pawn");
    } else if (i === 7) {
      switch (j) {
        case 0:
          Pieces_location[i][j] = new Rook("w", i, j, "rook");

          break;
        case 1:
          Pieces_location[i][j] = new Knight("w", i, j, "knight");

          break;
        case 2:
          Pieces_location[i][j] = new Bishop("w", i, j, "bishop");

          break;
        case 3:
          Pieces_location[i][j] = new Queen("w", i, j, "queen");

          break;
        case 4:
          Pieces_location[i][j] = new King("w", i, j, "king");

          break;
        case 5:
          Pieces_location[i][j] = new Bishop("w", i, j, "bishop");

          break;
        case 6:
          Pieces_location[i][j] = new Knight("w", i, j, "knight");

          break;
        case 7:
          Pieces_location[i][j] = new Rook("w", i, j, "rook");

          break;

        default:
          break;
      }
    } else if (i === 1) {
      Pieces_location[i][j] = new Pawn("b", i, j, "pawn");
    } else if (i === 0) {
      switch (j) {
        case 0:
          Pieces_location[i][j] = new Rook("b", i, j, "rook");

          break;
        case 1:
          Pieces_location[i][j] = new Knight("b", i, j, "knight");

          break;
        case 2:
          Pieces_location[i][j] = new Bishop("b", i, j, "bishop");

          break;
        case 3:
          Pieces_location[i][j] = new Queen("b", i, j, "queen");
          break;
        case 4:
          Pieces_location[i][j] = new King("b", i, j, "king");
          break;
          break;
        case 5:
          Pieces_location[i][j] = new Bishop("b", i, j, "bishop");
          break;
        case 6:
          Pieces_location[i][j] = new Knight("b", i, j, "knight");
          break;
        case 7:
          Pieces_location[i][j] = new Rook("b", i, j, "rook");

          break;

        default:
          break;
      }
    } else Pieces_location[i][j] = null;
  }
}

export default Pieces_location;
