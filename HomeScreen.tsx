import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

export default function HomeScreen({ navigation }: any) {
  const [time, settime] = useState("1");
  const [increment, setincrement] = useState("0");
  return (
    <View>
      <TextInput
        label="Enter time"
        keyboardType="numeric"
        value={time}
        onChangeText={(text) => settime(text)}
      />
      <TextInput
        label="Increment"
        keyboardType="numeric"
        value={increment}
        onChangeText={(text) => setincrement(text)}
      />
      <Button
        onPress={() => navigation.navigate("GameScreen", { time, increment })}
      >
        Start Game
      </Button>
    </View>
  );
}
