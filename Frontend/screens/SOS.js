import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Audio } from 'expo-av'
import { Camera } from 'expo-camera'
import { MotiView } from 'moti'

export default function SOS() {
  const [countdown, setCountdown] = useState(5)
  const [armed, setArmed] = useState(false)
  const [torch, setTorch] = useState(false)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef(null)
  const [sound, setSound] = useState(null)

  useEffect(() => { if (!permission?.granted) requestPermission() }, [permission])
  useEffect(() => { let t; if (armed && countdown > 0) t = setTimeout(() => setCountdown(p => p - 1), 1000); if (armed && countdown === 0) triggerAlert(); return () => clearTimeout(t) }, [armed, countdown])

  async function triggerAlert() {
    Vibration.vibrate([500, 500, 1000])
    const s = await Audio.Sound.createAsync(require('../assets/splash-icon.png'))
    setSound(s.sound)
    await s.sound.playAsync()
  }

  async function toggleTorch() {
    if (!permission?.granted) return
    setTorch(v => !v)
  }

  return (
    <AnimatedGradient>
      <View style={styles.center}>
        <MotiView from={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'timing', duration: 300 }} style={styles.panicWrap}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { setArmed(true); setCountdown(5) }} style={styles.panic}>
            <Text style={styles.panicText}>SOS</Text>
            <Text style={styles.sub}>{armed ? `${countdown}` : 'Tap to arm'}</Text>
          </TouchableOpacity>
        </MotiView>
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleTorch} style={styles.action}><Text style={styles.actionText}>Flashlight</Text></TouchableOpacity>
          <TouchableOpacity onPress={triggerAlert} style={styles.action}><Text style={styles.actionText}>Fake Call</Text></TouchableOpacity>
        </View>
      </View>
      {permission?.granted && (
        <Camera ref={cameraRef} style={{ width: 1, height: 1 }} flashMode={torch ? 'torch' : 'off'} />
      )}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  panicWrap: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#EB5757', alignItems: 'center', justifyContent: 'center' },
  panic: { alignItems: 'center' },
  panicText: { color: '#fff', fontSize: 36, fontWeight: '800' },
  sub: { color: '#fff', marginTop: 8, fontSize: 16 },
  row: { flexDirection: 'row', marginTop: 24 },
  action: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, paddingHorizontal: 16, marginHorizontal: 8, borderRadius: 12 },
  actionText: { color: '#fff', fontWeight: '600' }
})