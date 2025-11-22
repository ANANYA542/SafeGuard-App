import React from 'react'
import { Dimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'

const { width, height } = Dimensions.get('window')

export default function AnimatedGradient({ children }) {
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 600 }} style={{ flex: 1 }}>
      <LinearGradient colors={['#143B5C', '#0B1220']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ position: 'absolute', width, height }} />
      <View style={{ position: 'absolute', bottom: height * 0.48, width, height: 120, backgroundColor: 'rgba(255,255,255,0.06)', borderTopLeftRadius: width, borderTopRightRadius: width }} />
      {children}
    </MotiView>
  )
}