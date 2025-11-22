import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'

export default function AlertBanner({ text, type = 'alert' }) {
  const color = type === 'alert' ? '#EB5757' : type === 'warning' ? '#F2C94C' : '#2F80ED'
  return (
    <MotiView from={{ translateY: -20, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ type: 'timing', duration: 400 }} style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: { margin: 16, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 },
  text: { color: '#fff', fontSize: 14, fontWeight: '600' }
})