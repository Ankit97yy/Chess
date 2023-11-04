import { View, Text } from "react-native";
import React, { useState } from "react";
import Keyboard from "./Keyboard";

export default function Abcd() {
  let [state, setState] = useState("ankit");
  const onKey = (key) => setState(key);

  return (
    <View>
      <Text>{state}</Text>
      <Keyboard onPress={onKey} />
    </View>
  );
}
