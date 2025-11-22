import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'

export default function Profile({ navigation }) {
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.box}><Text style={styles.title}>Profile</Text><Text style={styles.text}>User settings and stats</Text></View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  box: { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.8)', margin: 16, borderRadius: 16, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  text: { fontSize: 14, color: '#4B5563', marginTop: 8 }
})