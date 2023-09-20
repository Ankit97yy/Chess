import { View, Text, TouchableNativeFeedback } from "react-native";
import React, { useMemo, useState } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Pieces";
import { FontAwesome5 } from "@expo/vector-icons";
import Pieces_location from "./Pieces";

export default function Board() {
  let Boxes = [];
  const [activePiece, setactivePiece] = useState<
    Bishop | King | Knight | Pawn | Queen | Rook | null
  >(null);

  const Move = (x: number, y: number) => {
    if (activePiece !== null) {
      let prev_loc_of_x_and_y: number[] = activePiece.getLocation();
      let prev_x_loc = prev_loc_of_x_and_y[0];
      let prev_y_loc = prev_loc_of_x_and_y[1];
      if (activePiece.isValidMove(x, y)) {
        Pieces_location[prev_x_loc][prev_y_loc] = null;
        activePiece.moveTo(x, y);
        Pieces_location[x][y] = activePiece;
        setactivePiece(null);
      } else setactivePiece(null);
    } else if (Pieces_location[x][y] !== null) {
      setactivePiece(Pieces_location[x][y]);
    }
  };

  const Box = ({
    icon,
    x,
    y,
  }: {
    icon?: JSX.Element;
    x: number;
    y: number;
  }) => {
    return (
      <TouchableNativeFeedback onPress={() => Move(x, y)}>
        <View
          style={{
            width: 43,
            height: 44,
            backgroundColor: (x + y) % 2 === 0 ? "white" : "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
      </TouchableNativeFeedback>
    );
  };

  for (let i: number = 0; i < 8; i++) {
    for (let j: number = 0; j < 8; j++) {
      if (Pieces_location[i][j] !== null) {
        let piece = Pieces_location[i][j];
        Boxes.push(
          <Box
            key={`${i}_${j}`}
            icon={
              <FontAwesome5
                name={`chess-${piece?.getName()}`}
                size={27}
                color={piece?.getColor() === "w" ? "orange" : "black"}
              />
            }
            x={i}
            y={j}
          />
        );
      } else Boxes.push(<Box x={i} y={j} />);
    }
  }
  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 1,
        width: 346,
        height: 354,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {Boxes}
    </View>
  );
}
