import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Swipeable } from 'react-native-gesture-handler'

export default function Settings() {
  const [bgMonitoring, setBgMonitoring] = useState(true)
  const [push, setPush] = useState(true)
  const [contacts, setContacts] = useState([{ id: '1', name: 'Mom', phone: '9999999999' }, { id: '2', name: 'Dad', phone: '8888888888' }])
  function remove(id) { setContacts(prev => prev.filter(c => c.id !== id)) }
  return (
    <AnimatedGradient>
      <View style={styles.toggles}>
        <View style={styles.toggleRow}><Text style={styles.toggleText}>Background monitoring</Text><Switch value={bgMonitoring} onValueChange={setBgMonitoring} /></View>
        <View style={styles.toggleRow}><Text style={styles.toggleText}>Push notifications</Text><Switch value={push} onValueChange={setPush} /></View>
      </View>
      <Text style={styles.section}>Emergency Contacts</Text>
      <FlatList data={contacts} keyExtractor={i => i.id} contentContainerStyle={{ paddingHorizontal: 16 }} renderItem={({ item }) => (
        <Swipeable renderRightActions={() => <TouchableOpacity onPress={() => remove(item.id)} style={styles.delete}><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>}>
          <View style={styles.card}><Text style={styles.name}>{item.name}</Text><Text style={styles.phone}>{item.phone}</Text></View>
        </Swipeable>
      )} />
      <TouchableOpacity style={styles.add}><Text style={styles.addText}>Add Contact</Text></TouchableOpacity>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  toggles: { marginTop: 56, paddingHorizontal: 16 },
  toggleRow: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 12, borderRadius: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleText: { color: '#111827', fontSize: 14, fontWeight: '600' },
  section: { color: '#fff', fontSize: 16, fontWeight: '700', marginHorizontal: 16, marginTop: 12 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 16, marginVertical: 8 },
  name: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  phone: { fontSize: 13, color: '#4B5563', marginTop: 4 },
  delete: { backgroundColor: '#EB5757', justifyContent: 'center', alignItems: 'center', width: 80, borderRadius: 12, marginLeft: 8 },
  deleteText: { color: '#fff', fontWeight: '700' },
  add: { backgroundColor: '#2F80ED', margin: 16, borderRadius: 16, paddingVertical: 12, alignItems: 'center' },
  addText: { color: '#fff', fontWeight: '700' }
})