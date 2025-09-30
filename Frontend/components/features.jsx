import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const features = [
  { id: 1, title: "Know Your Area" },
  { id: 2, title: "Daily Reports" },
  { id: 3, title: "Nearby Users" },
];

export default function FeatureBoxes() {
  return (
    <View style={styles.container}>
      {features.map((feature) => (
        <TouchableOpacity key={feature.id} style={styles.box}>
          <LinearGradient
            colors={["#0D47A1", "#1976D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.text}>{feature.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // distribute 3 evenly
    width: width * 0.9,
    alignSelf: "center",
    marginTop: 20,
  },
  box: {
    width: width * 0.28, // about 28% of screen width
    height: width * 0.28, // square
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
