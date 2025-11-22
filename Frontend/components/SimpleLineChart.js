import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Rect } from 'react-native-svg'

export default function SimpleLineChart({ data = [], width = 320, height = 120, color = '#56CCF2' }) {
  const maxY = Math.max(1, ...data.map(d => d.y || d))
  const minY = Math.min(0, ...data.map(d => d.y || d))
  const scaleX = i => (i / Math.max(1, data.length - 1)) * width
  const scaleY = v => height - ((v - minY) / Math.max(0.0001, maxY - minY)) * height
  const points = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.y ?? d)}`).join(' ')
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={color} stopOpacity="0.4" />
            <Stop offset="1" stopColor="#2F80ED" stopOpacity="0.4" />
          </SvgGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" opacity="0.18" />
        <Path d={points} stroke={color} strokeWidth={2} fill="none" />
      </Svg>
    </View>
  )
}