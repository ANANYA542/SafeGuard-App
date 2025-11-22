import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import AnimatedGradient from '../components/AnimatedGradient'
import { MotiView } from 'moti'

export default function NearbyUsers() {
  const [selected, setSelected] = useState(null)
  const users = [
    { id: 'u1', lat: 28.612, lng: 77.210, name: 'Aarav', last: '2m ago' },
    { id: 'u2', lat: 28.618, lng: 77.204, name: 'Diya', last: '5m ago' }
  ]
  return (
    <AnimatedGradient>
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
  sub: { fontSize: 14, color: '#4B5563', marginTop: 4 }
})