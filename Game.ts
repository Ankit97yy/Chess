import { Board } from "./Chess_board";
import { Player } from "./Players";
import { PIECE } from "./Types";

export class Game {
  protected player_1: Player;
  protected player_2: Player;
  protected current_turn: Player;
  protected Board: Board;
  protected active_piece: PIECE = null;
  constructor() {
    this.Board = new Board();
    this.player_1 = new Player("Ankit", true, this.Board.whiteKing);
    this.player_2 = new Player("Someone", false, this.Board.blackKing);
    this.current_turn = this.player_1;
  }

  makeMove(x: number, y: number) {
    if (this.active_piece === null) return;
    if (
      this.current_turn.isPlayerWhite() !==
      (this.active_piece?.getColor() === "w")
    )
      return;
    if (
      this.active_piece.isValidMove(x, y) &&
      !this.active_piece.isObstructed(x, y, this.Board)
    ) {
      let prev_loc_of_x_and_y: number[] = this.active_piece.getLocation();
      let prev_x_loc = prev_loc_of_x_and_y[0];
      let prev_y_loc = prev_loc_of_x_and_y[1];
      this.Board.setPieceinBoard(prev_x_loc, prev_y_loc, null);
      this.active_piece.moveTo(x, y);
      this.Board.setPieceinBoard(x, y, this.active_piece);
      this.lookforCheck();
      this.changeTurn();
    }
    this.active_piece = null;
  }
  setActivePiece(x: number, y: number) {
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

  lookforCheck() {
    if (this.current_turn === this.player_1) {
      this.player_2.getKing().isKingChecked(this.Board)
        ? console.log(this.player_2.getPlayerName(), "check")
        : null;
    } else {
      this.player_1.getKing().isKingChecked(this.Board)
        ? console.log(this.player_1.getPlayerName(), "check")
        : null;
    }
  }

  changeTurn() {
    this.current_turn === this.player_1
      ? (this.current_turn = this.player_2)
      : (this.current_turn = this.player_1);
  }
}
