import { King } from "./Pieces";

export class Player {
  protected player_name: string;
  protected isWhite: boolean;
  protected King: King;

  constructor(name: string, isWhite: boolean, king: King) {
    this.player_name = name;
    this.isWhite = isWhite;
    this.King = king;
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
}
