import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryArea } from 'victory-native'

export default function ActivityMonitor() {
  const motion = Array.from({ length: 40 }).map((_, i) => ({ x: i, y: Math.sin(i / 5) + 5 }))
  const sound = Array.from({ length: 40 }).map((_, i) => ({ x: i, y: Math.cos(i / 3) + 3 }))
  const heat = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: Math.random() * 10 }))
  return (
    <AnimatedGradient>
      <View style={styles.card}>
        <Text style={styles.title}>Motion</Text>
        <VictoryChart theme={VictoryTheme.material}><VictoryLine data={motion} style={{ data: { stroke: '#2F80ED' } }} /></VictoryChart>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sound</Text>
        <VictoryChart theme={VictoryTheme.material}><VictoryArea data={sound} style={{ data: { fill: '#EB5757' } }} /></VictoryChart>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>GPS Heatmap</Text>
        <VictoryChart theme={VictoryTheme.material}><VictoryArea data={heat} style={{ data: { fill: '#56CCF2' } }} /></VictoryChart>
      </View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,255,255,0.9)', marginHorizontal: 16, marginTop: 56, borderRadius: 16, padding: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 }
})