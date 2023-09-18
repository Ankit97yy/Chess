import { View, Text, TouchableNativeFeedback } from "react-native";
import React, { useMemo, useState } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Pieces";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Board() {
  let Boxes = [];
  const [render, setrender] = useState(false);
  const [activePiece, setactivePiece] = useState<
    Bishop | King | Knight | Pawn | Queen | Rook | null
  >(null);

  console.log(activePiece);

  var Pieces_location: (
    | Bishop
    | King
    | Knight
    | Pawn
    | Queen
    | Rook
    | null
  )[][] = useMemo(() => {
    let temp: (Bishop | King | Knight | Pawn | Queen | Rook | null)[][] = [];
    console.log("create board");
    for (let i = 0; i < 8; i++) {
      temp.push([]);
      for (let j = 0; j < 8; j++) {
        if (i === 6) {
          temp[i][j] = new Pawn("w", i, j, "pawn");
        } else if (i === 7) {
          switch (j) {
            case 0:
              temp[i][j] = new Rook("w", i, j, "rook");

              break;
            case 1:
              temp[i][j] = new Knight("w", i, j, "knight");

              break;
            case 2:
              temp[i][j] = new Bishop("w", i, j, "bishop");

              break;
            case 3:
              temp[i][j] = new Queen("w", i, j, "queen");

              break;
            case 4:
              temp[i][j] = new King("w", i, j, "king");

              break;
            case 5:
              temp[i][j] = new Bishop("w", i, j, "bishop");

              break;
            case 6:
              temp[i][j] = new Knight("w", i, j, "knight");

              break;
            case 7:
              temp[i][j] = new Rook("w", i, j, "rook");

              break;

            default:
              break;
          }
        } else if (i === 1) {
          temp[i][j] = new Pawn("b", i, j, "pawn");
        } else if (i === 0) {
          switch (j) {
            case 0:
              temp[i][j] = new Rook("b", i, j, "rook");

              break;
            case 1:
              temp[i][j] = new Knight("b", i, j, "knight");

              break;
            case 2:
              temp[i][j] = new Bishop("b", i, j, "bishop");

              break;
            case 3:
              temp[i][j] = new Queen("b", i, j, "queen");
              break;
            case 4:
              temp[i][j] = new King("b", i, j, "king");
              break;
              break;
            case 5:
              temp[i][j] = new Bishop("b", i, j, "bishop");
              break;
            case 6:
              temp[i][j] = new Knight("b", i, j, "knight");
              break;
            case 7:
              temp[i][j] = new Rook("b", i, j, "rook");

              break;

            default:
              break;
          }
        } else temp[i][j] = null;
      }
    }
    return temp;
  }, []);

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
