import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Audio } from 'expo-av'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'

export default function SOS({ navigation }) {
  const [countdown, setCountdown] = useState(5)
  const [armed, setArmed] = useState(false)
  const [torch, setTorch] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef(null)
  const [sound, setSound] = useState(null)
  const [sosSent, setSosSent] = useState(false)
  const [actionTaken, setActionTaken] = useState(false)
  const inactivityRef = useRef(null)

  useEffect(() => { if (!permission?.granted) requestPermission() }, [permission])
  useEffect(() => {
    let t
    if (armed && countdown > 0) t = setTimeout(() => setCountdown(p => p - 1), 1000)
    if (armed && countdown === 0 && !sosSent) onSOSSent()
    return () => clearTimeout(t)
  }, [armed, countdown, sosSent])

  async function triggerAlert() {
    setActionTaken(true)
    Vibration.vibrate([500, 500, 1000])
    const s = await Audio.Sound.createAsync(require('../assets/splash-icon.png'))
    setSound(s.sound)
    await s.sound.playAsync()
  }

  function onSOSSent() {
    setSosSent(true)
    if (inactivityRef.current) clearTimeout(inactivityRef.current)
    navigation.navigate('Alarm', { autoStart: true })
    inactivityRef.current = setTimeout(() => {
      if (!actionTaken) navigation.navigate('Home')
    }, 8000)
  }

  async function toggleTorch() {
    if (!permission?.granted) return
    setActionTaken(true)
    setTorch(v => !v)
  }

  return (
    <AnimatedGradient>
      <View style={styles.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="shield-outline" size={18} color="#fff" />
          <Text style={styles.brand}>SafeGuard</Text>
        </View>
        {(armed || sosSent) && <View style={styles.badge}><Text style={styles.badgeText}>Armed</Text></View>}
      </View>
      <View style={styles.center}>
        <MotiView from={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'timing', duration: 300 }} style={styles.panicWrap}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => { setArmed(true); setCountdown(5) }} style={styles.panic}>
            <Text style={styles.panicText}>SOS</Text>
          </TouchableOpacity>
        </MotiView>
        <Text style={styles.helper}>{armed ? 'Countdown running' : 'Tap to start countdown'}</Text>
        <View style={styles.timerRow}>
          <View style={styles.timerBox}><Text style={styles.timerNum}>00</Text><Text style={styles.timerLabel}>Hours</Text></View>
          <View style={styles.timerBox}><Text style={styles.timerNum}>00</Text><Text style={styles.timerLabel}>Minutes</Text></View>
          <View style={[styles.timerBox, styles.timerAccent]}><Text style={styles.timerNum}>{String(Math.max(0, countdown)).padStart(2,'0')}</Text><Text style={styles.timerLabel}>Seconds</Text></View>
        </View>
        <TouchableOpacity onPress={() => { setArmed(false); setCountdown(5); navigation.navigate('Home') }}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
        <View style={styles.actionsBar}>
          <TouchableOpacity onPress={toggleTorch} style={styles.actionItem}><Ionicons name="flashlight" size={18} color="#fff" /><Text style={styles.actionLabel}>Flashlight</Text></TouchableOpacity>
          <TouchableOpacity onPress={triggerAlert} style={styles.actionItem}><Ionicons name="call" size={18} color="#fff" /><Text style={styles.actionLabel}>Fake Call</Text></TouchableOpacity>
          <TouchableOpacity onPress={triggerAlert} style={styles.actionItem}><Ionicons name="megaphone" size={18} color="#fff" /><Text style={styles.actionLabel}>Siren</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Alarm', { autoStart: true })} style={styles.actionItem}><Ionicons name="alarm" size={18} color="#fff" /><Text style={styles.actionLabel}>Alarm</Text></TouchableOpacity>
        </View>
      </View>
      {permission?.granted && (
      <CameraView
                ref={cameraRef}
                style={{ width: 1, height: 1 }}
                enableTorch={torch} />
)}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  topBar: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
  badge: { backgroundColor: 'rgba(30,215,96,0.18)', borderColor: 'rgba(30,215,96,0.35)', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  badgeText: { color: '#1ED760', fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  panicWrap: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#EB5757', alignItems: 'center', justifyContent: 'center' },
  panic: { alignItems: 'center' },
  panicText: { color: '#fff', fontSize: 36, fontWeight: '800' },
  helper: { color: '#98A2B3', marginTop: 12 },
  timerRow: { flexDirection: 'row', marginTop: 18 },
  timerBox: { alignItems: 'center', justifyContent: 'center', width: 80, height: 70, marginHorizontal: 6, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  timerAccent: { backgroundColor: 'rgba(235,87,87,0.18)', borderColor: 'rgba(235,87,87,0.35)' },
  timerNum: { color: '#fff', fontSize: 24, fontWeight: '800' },
  timerLabel: { color: '#98A2B3', fontSize: 12 },
  cancel: { color: '#fff', fontWeight: '700', marginTop: 16 },
  actionsBar: { position: 'absolute', bottom: 28, left: 16, right: 16, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  actionItem: { alignItems: 'center' },
  actionLabel: { color: '#fff', fontWeight: '600', marginTop: 6 }
})