import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React, { useMemo, useState } from "react";
import { PIECE_IMAGES, Piece_type } from "./Piece_images";
import { Game } from "./Game";
let game = new Game();
export default function Board() {
  const [activePiece, setactivePiece] = useState(false);
  let Boxes = [];

  const Move = (x: number, y: number) => {
    if (activePiece) {
      game.makeMove(x, y);
      setactivePiece(false);
    } else {
      if (game.getPiece(x, y) === null) return;
      if (
        (game.getPiece(x, y)?.getColor() === "w") !==
        game.getCurrentTurn().isPlayerWhite()
      )
        return;
      game.setActivePiece(x, y);
      setactivePiece(true);
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
            backgroundColor: (x + y) % 2 === 0 ? "white" : "#a88154",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:
              activePiece && game.getPiece(x, y) === game.getActivePiece()
                ? 15
                : 0,
          }}
        >
          {icon}
        </View>
      </TouchableNativeFeedback>
    );
  };

  for (let i: number = 0; i < 8; i++) {
    for (let j: number = 0; j < 8; j++) {
      if (game.getPiece(i, j) !== null) {
        let piece = game.getPiece(i, j);
        let Piece_image_name = `${piece?.getColor()}_${piece?.getName()}`;
        Boxes.push(
          <Box
            key={`${i}_${j}`}
            icon={
              // <FontAwesome5
              //   name={`chess-${piece?.getName()}`}
              //   size={27}
              //   color={piece?.getColor() === "w" ? "orange" : "black"}
              // /
              <Image
                source={PIECE_IMAGES[Piece_image_name]}
                style={{ height: 42, width: 42 }}
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
// const style = StyleSheet.create({
//   Box_style: {
//        width: 43,
//             height: 44,
//             backgroundColor: (x + y) % 2 === 0 ? "white" : "#a88154",
//             justifyContent: "center",
//             alignItems: "center",
//   }
// })
