import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function CountDown({
  start,
  checkCountdown,
  direction,
  startTime,
}: {
  start: boolean;
  checkCountdown: any;
  direction: string;
  startTime: Dayjs;
}) {
  const [time, settime] = useState(startTime);
  const [timeCode, settimeCode] = useState(0);
  useEffect(() => {
    if (start) startTimer();
    else pauseTimer();
    return () => {
      pauseTimer();
    };
  }, [start]);

  useEffect(() => {
    checkCountdown(time);
  }, [time]);

  function pauseTimer() {
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
                color: "white",
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
    color: "white",
    fontSize: 20,
  },
});
