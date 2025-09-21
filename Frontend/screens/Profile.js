import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_BASE } from '../utils/api'

export default function Profile({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const score = 98
  useEffect(() => { load() }, [])
  async function load() {
    const token = await AsyncStorage.getItem('@sg_token')
    if (!token) { navigation.replace('Login'); return }
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (res.ok) { setName(data.name || 'User'); setEmail(data.email || '') } else { navigation.replace('Login') }
    } catch { navigation.replace('Login') }
  }
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}><Ionicons name="settings-outline" size={20} color="#fff" /></TouchableOpacity>
      </View>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarCircle}><Ionicons name="person" size={42} color="#fff" /></View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.name}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity style={styles.editPill}><Ionicons name="create-outline" size={14} color="#fff" /></TouchableOpacity>
        </View>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Safety Summary</Text>
        <Text style={styles.summaryScore}>{score}% Safety Score</Text>
        <Text style={styles.summarySub}>Based on your recent activity and saved contacts.</Text>
      </View>
      <Text style={styles.sectionLabel}>ACCOUNT</Text>
      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('EditProfile')}><View style={styles.rowLeft}><Ionicons name="person-circle-outline" size={18} color="#fff" /><Text style={styles.rowTitle}>Edit Profile</Text></View><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('ChangePassword')}><View style={styles.rowLeft}><Ionicons name="lock-closed-outline" size={18} color="#fff" /><Text style={styles.rowTitle}>Change Password</Text></View><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <Text style={styles.sectionLabel}>ACTIVITY</Text>
      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Contacts')}><View style={styles.rowLeft}><Ionicons name="shield-outline" size={18} color="#fff" /><Text style={styles.rowTitle}>Manage Emergency Contacts</Text></View><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('DailyReports')}><View style={styles.rowLeft}><Ionicons name="time-outline" size={18} color="#fff" /><Text style={styles.rowTitle}>Activity History</Text></View><Ionicons name="chevron-forward" size={16} color="#98A2B3" /></TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={async () => { await AsyncStorage.removeItem('@sg_token'); navigation.replace('Login') }}><Ionicons name="log-out-outline" size={18} color="#fff" /><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  avatarWrap: { alignItems: 'center', marginTop: 12 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#2F80ED', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)' },
  name: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 10 },
  email: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  editPill: { marginLeft: 8, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: 4 },
  summaryCard: { marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 16, backgroundColor: 'rgba(47,128,237,0.26)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  summaryTitle: { color: '#fff', fontSize: 13, fontWeight: '700' },
  summaryScore: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 6 },
  summarySub: { color: '#DCE2F0', fontSize: 12, marginTop: 6 },
  sectionLabel: { color: '#98A2B3', fontWeight: '700', marginTop: 16, marginHorizontal: 16, fontSize: 12 },
  linkRow: { marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowTitle: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: 10 },
  logout: { marginHorizontal: 16, marginTop: 18, marginBottom: 24, paddingVertical: 14, borderRadius: 16, backgroundColor: 'rgba(235,87,87,0.28)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  logoutText: { color: '#fff', fontWeight: '700', marginLeft: 8 }
})
