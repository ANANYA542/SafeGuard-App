import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'
import SimpleLineChart from '../components/SimpleLineChart'
import Svg, { Rect } from 'react-native-svg'

const incidents = [
  { id: '1', type: 'Accident', time: 'Today, 4:15 PM', location: 'Near 123 Main St, Anytown' },
  { id: '2', type: 'Attack', time: 'Yesterday, 9:20 AM', location: 'Oak Avenue Park' },
  { id: '3', type: 'SOS', time: 'Oct 25, 11:55 PM', location: '45.4215° N, 75.6972° W' }
]

export default function DailyReports({ navigation }) {
  const [filter, setFilter] = useState('All')
  const filtered = incidents.filter(d => filter === 'All' || d.type === filter)
  const weekly = useMemo(() => Array.from({ length: 7 }).map((_, i) => ({ y: Math.max(1, Math.random() * 9) })), [])
  const bars = [{ label: 'Accident', color: '#56CCF2', height: 60 }, { label: 'Attack', color: '#F2C94C', height: 32 }, { label: 'SOS', color: '#EB5757', height: 80 }]
  return (
    <AnimatedGradient>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Reports</Text>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="calendar-outline" size={20} color="#fff" /></TouchableOpacity>
        </View>
        <View style={styles.filters}>
          {['All', 'Accident', 'Attack', 'SOS'].map(f => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.pill, filter === f && styles.pillActive]}>
              <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.cardTitle}>Weekly Safety Score</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6 }}>
            <Text style={styles.bigScore}>8.2</Text>
            <Text style={styles.bigScoreUnit}>/10</Text>
          </View>
          <Text style={styles.deltaText}>Last 7 Days <Text style={{ color: '#1ED760' }}>+1.5%</Text></Text>
          <View style={styles.chartContainer}><SimpleLineChart data={weekly} width={320} height={110} color="#2F80ED" /></View>
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.cardTitle}>Incident Breakdown</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 6 }}>
            <Text style={styles.bigScore}>5</Text>
            <Text style={styles.bigScoreUnit}> Total</Text>
          </View>
          <Text style={styles.deltaText}>Last 7 Days <Text style={{ color: '#EB5757' }}>-10%</Text></Text>
          <View style={{ marginTop: 12, alignItems: 'center' }}>
            <Svg width={320} height={120}>
              <Rect x={40} y={120 - bars[0].height} width={40} height={bars[0].height} fill={bars[0].color} rx={8} />
              <Rect x={140} y={120 - bars[1].height} width={40} height={bars[1].height} fill={bars[1].color} rx={8} />
              <Rect x={240} y={120 - bars[2].height} width={40} height={bars[2].height} fill={bars[2].color} rx={8} />
            </Svg>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 320, marginTop: 8 }}>
              <Text style={styles.legend}>Accident</Text>
              <Text style={styles.legend}>Attack</Text>
              <Text style={styles.legend}>SOS</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recent Incidents</Text>
        {filtered.map(item => (
          <View key={item.id} style={styles.incidentItem}>
            <View style={[styles.incidentIcon, { backgroundColor: item.type === 'Accident' ? 'rgba(86,204,242,0.16)' : item.type === 'Attack' ? 'rgba(242,201,76,0.16)' : 'rgba(235,87,87,0.16)' }]}>
              <Ionicons name={item.type === 'Accident' ? 'car-outline' : item.type === 'Attack' ? 'alert-outline' : 'call-outline'} size={18} color={item.type === 'Accident' ? '#56CCF2' : item.type === 'Attack' ? '#F2C94C' : '#EB5757'} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.incidentTitle}>{item.type} Detected</Text>
              <Text style={styles.incidentSub}>{item.time}</Text>
              <Text style={styles.incidentSub}>{item.location}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#98A2B3" />
          </View>
        ))}
      </ScrollView>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  filters: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 10 },
  pill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginRight: 8 },
  pillActive: { backgroundColor: '#2F80ED' },
  pillText: { color: '#fff' },
  pillTextActive: { color: '#fff', fontWeight: '700' },
  cardBox: { marginHorizontal: 16, marginTop: 12, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cardTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  bigScore: { color: '#fff', fontSize: 28, fontWeight: '800' },
  bigScoreUnit: { color: '#98A2B3', fontSize: 18, marginLeft: 4 },
  deltaText: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  chartContainer: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
  legend: { color: '#98A2B3', fontSize: 12 },
  sectionTitle: { color: '#fff', fontSize: 14, fontWeight: '700', marginHorizontal: 16, marginTop: 16 },
  incidentItem: { marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center' },
  incidentIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  incidentTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  incidentSub: { color: '#98A2B3', fontSize: 12, marginTop: 2 }
})
