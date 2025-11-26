import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function Entry({ navigation }) {
  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/bg1.mov")}
        style={StyleSheet.absoluteFillObject}
        isMuted
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
      />

      {/* Invisible button overlay */}
      <TouchableOpacity
        style={styles.scannerHotspot}
        onPress={() => navigation.navigate("AuthLanding")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // Position this EXACTLY over the scanner icon
  scannerHotspot: {
    position: "absolute",

    // 👇 Adjust these 4 values after checking video position
    top: "72%",       // move up/down
    left: "28%",      // move left/right
    width: "45%",     // adjust scanner width
    height: "20%",    // adjust scanner height
    backgroundColor: "rgba(0,0,0,0)",
  },
});
