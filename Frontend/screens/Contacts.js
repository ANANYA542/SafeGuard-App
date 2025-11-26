import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import { Swipeable } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newRelation, setNewRelation] = useState('')

  useEffect(() => { loadContacts() }, [])
  async function loadContacts() {
    try {
      const json = await AsyncStorage.getItem('@sg_contacts')
      if (json) setContacts(JSON.parse(json))
      else {
        const defaults = [
          { id: 'sample-1', name: 'Sarah Connor', phone: '9999999999', relation: 'Mother' },
          { id: 'sample-2', name: 'John Miller', phone: '8888888888', relation: 'Friend' },
          { id: 'sample-3', name: 'Dr. Evelyn Reed', phone: '7777777777', relation: 'Doctor' }
        ]
        setContacts(defaults)
        await AsyncStorage.setItem('@sg_contacts', JSON.stringify(defaults))
      }
    } catch {}
  }
  async function saveContacts(next) {
    setContacts(next)
    try { await AsyncStorage.setItem('@sg_contacts', JSON.stringify(next)) } catch {}
  }
  async function remove(id) { const next = contacts.filter(c => c.id !== id); await saveContacts(next) }
  async function addContact() {
    if (!newName || !newPhone) return
    const next = [...contacts, { id: String(Date.now()), name: newName, phone: newPhone, relation: newRelation }]
    await saveContacts(next)
    setModalVisible(false)
    setNewName(''); setNewPhone(''); setNewRelation('')
  }

  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={20} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <View style={styles.iconBtn} />
      </View>
      <FlatList data={contacts} keyExtractor={i => i.id} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} renderItem={({ item }) => (
        <Swipeable renderRightActions={() => <TouchableOpacity onPress={() => remove(item.id)} style={styles.delete}><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>}>
          <LinearGradient colors={["#141C2E", "#1B2A45", "#2A2E5C", "#412A3A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.card}>
            <View style={styles.avatar}><Ionicons name="person" size={22} color="#fff" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.relation ? item.relation : item.phone}</Text>
            </View>
          </LinearGradient>
        </Swipeable>
      )} />
      <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}><Text style={styles.addText}>Add New Contact</Text></TouchableOpacity>
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Contact</Text>
            <TextInput placeholder="Name" placeholderTextColor="#98A2B3" value={newName} onChangeText={setNewName} style={styles.input} />
            <TextInput placeholder="Phone" placeholderTextColor="#98A2B3" value={newPhone} onChangeText={setNewPhone} keyboardType="phone-pad" style={styles.input} />
            <TextInput placeholder="Relation (optional)" placeholderTextColor="#98A2B3" value={newRelation} onChangeText={setNewRelation} style={styles.input} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: 'rgba(255,255,255,0.12)' }]} onPress={() => { setModalVisible(false); setNewName(''); setNewPhone(''); setNewRelation('') }}><Text style={styles.modalBtnText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#2F80ED' }]} onPress={addContact}><Text style={styles.modalBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  card: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 12, borderRadius: 16, marginVertical: 8, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700', color: '#fff' },
  phone: { fontSize: 13, color: '#98A2B3', marginTop: 4 },
  delete: { backgroundColor: '#EB5757', justifyContent: 'center', alignItems: 'center', width: 80, borderRadius: 12, marginLeft: 8 },
  deleteText: { color: '#fff', fontWeight: '700' },
  add: { position: 'absolute', bottom: 28, left: 16, right: 16, backgroundColor: '#2F80ED', borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  addText: { color: '#fff', fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '88%', backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 16 },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  input: { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: '#fff' },
  modalBtn: { borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 },
  modalBtnText: { color: '#fff', fontWeight: '700' }
})
