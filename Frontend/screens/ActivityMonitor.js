import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import SimpleLineChart from '../components/SimpleLineChart'
import { Ionicons } from '@expo/vector-icons'

export default function ActivityMonitor({ navigation }) {
  const motion = Array.from({ length: 40 }).map((_, i) => ({ x: i, y: Math.sin(i / 5) + 5 }))
  const sound = Array.from({ length: 40 }).map((_, i) => ({ x: i, y: Math.cos(i / 3) + 3 }))
  const heat = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: Math.random() * 10 }))
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Monitor</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Motion</Text>
        <SimpleLineChart data={motion.map(p => ({ y: p.y }))} width={320} height={110} color="#2F80ED" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sound</Text>
        <SimpleLineChart data={sound.map(p => ({ y: p.y }))} width={320} height={110} color="#EB5757" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>GPS Heatmap</Text>
        <SimpleLineChart data={heat.map(p => ({ y: p.y }))} width={320} height={110} color="#56CCF2" />
      </View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginHorizontal: 16, marginTop: 16, borderRadius: 16, padding: 12 },
  title: { fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 8 }
})