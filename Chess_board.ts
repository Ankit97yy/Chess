import { Bishop, King, Knight, Rook, Queen, Pawn } from "./Pieces";
import { PIECE } from "./Types";

export class Board {
  squares: PIECE[][] = [];
  blackKing: King;
  whiteKing: King;
  constructor() {
    this.createBoard();
  }

  createBoard() {
    let fen_string = "rnb1kbnr/pppppqpp/8/8/8/2NP1p2/PPP1P1PP/R1BQKBNR";
    let fen_string_len = fen_string.length; //
    let i = 0;
    let j = 0;
    let index = 0;
    this.squares.push([]);
    while (fen_string_len >= index) {
      // console.log(i, j)
      if (fen_string.charAt(index) === "r") {
        this.squares[i][j] = new Rook("b", i, j++, "rook");
      } else if (fen_string.charAt(index) === "n") {
        this.squares[i][j] = new Knight("b", i, j++, "knight");
      } else if (fen_string.charAt(index) === "b") {
        this.squares[i][j] = new Bishop("b", i, j++, "bishop");
      } else if (fen_string.charAt(index) === "q") {
        this.squares[i][j] = new Queen("b", i, j++, "queen");
      } else if (fen_string.charAt(index) === "k") {
        this.blackKing = new King("b", i, j, "king");
        this.squares[i][j++] = this.blackKing;
      } else if (fen_string.charAt(index) === "b") {
        this.squares[i][j] = new Bishop("b", i, j++, "bishop");
      } else if (fen_string.charAt(index) === "n") {
        this.squares[i][j] = new Knight("b", i, j++, "knight");
      } else if (fen_string.charAt(index) === "r") {
        this.squares[i][j] = new Rook("b", i, j++, "rook");
      } else if (fen_string.charAt(index) === "p") {
        this.squares[i][j] = new Pawn("b", i, j++, "pawn");
      } else if (fen_string.charAt(index) === "P") {
        this.squares[i][j] = new Pawn("w", i, j++, "pawn");
      } else if (fen_string.charAt(index) === "/") {
        this.squares.push([]);
        i++;
        j = 0;
      } else if (
        fen_string.charAt(index) >= "1" &&
        fen_string.charAt(index) <= "8"
      ) {
        for (let count = 0; count < Number(fen_string.charAt(index)); count++) {
          this.squares[i][j++] = null;
        }
      } else if (fen_string.charAt(index) === "R") {
        this.squares[i][j] = new Rook("w", i, j++, "rook");
      } else if (fen_string.charAt(index) === "N") {
        this.squares[i][j] = new Knight("w", i, j++, "knight");
      } else if (fen_string.charAt(index) === "B") {
        this.squares[i][j] = new Bishop("w", i, j++, "bishop");
      } else if (fen_string.charAt(index) === "Q") {
        this.squares[i][j] = new Queen("w", i, j++, "queen");
      } else if (fen_string.charAt(index) === "K") {
        this.whiteKing = new King("w", i, j, "king");
        this.squares[i][j++] = this.whiteKing;
      } else if (fen_string.charAt(index) === "B") {
        this.squares[i][j] = new Bishop("w", i, j++, "bishop");
      } else if (fen_string.charAt(index) === "K") {
        this.squares[i][j] = new Queen("w", i, j++, "knight");
      } else if (fen_string.charAt(index) === "R") {
        this.squares[i][j] = new Rook("w", i, j++, "rook");
      }
      index++;
    }
  }

  getPieceFromBoard(x: number, y: number) {
    return this.squares[x][y];
  }

  setPieceinBoard(x: number, y: number, piece: PIECE) {
    this.squares[x][y] = piece;
  }
}
