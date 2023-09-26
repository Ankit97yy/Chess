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

  private isKingThreatened(
    x: number,
    y: number,
    piece_name_1: string,
    piece_name_2: string | null
  ): number {
    // console.log(x, y, piece_name_1, piece_name_2);
    let somePiece = Pieces_location[x][y];
    if (somePiece !== null && somePiece.getColor() === this.color) return 2;
    if (somePiece !== null && somePiece.getColor() !== this.color) {
      if (piece_name_2 === null) {
        if (somePiece.getName() === piece_name_1) return 1;
      } else {
        console.log(somePiece.getName(), "&&&");
        if (
          somePiece.getName() !== piece_name_1 &&
          somePiece.getName() !== piece_name_2
        )
          return 2;
        if (
          somePiece.getName() === piece_name_1 ||
          somePiece.getName() === piece_name_2
        )
          return 1;
      }
    }
    return 0;
  }

  isKingChecked(): boolean {
    let number_of_pieces_threatening = 0;
    if (this.x_loc <= 5 && this.y_loc - 1 >= 0) {
      if (
        this.isKingThreatened(
          this.x_loc + 2,
          this.y_loc - 1,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.x_loc <= 5 && this.y_loc + 1 <= 7) {
      if (
        this.isKingThreatened(
          this.x_loc + 2,
          this.y_loc + 1,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.x_loc >= 2 && this.y_loc - 1 >= 0) {
      if (
        this.isKingThreatened(
          this.x_loc - 2,
          this.y_loc - 1,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.x_loc >= 2 && this.y_loc + 1 <= 7) {
      if (
        this.isKingThreatened(
          this.x_loc - 2,
          this.y_loc + 1,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.y_loc <= 5 && this.x_loc - 1 >= 0) {
      if (
        this.isKingThreatened(
          this.x_loc - 1,
          this.y_loc + 2,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.y_loc <= 5 && this.x_loc + 1 <= 7) {
      if (
        this.isKingThreatened(
          this.x_loc + 1,
          this.y_loc + 2,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.y_loc >= 2 && this.x_loc - 1 >= 0) {
      if (
        this.isKingThreatened(
          this.x_loc - 1,
          this.y_loc - 2,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }
    if (this.y_loc >= 2 && this.x_loc + 1 <= 7) {
      if (
        this.isKingThreatened(
          this.x_loc + 1,
          this.y_loc - 2,
          "knight",
          null
        ) === 1
      )
        number_of_pieces_threatening++;
    }

    let x = 1;
    let y = 1;
    //positive x coloumn
    while (x + this.x_loc <= 7) {
      let result = this.isKingThreatened(
        x + this.x_loc,
        this.y_loc,
        "rook",
        "queen"
      );

      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (rook or queen) but some other piece;
        break;

      x++;
    }
    x = 1;
    y = 1;
    //positve y coloumn
    while (y + this.y_loc <= 7) {
      let result = this.isKingThreatened(
        this.x_loc,
        this.y_loc + y,
        "rook",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (rook or queen) but some other piece;
        break;

      y++;
    }
    x = 1;
    y = 1;
    //negative x coulmn
    while (this.x_loc - x >= 0) {
      let result = this.isKingThreatened(
        this.x_loc - x,
        this.y_loc,
        "rook",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (rook or queen) but some other piece;
        break;
      x++;
    }
    //negative y coloumn
    x = 1;
    y = 1;
    while (this.y_loc - y >= 0) {
      let result = this.isKingThreatened(
        this.x_loc,
        this.y_loc - y,
        "rook",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (rook or queen) but some other piece;
        break;
      y++;
    }
    //bishops or queens
    x = 1;
    y = 1;
    while (this.x_loc + x <= 7 && this.y_loc + y <= 7) {
      let result = this.isKingThreatened(
        this.x_loc + x,
        this.y_loc + y,
        "bishop",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (bishop or queen) but some other piece;
        break;
      x++;
      y++;
    }
    x = 1;
    y = 1;
    while (this.x_loc + x <= 7 && this.y_loc - y >= 0) {
      let result = this.isKingThreatened(
        this.x_loc + x,
        this.y_loc - y,
        "bishop",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (bishop or queen) but some other piece;
        break;
      x++;
      y++;
    }
    x = 1;
    y = 1;
    while (this.x_loc - x >= 0 && this.y_loc + y <= 7) {
      let result = this.isKingThreatened(
        this.x_loc - x,
        this.y_loc + y,
        "bishop",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (bishop or queen) but some other piece;
        break;
      x++;
      y++;
    }
    x = 1;
    y = 1;
    while (this.x_loc - x >= 0 && this.y_loc - y >= 0) {
      let result = this.isKingThreatened(
        this.x_loc - x,
        this.y_loc - y,
        "bishop",
        "queen"
      );
      if (result === 1) {
        number_of_pieces_threatening++;
        break;
      } else if (result === 2)
        // not (bishop or queen) but some other piece;
        break;
      x++;
      y++;
    }
    if (this.color === "w" && this.x_loc >= 2) {
      if (this.y_loc <= 6) {
        if (
          this.isKingThreatened(
            this.x_loc - 1,
            this.y_loc + 1,
            "pawn",
            null
          ) === 1
        )
          number_of_pieces_threatening++;
      }
      if (this.y_loc >= 1) {
        if (
          this.isKingThreatened(
            this.x_loc - 1,
            this.y_loc - 1,
            "pawn",
            null
          ) === 1
        )
          number_of_pieces_threatening++;
      }
    }
    if (this.color === "b" && this.x_loc <= 6) {
      if (this.y_loc <= 6) {
        if (
          this.isKingThreatened(
            this.x_loc + 1,
            this.y_loc + 1,
            "pawn",
            null
          ) === 1
        )
          number_of_pieces_threatening++;
      }
      if (this.y_loc >= 1) {
        if (
          this.isKingThreatened(
            this.x_loc + 1,
            this.y_loc - 1,
            "pawn",
            null
          ) === 1
        )
          number_of_pieces_threatening++;
      }
    }
    console.log("number", number_of_pieces_threatening);
    return number_of_pieces_threatening > 0;
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
      // (y_loc == this.y_loc && x_loc <= this.x_loc + 1 && x_loc > this.x_loc) || //!check this condition
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
    if (this.isObstructed(x_loc, y_loc)) console.log("pawn obstructd");
    this.x_loc = x_loc;
    this.y_loc = y_loc;
    if (this.isFirstMove) this.isFirstMove = false;
  }
  isObstructed(x_loc: number, y_loc: number): boolean {
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
      this.color === "w" &&
      x_loc === this.x_loc - 1 &&
      Math.abs(y_loc - this.y_loc) === 1
    ) {
      if (
        Pieces_location[x_loc][y_loc] !== null &&
        Pieces_location[x_loc][y_loc]?.getColor() !== this.color
      )
        return true;
      else return false;
    } else if (
      this.color === "b" &&
      x_loc === this.x_loc + 1 &&
      Math.abs(y_loc - this.y_loc) === 1
    ) {
      if (
        Pieces_location[x_loc][y_loc] !== null &&
        Pieces_location[x_loc][y_loc]?.getColor() !== this.color
      )
        return true;
      else return false;
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

export let blackKing: King;
export let whiteKing: King;

console.log("create board");

let fen_string = "8/7p/4pkp1/8/4PKP1/8/7P/8";
let fen_string_len = fen_string.length;
let i = 0,
  j = 0,
  index = 0;
Pieces_location.push([]);
while (fen_string_len >= index) {
  // console.log(i, j);
  if (fen_string.charAt(index) === "r") {
    Pieces_location[i][j] = new Rook("b", i, j++, "rook");
  } else if (fen_string.charAt(index) === "n") {
    Pieces_location[i][j] = new Knight("b", i, j++, "knight");
  } else if (fen_string.charAt(index) === "b") {
    Pieces_location[i][j] = new Bishop("b", i, j++, "bishop");
  } else if (fen_string.charAt(index) === "q") {
    Pieces_location[i][j] = new Queen("b", i, j++, "queen");
  } else if (fen_string.charAt(index) === "k") {
    Pieces_location[i][j] = new King("b", i, j, "king");
    blackKing = Pieces_location[i][j++];
  } else if (fen_string.charAt(index) === "b") {
    Pieces_location[i][j] = new Bishop("b", i, j++, "bishop");
  } else if (fen_string.charAt(index) === "n") {
    Pieces_location[i][j] = new Knight("b", i, j++, "knight");
  } else if (fen_string.charAt(index) === "r") {
    Pieces_location[i][j] = new Rook("b", i, j++, "rook");
  } else if (fen_string.charAt(index) === "p") {
    Pieces_location[i][j] = new Pawn("b", i, j++, "pawn");
  } else if (fen_string.charAt(index) === "P") {
    Pieces_location[i][j] = new Pawn("w", i, j++, "pawn");
  } else if (fen_string.charAt(index) === "/") {
    Pieces_location.push([]);
    i++;
    j = 0;
  } else if (
    fen_string.charAt(index) >= "1" &&
    fen_string.charAt(index) <= "8"
  ) {
    for (let count = 0; count < Number(fen_string.charAt(index)); count++) {
      Pieces_location[i][j++] = null;
    }
  } else if (fen_string.charAt(index) === "R") {
    Pieces_location[i][j] = new Rook("w", i, j++, "rook");
  } else if (fen_string.charAt(index) === "N") {
    Pieces_location[i][j] = new Knight("w", i, j++, "knight");
  } else if (fen_string.charAt(index) === "B") {
    Pieces_location[i][j] = new Bishop("w", i, j++, "bishop");
  } else if (fen_string.charAt(index) === "Q") {
    Pieces_location[i][j] = new Queen("w", i, j++, "queen");
  } else if (fen_string.charAt(index) === "K") {
    Pieces_location[i][j] = new King("w", i, j, "king");
    whiteKing = Pieces_location[i][j++];
  } else if (fen_string.charAt(index) === "B") {
    Pieces_location[i][j] = new Bishop("w", i, j++, "bishop");
  } else if (fen_string.charAt(index) === "K") {
    Pieces_location[i][j] = new Queen("w", i, j++, "knight");
  } else if (fen_string.charAt(index) === "R") {
    Pieces_location[i][j] = new Rook("w", i, j++, "rook");
  }
  index++;
}

// for (let i = 0; i < 8; i++) {
//   Pieces_location.push([]);
//   for (let j = 0; j < 8; j++) {
//     if (i === 6) {
//       Pieces_location[i][j] = new Pawn("w", i, j, "pawn");
//     } else if (i === 7) {
//       switch (j) {
//         case 0:
//           Pieces_location[i][j] = new Rook("w", i, j, "rook");

//           break;
//         case 1:
//           Pieces_location[i][j] = new Knight("w", i, j, "knight");

//           break;
//         case 2:
//           Pieces_location[i][j] = new Bishop("w", i, j, "bishop");

//           break;
//         case 3:
//           Pieces_location[i][j] = new Queen("w", i, j, "queen");

//           break;
//         case 4:
//           Pieces_location[i][j] = new King("w", i, j, "king");
//           whiteKing = Pieces_location[i][j];

//           break;
//         case 5:
//           Pieces_location[i][j] = new Bishop("w", i, j, "bishop");

//           break;
//         case 6:
//           Pieces_location[i][j] = new Knight("w", i, j, "knight");

//           break;
//         case 7:
//           Pieces_location[i][j] = new Rook("w", i, j, "rook");

//           break;

//         default:
//           break;
//       }
//     } else if (i === 1) {
//       Pieces_location[i][j] = new Pawn("b", i, j, "pawn");
//     } else if (i === 0) {
//       switch (j) {
//         case 0:
//           Pieces_location[i][j] = new Rook("b", i, j, "rook");

//           break;
//         case 1:
//           Pieces_location[i][j] = new Knight("b", i, j, "knight");

//           break;
//         case 2:
//           Pieces_location[i][j] = new Bishop("b", i, j, "bishop");

//           break;
//         case 3:
//           Pieces_location[i][j] = new Queen("b", i, j, "queen");
//           break;
//         case 4:
//           Pieces_location[i][j] = new King("b", i, j, "king");
//           blackKing = Pieces_location[i][j];
//           break;
//         case 5:
//           Pieces_location[i][j] = new Bishop("b", i, j, "bishop");
//           break;
//         case 6:
//           Pieces_location[i][j] = new Knight("b", i, j, "knight");
//           break;
//         case 7:
//           Pieces_location[i][j] = new Rook("b", i, j, "rook");

//           break;

//         default:
//           break;
//       }
//     } else Pieces_location[i][j] = null;
//   }
// }

export default Pieces_location;
