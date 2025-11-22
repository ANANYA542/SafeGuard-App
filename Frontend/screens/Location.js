import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import AnimatedGradient from '../components/AnimatedGradient'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'

export default function Location({ navigation }) {
  const [selected, setSelected] = useState(null)
  const incidents = [{ id: 1, lat: 28.614, lng: 77.208, title: 'Accident' }]
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Location</Text>
        <View style={styles.iconBtn} />
      </View>
      <MapView style={{ flex: 1 }} showsUserLocation initialRegion={{ latitude: 28.6139, longitude: 77.209, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
        {incidents.map(i => (
          <Marker key={i.id} coordinate={{ latitude: i.lat, longitude: i.lng }} onPress={() => setSelected(i)} />
        ))}
      </MapView>
      {selected && (
        <MotiView from={{ translateY: 120 }} animate={{ translateY: 0 }} transition={{ type: 'timing', duration: 300 }} style={styles.card}>
          <Text style={styles.title}>{selected.title}</Text>
          <Text style={styles.sub}>Tap to route</Text>
        </MotiView>
      )}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  card: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  sub: { fontSize: 14, color: '#4B5563', marginTop: 4 },
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }
})