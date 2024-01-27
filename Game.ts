import { Board } from "./Chess_board";
import { King } from "./Pieces";
import { Player } from "./Players";
import { PIECE } from "./Types";

export class Game {
  protected player_1: Player;
  protected player_2: Player;
  protected current_turn: Player;
  protected Board: Board;
  protected active_piece: PIECE = null;
  game_over = false;
  constructor() {
    this.Board = new Board();
    this.player_1 = new Player("Ankit", true, this.Board.whiteKing);
    this.player_2 = new Player("Someone", false, this.Board.blackKing);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.Board.getPieceFromBoard(i, j)?.getColor() === "w")
          this.player_1.setPlayersAllPieces(this.Board.getPieceFromBoard(i, j));
        else if (this.Board.getPieceFromBoard(i, j)?.getColor() === "b")
          this.player_2.setPlayersAllPieces(this.Board.getPieceFromBoard(i, j));
      }
    }
    this.current_turn = this.player_1;
  }

  handleMove(x: number, y: number) {
    if (this.game_over) return;
    if (this.active_piece === null) return;
    if (
      this.current_turn.isPlayerWhite() !==
      (this.active_piece?.getColor() === "w")
    )
      return;
    if (this.canMoveTo(this.active_piece, x, y, this.current_turn.getKing())) {
      console.log(this.Board.getEnpassantColor());
      if (
        this.current_turn.isPlayerWhite() !==
        (this.Board.getEnpassantColor() === "w")
      ) {
        this.Board.cancelPassant();
      }
      this.current_turn.movePiece(this.active_piece, x, y, this.Board);
      this.checkForCheckmate();
      this.isGameOver() ? console.log("game over") : null; //!! checkForCheckmate is being called twice
      this.changeTurn();
    }

    console.log(this.Board.getEnpassantColor());
    this.active_piece = null;
  }

  setActivePiece(x: number, y: number) {
    if (this.game_over) return;
    let somePiece = this.Board.getPieceFromBoard(x, y);
    if ((somePiece?.getColor() === "w") !== this.current_turn.isPlayerWhite())
      return;
    if (somePiece !== null) this.active_piece = somePiece;
  }

  getPiece(x: number, y: number) {
    return this.Board.getPieceFromBoard(x, y);
  }

  getActivePiece() {
    return this.active_piece;
  }

  getCurrentTurn() {
    return this.current_turn;
  }

  isGameOver(): boolean {
    let res = this.checkForCheckmate();
    this.game_over = res;
    return res;
  }

  checkForCheckmate(): boolean {
    if (this.current_turn === this.player_1) {
      let attacking_pieces_pos = this.player_2
        .getKing()
        .isKingChecked(this.Board);
      if (attacking_pieces_pos.length > 0) {
        console.log(this.player_2.getPlayerName(), "check");
        let checkmate = this.lookForCheckMate(
          this.player_2,
          attacking_pieces_pos[0].x_pos,
          attacking_pieces_pos[0].y_pos
        );
        console.log(
          "🚀 ~ file: Game.ts:85 ~ Game ~ lookforCheck ~ checkmate:",
          checkmate
        );
        return checkmate;
      } else return false;
    } else {
      let attacking_pieces_pos = this.player_1
        .getKing()
        .isKingChecked(this.Board);
      if (attacking_pieces_pos.length > 0) {
        console.log(this.player_1.getPlayerName(), "check");
        let checkmate = this.lookForCheckMate(
          this.player_1,
          attacking_pieces_pos[0].x_pos,
          attacking_pieces_pos[0].y_pos
        );
        console.log(
          "🚀 ~ file: Game.ts:97 ~ Game ~ lookforCheck ~ checkmate:",
          checkmate
        );
        return checkmate;
      } else return false;
    }
  }

  lookForCheckMate(
    player: Player,
    attacking_piece_pos_x: number,
    attacking_piece_pos_y: number
  ): boolean {
    for (let i = 0; i < player.getPlayersAllPieces().length; i++) {
      let some_piece = player.getPlayersAllPieces()[i];
      if (!some_piece?.isAlive()) continue;
      if (
        this.canMoveTo(
          some_piece,
          attacking_piece_pos_x,
          attacking_piece_pos_y,
          player.getKing()
        )
      )
        return false;
    }

    console.log("@@@@@@@");

    let king = player.getKing();
    let king_x_pos = king.getLocation()[0];
    let king_y_pos = king.getLocation()[1];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.canMoveTo(king, king_x_pos + i, king_y_pos + j, king))
          return false;
      }
    }

    console.log("%%%%%%%%");

    let a1: number, b1: number, c1: number;
    let a2: number, b2: number, c2: number;
    if (king_x_pos - attacking_piece_pos_x === 0) {
      (a1 = 1), (b1 = 0), (c1 = attacking_piece_pos_x);
    } else {
      let slope =
        (king_y_pos - attacking_piece_pos_y) /
        (king_x_pos - attacking_piece_pos_x);
      (a1 = -1 * slope), (b1 = 1), (c1 = king_y_pos - slope * king_x_pos);
    }
    let eq1 = [a1, b1, c1];
    for (let i = 0; i < player.getPlayersAllPieces().length; i++) {
      let some_piece = player.getPlayersAllPieces()[i];
      if (!some_piece?.isAlive()) continue;
      if (some_piece?.getName() === "pawn") {
        //
        (a2 = 0), (b2 = 1), (c2 = some_piece.getLocation()[1]);
        let intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        }
      } else if (some_piece?.getName() === "bishop") {
        (a2 = 1),
          (b2 = 1),
          (c2 = some_piece.getLocation()[1] + some_piece.getLocation()[0]);
        let intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        )
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        (a2 = -1),
          (b2 = 1),
          (c2 = some_piece.getLocation()[1] - some_piece.getLocation()[0]);
        intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        )
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
      } else if (some_piece?.getName() === "queen") {
        (a2 = 1),
          (b2 = 1),
          (c2 = some_piece.getLocation()[1] + some_piece.getLocation()[0]);
        let intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        )
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        (a2 = -1),
          (b2 = 1),
          (c2 = some_piece.getLocation()[1] - some_piece.getLocation()[0]);
        intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        )
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        (a2 = 0), (b2 = 1), (c2 = some_piece.getLocation()[1]);
        intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        }
        (a2 = 1), (b2 = 0), (c2 = some_piece.getLocation()[0]);
        intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        }
      } else if (some_piece?.getName() === "rook") {
        (a2 = 0), (b2 = 1), (c2 = some_piece.getLocation()[1]);
        let intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        }
        (a2 = 1), (b2 = 0), (c2 = some_piece.getLocation()[0]);
        intersection = this.findIntersecation(eq1, [a2, b2, c2]);
        if (
          this.isIntersectionLiesBetween(
            intersection,
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (
            this.canMoveTo(
              some_piece,
              intersection[0],
              intersection[1],
              player.getKing()
            )
          )
            return false;
        }
      } else if (some_piece?.getName() === "knight") {
        let x = some_piece.getLocation()[0] - 2;
        let y = some_piece.getLocation()[1] + 1;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] - 2;
        y = some_piece.getLocation()[1] - 1;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] + 2;
        y = some_piece.getLocation()[1] - 1;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] + 2;
        y = some_piece.getLocation()[1] + 1;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] + 1;
        y = some_piece.getLocation()[1] + 2;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] - 1;
        y = some_piece.getLocation()[1] + 2;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] + 1;
        y = some_piece.getLocation()[1] - 2;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
        x = some_piece.getLocation()[0] - 1;
        y = some_piece.getLocation()[1] - 2;
        if (
          this.isIntersectionLiesBetween(
            [x, y],
            king_x_pos,
            attacking_piece_pos_x,
            king_y_pos,
            attacking_piece_pos_y
          )
        ) {
          if (this.canMoveTo(some_piece, x, y, player.getKing())) {
            return false;
          }
        }
      }
    }
    console.log("basanti");
    return true;
  }

  isIntersectionLiesBetween(
    intersection_coordinate: number[],
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ): boolean {
    console.log(intersection_coordinate, x1, y1, x2, y2);
    if (
      intersection_coordinate[0] >= Math.min(x1, x2) &&
      intersection_coordinate[0] <= Math.max(x1, x2) &&
      intersection_coordinate[1] >= Math.min(y1, y2) &&
      intersection_coordinate[1] <= Math.max(y1, y2) &&
      Number.isInteger(intersection_coordinate[0]) &&
      Number.isInteger(intersection_coordinate[1])
    )
      return true;
    return false;
  }

  canMoveTo(some_piece: PIECE, x1: number, y1: number, king: King) {
    if (
      some_piece?.isValidMove(x1, y1) &&
      !some_piece.isObstructed(x1, y1, this.Board) &&
      !some_piece.isPinned(this.Board, king, x1, y1)
    ) {
      return true;
    } else return false;
  }

  findIntersecation(eq1: number[], eq2: number[]): number[] {
    let [a1, b1, c1] = eq1;
    let [a2, b2, c2] = eq2;
    let determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
      return [-1, 5]; //"No unique solution. Equations are parallel or coincident.";
    }

    // Calculate the solution
    let x = (c1 * b2 - c2 * b1) / determinant;
    let y = (a1 * c2 - a2 * c1) / determinant;
    // console.log(x, y, "****");
    return [x, y];
  }

  changeTurn() {
    this.current_turn === this.player_1
      ? (this.current_turn = this.player_2)
      : (this.current_turn = this.player_1);
  }
}
