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
import CountDown from "./CountDown";
import dayjs, { Dayjs } from "dayjs";
import { Button } from "react-native-paper";
export let game = new Game();
export default function Board({ route }: any) {
  const [activePiece, setactivePiece] = useState(false);
  const [currentturn, setcurrentturn] = useState<null | string>(null);
  let Boxes = [];
  const { time, increment } = route.params;

  const Move = (x: number, y: number) => {
    if (!game.game_over) {
      if (activePiece) {
        game.handleMove(x, y);
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
    }
  };

  const checkCountdown = (time: Dayjs) => {
    if (time.get("minute") === 0 && time.get("second") === 0) {
      console.log("game over");
      setcurrentturn(null);
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
                style={
                  piece?.getColor() === "b"
                    ? {
                        transform: [{ rotate: "180deg" }],
                        height: 42,
                        width: 42,
                      }
                    : {
                        height: 42,
                        width: 42,
                      }
                }
              />
            }
            x={i}
            y={j}
          />
        );
      } else Boxes.push(<Box key={`${i}_${j}`} x={i} y={j} />);
    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {/* <CountDown
        direction={"up"}
        increment={parseInt(increment)}
        checkCountdown={checkCountdown}
        isWhite={false}
        startTime={dayjs().minute(parseInt(time)).second(0)}
      /> */}
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
      {/* <CountDown
        direction={"down"}
        increment={parseInt(increment)}
        checkCountdown={checkCountdown}
        isWhite={true}
        startTime={dayjs().minute(parseInt(time)).second(0)}
      /> */}
      <Button onPress={() => setcurrentturn(null)}>Stop game</Button>
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
