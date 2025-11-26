import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Switch } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Audio } from 'expo-av'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'

export default function Alarm({ navigation, route }) {
  const [playing, setPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  const [loudSound, setLoudSound] = useState(true)
  const [pattern, setPattern] = useState('Pulse')
  const [repeatAlarm, setRepeatAlarm] = useState(false)

  async function startAlarm() {
    setPlaying(true)
    if (loudSound) {
      const s = await Audio.Sound.createAsync(require('../assets/splash-icon.png'))
      setSound(s.sound)
      await s.sound.playAsync()
    }
    if (pattern === 'Pulse') {
      Vibration.vibrate([300, 300, 600], repeatAlarm)
    } else {
      Vibration.vibrate([200, 200, 200, 200], repeatAlarm)
    }
  }

  async function stopAlarm() {
    setPlaying(false)
    Vibration.cancel()
    if (sound) await sound.stopAsync()
  }

  useEffect(() => {
    if (route?.params?.autoStart && !playing) {
      startAlarm()
    }
  }, [route])

  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Alarm</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}><Ionicons name="settings-outline" size={20} color="#fff" /></TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.statusTitle}>{playing ? 'ALARM ACTIVE' : 'ALARM READY'}</Text>
        <Text style={styles.statusSub}>{playing ? 'Press and Hold to Stop' : 'Tap to Start'}</Text>
      </View>
      <View style={styles.center}>
        <View style={styles.dashRing} />
        <MotiView from={{ scale: 0.95 }} animate={{ scale: playing ? 1.05 : 1 }} transition={{ type: 'timing', duration: 600 }} style={[styles.circle, { backgroundColor: '#EB5757' }] }>
          <TouchableOpacity activeOpacity={0.9} onPress={startAlarm} onLongPress={stopAlarm} style={styles.inner}>
            <Ionicons name="alert" size={42} color="#fff" />
          </TouchableOpacity>
        </MotiView>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Customize Alarm</Text>
        <View style={styles.row}><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Ionicons name="volume-high" size={18} color="#fff" style={{ marginRight: 10 }} /><Text style={styles.rowTitle}>Loud Sound</Text></View><Switch value={loudSound} onValueChange={setLoudSound} /></View>
        <View style={styles.row}><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Ionicons name="phone-portrait-outline" size={18} color="#fff" style={{ marginRight: 10 }} /><Text style={styles.rowTitle}>Vibration Pattern</Text></View><TouchableOpacity onPress={() => setPattern(pattern === 'Pulse' ? 'Constant' : 'Pulse')} style={styles.select}><Text style={styles.selectText}>{pattern}</Text><Ionicons name="chevron-down" size={16} color="#98A2B3" /></TouchableOpacity></View>
        <View style={styles.row}><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Ionicons name="refresh" size={18} color="#fff" style={{ marginRight: 10 }} /><Text style={styles.rowTitle}>Repeat Alarm</Text></View><Switch value={repeatAlarm} onValueChange={setRepeatAlarm} /></View>
      </View>
      <TouchableOpacity style={styles.notify} onPress={() => navigation.navigate('Contacts')}><Ionicons name="notifications" size={18} color="#fff" /><Text style={styles.notifyText}>Notify Contacts</Text></TouchableOpacity>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  statusTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statusSub: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dashRing: { width: 260, height: 260, borderRadius: 130, borderWidth: 2, borderColor: 'rgba(235,87,87,0.5)', borderStyle: 'dashed', position: 'absolute' },
  circle: { width: 220, height: 220, borderRadius: 110, alignItems: 'center', justifyContent: 'center' },
  inner: { alignItems: 'center', justifyContent: 'center' },
  panel: { marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  panelTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  row: { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
  rowTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  select: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10 },
  selectText: { color: '#98A2B3', marginRight: 6 },
  notify: { marginHorizontal: 16, marginBottom: 24, paddingVertical: 14, borderRadius: 24, backgroundColor: '#2F80ED', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  notifyText: { color: '#fff', fontWeight: '700', marginLeft: 8 }
})
