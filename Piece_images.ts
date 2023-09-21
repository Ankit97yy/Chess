// Create an empty hashmap
type Player = "b" | "w";
type Type = "queen" | "rook" | "bishop" | "knight" | "king" | "pawn";
export type Piece_type = `${Player}_${Type}`;
type Pieces = Record<string, ReturnType<typeof require>>;
export const PIECE_IMAGES: Pieces = {
  b_queen: require("./assets/black-queen.png"),
  b_king: require("./assets/black-king.png"),
  b_bishop: require("./assets/black-bishop.png"),
  b_knight: require("./assets/black-knight.png"),
  b_pawn: require("./assets/black-pawn.png"),
  b_rook: require("./assets/black-rook.png"),
  w_rook: require("./assets/white-rook.png"),
  w_king: require("./assets/white-king.png"),
  w_knight: require("./assets/white-knight.png"),
  w_queen: require("./assets/white-queen.png"),
  w_bishop: require("./assets/white-bishop.png"),
  w_pawn: require("./assets/white-pawn.png"),
};
