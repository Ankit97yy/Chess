import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { game } from "./Board";

export default function CountDown({
  isWhite,
  checkCountdown,
  direction,
  startTime,
  increment,
}: {
  isWhite: boolean;
  checkCountdown: any;
  direction: string;
  startTime: Dayjs;
  increment: number;
}) {
  const [time, settime] = useState(startTime);
  const [timeCode, settimeCode] = useState(0);
  useEffect(() => {
    // console.log(direction, start);
    if (game.getCurrentTurn().isPlayerWhite() === isWhite) {
      startTimer();
    } else pauseTimer();
    // if (start) startTimer();
    if (game.getCurrentTurn().isPlayerWhite() !== isWhite)
      settime((prev) => prev.add(increment, "second"));
    return () => {
      pauseTimer();
    };
  }, [game.getCurrentTurn()]);

  useEffect(() => {
    checkCountdown(time);
  }, [time]);

  function pauseTimer() {
    console.log("paused");
    clearInterval(timeCode);
  }
  function startTimer() {
    pauseTimer();
    let timeCode = setInterval(() => {
      settime((prev) => prev.subtract(1, "second"));
    }, 1000);
    settimeCode(timeCode);
  }
  return (
    <View>
      <Text
        style={[
          direction === "up"
            ? {
                transform: [{ rotate: "180deg" }],
                color: "black",
                fontSize: 20,
              }
            : styles.textstyle,
          { justifyContent: "flex-start" },
        ]}
      >
        {time.format("mm:ss")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textstyle: {
    color: "black",
    fontSize: 20,
  },
});
