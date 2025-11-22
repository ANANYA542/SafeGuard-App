import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings({ navigation }) {
  const [bgMonitoring, setBgMonitoring] = useState(true)
  const [push, setPush] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [quietHours, setQuietHours] = useState('Off')
  const [theme, setTheme] = useState('Adaptive')

  useEffect(() => { loadPrefs() }, [])
  async function loadPrefs() {
    try {
      const prefs = await AsyncStorage.getItem('@sg_prefs')
      if (prefs) {
        const p = JSON.parse(prefs)
        setBgMonitoring(!!p.bgMonitoring); setPush(!!p.push); setVibration(!!p.vibration); setQuietHours(p.quietHours || 'Off'); setTheme(p.theme || 'Adaptive')
      }
    } catch {}
  }
  async function savePrefs(next) { try { await AsyncStorage.setItem('@sg_prefs', JSON.stringify(next)) } catch {} }

  function updatePref(key, value) {
    const next = { bgMonitoring, push, vibration, quietHours, theme, [key]: value }
    if (key === 'bgMonitoring') setBgMonitoring(value)
    if (key === 'push') setPush(value)
    if (key === 'vibration') setVibration(value)
    if (key === 'quietHours') setQuietHours(value)
    if (key === 'theme') setTheme(value)
    savePrefs(next)
  }

  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={20} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.iconBtn} />
      </View>

      <Text style={styles.sectionLabel}>GENERAL</Text>
      <View style={styles.cardRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Enable background monitoring</Text>
          <Text style={styles.cardSub}>Allows continuous safety checks</Text>
        </View>
        <Switch value={bgMonitoring} onValueChange={v => updatePref('bgMonitoring', v)} />
      </View>

      <View style={[styles.cardRow, { justifyContent: 'space-between' }] }>
        <View>
          <Text style={styles.cardTitle}>Theme</Text>
          <Text style={styles.cardSub}>{theme} (system default)</Text>
        </View>
        <View style={styles.themeCapsule}>
          <TouchableOpacity style={styles.themeBtn} onPress={() => updatePref('theme', 'Adaptive')}><Ionicons name="desktop-outline" size={16} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.themeBtn} onPress={() => updatePref('theme', 'Light')}><Ionicons name="sunny-outline" size={16} color="#fff" /></TouchableOpacity>
          <TouchableOpacity style={styles.themeBtn} onPress={() => updatePref('theme', 'Dark')}><Ionicons name="moon-outline" size={16} color="#fff" /></TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
      <View style={styles.cardRow}><Text style={styles.cardTitle}>Enable push notifications</Text><Switch value={push} onValueChange={v => updatePref('push', v)} /></View>
      <TouchableOpacity style={styles.linkRow}><Text style={styles.cardTitle}>Sound</Text><Text style={styles.linkSub}>Default</Text><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <View style={styles.cardRow}><Text style={styles.cardTitle}>Vibration</Text><Switch value={vibration} onValueChange={v => updatePref('vibration', v)} /></View>
      <TouchableOpacity style={styles.linkRow}><Text style={styles.cardTitle}>Quiet Hours</Text><Text style={styles.linkSub}>{quietHours}</Text><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>

      <Text style={styles.sectionLabel}>MORE</Text>
      <TouchableOpacity style={styles.linkRow}><Text style={styles.cardTitle}>About Us</Text><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <TouchableOpacity style={styles.linkRow}><Text style={styles.cardTitle}>Privacy Policy</Text><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <TouchableOpacity style={styles.linkRow}><Text style={styles.cardTitle}>Terms of Service</Text><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { color: '#98A2B3', fontWeight: '700', marginTop: 16, marginHorizontal: 16, fontSize: 12 },
  cardRow: { marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 14, fontWeight: '700', flex: 1 },
  cardSub: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  themeCapsule: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 20 },
  themeBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  linkRow: { marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkSub: { color: '#98A2B3', marginRight: 6 }
})