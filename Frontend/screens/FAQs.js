import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Ionicons } from '@expo/vector-icons'

export default function FAQs({ navigation }) {
  const [query, setQuery] = useState('')
  const general = [
    { q: 'How does accident detection work?', a: 'We analyze motion patterns to detect sudden changes that indicate a fall or collision.' },
    { q: 'What happens when an attack is detected?', a: 'An alert triggers with optional siren and emergency messages to your contacts.' },
    { q: 'How do I add emergency contacts?', a: 'Go to Contacts from Home or Profile and use Add New Contact.' }
  ]
  const privacy = [
    { q: 'Is my location data private?', a: 'Location is used only for features you enable and stored securely on your device.' },
    { q: 'Can I customize the alert sensitivity?', a: 'Yes, adjust sensitivity via Settings and Monitoring toggles.' }
  ]
  const [open, setOpen] = useState({})
  function toggle(idx) { setOpen(p => ({ ...p, [idx]: !p[idx] })) }
  function filter(items) { return items.filter(i => i.q.toLowerCase().includes(query.toLowerCase())) }
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.searchWrap}><Ionicons name="search" size={16} color="#98A2B3" /><TextInput value={query} onChangeText={setQuery} placeholder="How can we help?" placeholderTextColor="#98A2B3" style={styles.searchInput} /></View>
      <Text style={styles.sectionLabel}>General</Text>
      {filter(general).map((item, i) => (
        <TouchableOpacity key={`g-${i}`} style={styles.qaRow} onPress={() => toggle(`g-${i}`)}>
          <Text style={styles.qaTitle}>{item.q}</Text>
          <Ionicons name={open[`g-${i}`] ? 'chevron-up' : 'chevron-down'} size={16} color="#98A2B3" />
          {open[`g-${i}`] && <Text style={styles.qaAnswer}>{item.a}</Text>}
        </TouchableOpacity>
      ))}
      <Text style={styles.sectionLabel}>Privacy & Security</Text>
      {filter(privacy).map((item, i) => (
        <TouchableOpacity key={`p-${i}`} style={styles.qaRow} onPress={() => toggle(`p-${i}`)}>
          <Text style={styles.qaTitle}>{item.q}</Text>
          <Ionicons name={open[`p-${i}`] ? 'chevron-up' : 'chevron-down'} size={16} color="#98A2B3" />
          {open[`p-${i}`] && <Text style={styles.qaAnswer}>{item.a}</Text>}
        </TouchableOpacity>
      ))}
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  searchWrap: { marginHorizontal: 16, marginTop: 12, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { marginLeft: 8, color: '#fff', flex: 1 },
  sectionLabel: { color: '#98A2B3', fontWeight: '700', marginTop: 16, marginHorizontal: 16, fontSize: 12 },
  qaRow: { marginHorizontal: 16, marginTop: 10, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  qaTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  qaAnswer: { color: '#98A2B3', fontSize: 12, marginTop: 8 }
})
