import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function AuthLanding({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.brand}>Rakshak</Text>
      </View>
      <View style={styles.controls}>
        <LinearGradient colors={["#2F80ED", "#56CCF2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtn}>
          <TouchableOpacity style={styles.primaryTap} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.primaryText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.secondaryText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1220' },
  top: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: 0.5 },
  controls: { paddingHorizontal: 16, paddingBottom: 48 },
  primaryBtn: { borderRadius: 20 },
  primaryTap: { paddingVertical: 14, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '800' },
  secondaryBtn: { marginTop: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', paddingVertical: 14, alignItems: 'center' },
  secondaryText: { color: '#DCE2F0', fontWeight: '700' }
})
