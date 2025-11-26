import { Linking } from 'react-native'
import * as Location from 'expo-location'

const SOS_NUMBERS = ['+911234567890', '+91111222333']
const API = 'http://localhost:4000'
let cooldownUntil = 0

export async function triggerSOS(type) {
  const now = Date.now()
  if (now < cooldownUntil) return
  cooldownUntil = now + 15000
  try {
    await Location.requestForegroundPermissionsAsync()
    const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
    const { latitude, longitude } = pos.coords
    const places = await Location.reverseGeocodeAsync({ latitude, longitude })
    const p = places && places[0] ? places[0] : {}
    const address = [p.name, p.street, p.city, p.region, p.postalCode].filter(Boolean).join(', ')
    const time = new Date().toISOString()
    const message = `EMERGENCY (${type.toUpperCase()})\nLat:${latitude.toFixed(5)}, Lng:${longitude.toFixed(5)}\nAddress:${address}\nTime:${time}`

    try { await Linking.openURL(`tel:${SOS_NUMBERS[0]}`) } catch {}
    try {
      const body = encodeURIComponent(message)
      const smsUrl = `sms:${SOS_NUMBERS[1]}?body=${body}`
      await Linking.openURL(smsUrl)
    } catch {}

    try {
      await fetch(`${API}/api/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, latitude, longitude, address, time })
      })
    } catch {}
  } catch {
    try { await Linking.openURL(`tel:${SOS_NUMBERS[0]}`) } catch {}
  }
}

export function getCooldownRemaining() { return Math.max(0, cooldownUntil - Date.now()) }
