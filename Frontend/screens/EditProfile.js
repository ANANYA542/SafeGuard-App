import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_BASE } from '../utils/api'

export default function EditProfile({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { load() }, [])
  
  async function load() {
    const token = await AsyncStorage.getItem('@sg_token')
    if (!token) { navigation.replace('Login'); return }
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (res.ok) { 
        setName(data.name || '')
        setEmail(data.email || '')
      }
    } catch (e) {
      console.log('Failed to load profile:', e)
    }
  }

  async function save() {
    setLoading(true)
    try {
      // In a real app, this would call an API to update the profile
      Alert.alert('Success', 'Profile updated successfully!')
      navigation.goBack()
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#98A2B3"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#98A2B3"
          editable={false}
        />
        <Text style={styles.hint}>Email cannot be changed</Text>
        <TouchableOpacity
          style={styles.submit}
          onPress={save}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  card: { marginTop: 20, marginHorizontal: 16, padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  label: { color: '#fff', fontWeight: '700', marginTop: 12 },
  input: { marginTop: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#fff' },
  hint: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  submit: { marginTop: 24, backgroundColor: '#2F80ED', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' }
})
