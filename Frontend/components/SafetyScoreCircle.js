import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { MotiView } from 'moti'

export default function SafetyScoreCircle({ score = 72, size = 140, color = '#2F80ED' }) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  return (
    <MotiView from={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'timing', duration: 350 }} style={{ alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#e6e6e6" strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={stroke} strokeDasharray={`${progress}, ${circumference}`} strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`} fill="none" />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color }}>{score}</Text>
        <Text style={{ fontSize: 12, color: '#7B8794' }}>Safety Score</Text>
      </View>
    </MotiView>
  )
}
