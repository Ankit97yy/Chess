import { useEffect } from "react";
import { TouchableHighlight, View } from "react-native";
import { Text } from "react-native-paper";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["BackSp", "z", "x", "c", "v", "b", "n", "m", "Submit"],
  ["Shuffle"],
];

export default function Keyboard(props) {
  useEffect(() => {
    console.log("render");
  }, []);
  console.log("haha");
  return (
    <View>
      {rows.map((row, rowIndex) => {
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",

              flexDirection: "row",
            }}
            key={`row-${rowIndex}`}
          >
            {row.map((key) => {
              return (
                <TouchableHighlight
                  style={{ padding: 5, backgroundColor: "orange", margin: 3 }}
                  key={key}
                  onPress={() => props.onPress(key)}
                >
                  <Text>{key}</Text>
                </TouchableHighlight>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
