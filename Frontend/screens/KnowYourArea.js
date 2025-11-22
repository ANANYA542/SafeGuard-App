import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import AnimatedGradient from '../components/AnimatedGradient'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'

const { height } = Dimensions.get('window')

export default function KnowYourArea({ navigation }) {
  const [selected, setSelected] = useState(null)
  const region = { latitude: 28.6139, longitude: 77.209, latitudeDelta: 0.05, longitudeDelta: 0.05 }
  const incidents = [
    { id: 1, lat: 28.61, lng: 77.21, type: 'Accident', time: '10:32' },
    { id: 2, lat: 28.62, lng: 77.22, type: 'SOS', time: '11:05' },
    { id: 3, lat: 28.6, lng: 77.18, type: 'Attack', time: '09:20' }
  ]
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Know Your Area</Text>
        <View style={styles.iconBtn} />
      </View>
      <MapView style={styles.map} initialRegion={region}>
        {incidents.map(m => (
          <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lng }} onPress={() => setSelected(m)}>
            <View style={[styles.pin, { backgroundColor: m.type === 'SOS' ? '#EB5757' : m.type === 'Attack' ? '#F2C94C' : '#2F80ED' }]} />
          </Marker>
        ))}
      </MapView>
      {selected && (
        <MotiView from={{ translateY: 120 }} animate={{ translateY: 0 }} transition={{ type: 'timing', duration: 300 }} style={styles.slideCard}>
          <Text style={styles.cardTitle}>{selected.type}</Text>
          <Text style={styles.cardText}>Timestamp {selected.time}</Text>
          <Text style={styles.cardText}>Lat {selected.lat.toFixed(3)} Lng {selected.lng.toFixed(3)}</Text>
        </MotiView>
      )}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  pin: { width: 16, height: 16, borderRadius: 8 },
  slideCard: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, minHeight: height * 0.22 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  cardText: { fontSize: 14, color: '#4B5563', marginTop: 4 }
})