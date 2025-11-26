import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'

export default function QuickActionCard({ title, onPress }) {
  return (
    <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300 }} style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.touch}>
        <LinearGradient colors={["#FFFFFF", "#F3F7FF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, margin: 8 },
  touch: { flex: 1 },
  card: { flex: 1, borderRadius: 16, padding: 16, elevation: 3 },
  title: { fontSize: 14, fontWeight: '600', color: '#1F2937' }
})
