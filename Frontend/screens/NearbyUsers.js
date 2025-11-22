import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import AnimatedGradient from '../components/AnimatedGradient'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'

export default function NearbyUsers({ navigation }) {
  const [selected, setSelected] = useState(null)
  const users = [
    { id: 'u1', lat: 28.612, lng: 77.210, name: 'Aarav', last: '2m ago' },
    { id: 'u2', lat: 28.618, lng: 77.204, name: 'Diya', last: '5m ago' }
  ]
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Users</Text>
        <View style={styles.iconBtn} />
      </View>
      <MapView style={{ flex: 1 }} initialRegion={{ latitude: 28.6139, longitude: 77.209, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
        {users.map(u => (
          <Marker key={u.id} coordinate={{ latitude: u.lat, longitude: u.lng }} onPress={() => setSelected(u)} />
        ))}
      </MapView>
      {selected && (
        <MotiView from={{ translateY: 120 }} animate={{ translateY: 0 }} transition={{ type: 'timing', duration: 300 }} style={styles.card}>
          <Text style={styles.name}>{selected.name}</Text>
          <Text style={styles.sub}>Last location {selected.last}</Text>
        </MotiView>
      )}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  card: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  name: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  sub: { fontSize: 14, color: '#4B5563', marginTop: 4 },
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }
})