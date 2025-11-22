import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function PressOnButton({ onPress, label = 'SOS', bottom = 90 }) {
  return (
    <TouchableOpacity style={[styles.container, { bottom }]} onPress={onPress}>
      <LinearGradient
        colors={["#FF3D00", "#FF6D00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.125,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
