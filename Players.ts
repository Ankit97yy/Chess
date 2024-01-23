import { Board } from "./Chess_board";
import { King } from "./Pieces";
import { PIECE } from "./Types";

export class Player {
  protected player_name: string;
  protected isWhite: boolean;
  protected King: King;
  protected players_all_pieces: PIECE[] = [];

  constructor(name: string, isWhite: boolean, king: King) {
    this.player_name = name;
    this.isWhite = isWhite;
    this.King = king;
  }

  movePiece(somePiece: PIECE, x: number, y: number, board: Board) {
    somePiece?.moveTo(x, y, board);
  }

  getPlayerName() {
    return this.player_name;
  }
  isPlayerWhite() {
    return this.isWhite;
  }
  getKing() {
    return this.King;
  }
  setPlayersAllPieces(piece: PIECE) {
    this.players_all_pieces.push(piece);
  }
  getPlayersAllPieces() {
    return this.players_all_pieces;
  }
}
