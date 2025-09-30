import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.footer}>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="alarm-outline" size={28} color="white" />
        <Text style={styles.label}>Alarm</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button}>
        <Ionicons name="call-outline" size={28} color="white" />
        <Text style={styles.label}>SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="location-outline" size={28} color="white" />
        <Text style={styles.label}>Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#0D47A1', // Dark blue footer background
    width: '100%',
    position: 'absolute', // Stick to bottom
    bottom: 0,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
