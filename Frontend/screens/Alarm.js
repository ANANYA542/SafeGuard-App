import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Audio } from 'expo-av'
import { MotiView } from 'moti'

export default function Alarm() {
  const [playing, setPlaying] = useState(false)
  const [sound, setSound] = useState(null)

  async function toggleAlarm() {
    if (playing) {
      setPlaying(false)
      Vibration.cancel()
      if (sound) await sound.stopAsync()
    } else {
      setPlaying(true)
      const s = await Audio.Sound.createAsync(require('../assets/splash-icon.png'))
      setSound(s.sound)
      await s.sound.playAsync()
      Vibration.vibrate([300, 300, 600], true)
    }
  }

  return (
    <AnimatedGradient>
      <View style={styles.center}>
        <MotiView from={{ scale: 0.95 }} animate={{ scale: playing ? 1.05 : 1 }} transition={{ type: 'timing', duration: 600 }} style={styles.circle}>
          <TouchableOpacity onPress={toggleAlarm} onLongPress={toggleAlarm} style={styles.inner}>
            <Text style={styles.text}>{playing ? 'Stop' : 'Alarm'}</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#2F80ED', alignItems: 'center', justifyContent: 'center' },
  inner: { alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 24, fontWeight: '700' }
})