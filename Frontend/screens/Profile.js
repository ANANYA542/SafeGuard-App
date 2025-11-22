import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'

export default function Profile() {
  return (
    <AnimatedGradient>
      <View style={styles.box}><Text style={styles.title}>Profile</Text><Text style={styles.text}>User settings and stats</Text></View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  box: { marginTop: 56, backgroundColor: 'rgba(255,255,255,0.8)', margin: 16, borderRadius: 16, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  text: { fontSize: 14, color: '#4B5563', marginTop: 8 }
})