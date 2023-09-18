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
}

export class King extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
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

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (
      Math.abs(y_loc - this.y_loc) === 2 &&
      Math.abs(x_loc - this.x_loc) === 1
    ) {
      return true;
    } else return false;
  }
}

export class Bishop extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (Math.abs(x_loc - this.x_loc) === Math.abs(y_loc - this.y_loc)) {
      return true;
    } else return false;
  }
}

export class Queen extends Piece {
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
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
  constructor(color: string, x: number, y: number, name: string) {
    super(color, x, y, name);
  }
  moveTo(x_loc: number, y_loc: number): void {
    this.x_loc = x_loc;
    this.y_loc = y_loc;
  }

  isValidMove(x_loc: number, y_loc: number): boolean {
    if (y_loc === this.y_loc && x_loc == this.x_loc + 1) {
      return true;
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
}
