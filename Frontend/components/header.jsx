import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function Header() {
  return (
    <SafeAreaView style={{ width: '100%' }}>
      <LinearGradient
        colors={['#0D47A1', '#1976D2']} // Dark blue to lighter blue gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        {/* Menu Icon */}
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={styles.title}>RAKSHAK</Text>

        {/* Notifications Icon */}
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 16,
    width: '100%',
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  icon: {
    width: 40,
    alignItems: "center",
  },
});
