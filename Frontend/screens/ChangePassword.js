import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'

export default function ChangePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function save() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    try {
      // In a real app, this would call an API to change the password
      Alert.alert('Success', 'Password changed successfully!')
      navigation.goBack()
    } catch (e) {
      Alert.alert('Error', 'Failed to change password')
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
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#98A2B3"
        />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#98A2B3"
        />
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#98A2B3"
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={save}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? 'Changing...' : 'Change Password'}
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
  submit: { marginTop: 24, backgroundColor: '#2F80ED', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' }
})
