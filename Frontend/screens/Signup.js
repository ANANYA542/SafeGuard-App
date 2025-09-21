import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_BASE } from '../utils/api'

export default function Signup({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit() {
    if (!email || !password) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'error')
      await AsyncStorage.setItem('@sg_token', data.token)
      navigation.replace('Profile')
    } catch (e) {
      Alert.alert('Signup failed')
    } finally { setLoading(false) }
  }
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#98A2B3" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" placeholderTextColor="#98A2B3" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" placeholderTextColor="#98A2B3" />
        <TouchableOpacity style={styles.submit} onPress={submit} disabled={loading}><Text style={styles.submitText}>{loading ? 'Please wait...' : 'Sign Up'}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.alt} onPress={() => navigation.navigate('Login')}><Text style={styles.altText}>I already have an account</Text></TouchableOpacity>
      </View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  card: { marginTop: 20, marginHorizontal: 16, padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  label: { color: '#fff', fontWeight: '700', marginTop: 8 },
  input: { marginTop: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#fff' },
  submit: { marginTop: 16, backgroundColor: '#2F80ED', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' },
  alt: { marginTop: 12, alignItems: 'center' },
  altText: { color: '#98A2B3' }
})
