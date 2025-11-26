import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, Dimensions, TouchableOpacity } from 'react-native'
import AnimatedGradient from '../components/AnimatedGradient'
import SafetyScoreCircle from '../components/SafetyScoreCircle'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'
import PressOnButton from '../components/PressonButton'

const { width } = Dimensions.get('window')

export default function Home({ navigation }) {
  const [monitoring, setMonitoring] = useState(false)
  const [alertVisible, setAlertVisible] = useState(true)
  return (
    <AnimatedGradient>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.avatarWrap}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Stay Safe, Alex</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      {alertVisible && (
        <MotiView from={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 250 }} style={styles.alertCard}>
          <Text style={styles.alertTitle}>SOS Sent</Text>
          <Text style={styles.alertText}>Your emergency contacts have been notified.</Text>
          <TouchableOpacity onPress={() => setAlertVisible(false)} style={styles.dismissBtn}><Text style={styles.dismissText}>Dismiss</Text></TouchableOpacity>
        </MotiView>
      )}
      <View style={styles.scoreWrap}>
        <SafetyScoreCircle score={92} size={180} color="#56CCF2" />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.scoreTitle}>Safety Score</Text>
        <Text style={styles.scoreSub}>You are in a Safe Zone</Text>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('SafetyMonitor')} style={styles.monitorCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.monitorIcon}><Ionicons name="shield-checkmark" size={20} color="#56CCF2" /></View>
          <Text style={styles.monitorLabel}>Safety Monitoring</Text>
        </View>
        <Switch value={monitoring} onValueChange={setMonitoring} trackColor={{ false: '#3B3F48', true: '#2F80ED' }} thumbColor="#fff" />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.featureCard} onPress={() => navigation.navigate('KnowYourArea')}>
        <View style={styles.featureIcon}><Ionicons name="map-outline" size={20} color="#fff" /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>Know Your Area</Text>
          <Text style={styles.featureSub}>Crime hotspots & info</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.featureCard} onPress={() => navigation.navigate('DailyReports')}>
        <View style={styles.featureIcon}><Ionicons name="bar-chart-outline" size={20} color="#fff" /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>Daily Reports</Text>
          <Text style={styles.featureSub}>View your activity logs</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.featureCard} onPress={() => navigation.navigate('NearbyUsers')}>
        <View style={styles.featureIcon}><Ionicons name="people-outline" size={20} color="#fff" /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>Nearby Users</Text>
          <Text style={styles.featureSub}>Connect with others</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={20} color="#56CCF2" />
          <Text style={[styles.navText, { color: '#56CCF2' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('KnowYourArea')}>
          <Ionicons name="location-outline" size={20} color="#98A2B3" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Contacts')}>
          <Ionicons name="call-outline" size={20} color="#98A2B3" />
          <Text style={styles.navText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-in-outline" size={20} color="#98A2B3" />
          <Text style={styles.navText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Signup')}>
          <Ionicons name="person-add-outline" size={20} color="#98A2B3" />
          <Text style={styles.navText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={20} color="#98A2B3" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <PressOnButton label="SOS" bottom={90} onPress={() => navigation.navigate('SOS')} />
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  headerRow: { marginTop: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  avatarWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  alertCard: { margin: 16, borderRadius: 16, padding: 14, backgroundColor: 'rgba(235,87,87,0.2)', borderWidth: 1, borderColor: 'rgba(235,87,87,0.45)' },
  alertTitle: { color: '#EB5757', fontSize: 14, fontWeight: '700' },
  alertText: { color: '#DCE2F0', fontSize: 13, marginTop: 6 },
  dismissBtn: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#EB5757', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12 },
  dismissText: { color: '#fff', fontWeight: '700' },
  scoreWrap: { alignItems: 'center', marginTop: 4 },
  scoreTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 10 },
  scoreSub: { color: '#56CCF2', fontSize: 13, marginTop: 4 },
  monitorCard: { marginHorizontal: 16, marginTop: 14, padding: 14, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  monitorIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(86,204,242,0.16)', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  monitorLabel: { color: '#fff', fontSize: 14, fontWeight: '600' },
  featureCard: { marginHorizontal: 16, marginTop: 14, padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center' },
  featureIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  featureTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  featureSub: { color: '#98A2B3', fontSize: 12, marginTop: 4 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 74, backgroundColor: '#0B1220', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
  navText: { color: '#98A2B3', fontSize: 12, marginTop: 4 }
})