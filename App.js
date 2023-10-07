import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Board from "./Board";
import Dayjs from "./Dayjs";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Board />
        {/* <Dayjs /> */}
      </View>
      {/* <Haha /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
