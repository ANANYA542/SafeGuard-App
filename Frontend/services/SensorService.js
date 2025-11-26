import { Accelerometer, Gyroscope } from 'expo-sensors'
import { Audio } from 'expo-av'
import { triggerSOS } from '../utils/sos'

let accSub = null
let gyroSub = null
let recording = null
let lastImpactAt = 0
let stillnessStart = 0
let gyroHighAt = 0

function mag(x,y,z){ return Math.sqrt(x*x + y*y + z*z) }

export async function startSensors({ acc=true, gyro=true, mic=true }) {
  if (acc && !accSub) {
    Accelerometer.setUpdateInterval(100)
    accSub = Accelerometer.addListener(({ x, y, z }) => {
      const g = mag(x, y, z)
      if (g >= 18) { lastImpactAt = Date.now(); stillnessStart = 0 }
      else if (lastImpactAt && Date.now() - lastImpactAt <= 4000) {
        if (g < 1.5) { if (!stillnessStart) stillnessStart = Date.now(); if (Date.now() - stillnessStart >= 3000) { lastImpactAt = 0; stillnessStart = 0; triggerSOS('accident') } }
        else { stillnessStart = 0 }
      }
    })
  }
  if (gyro && !gyroSub) {
    Gyroscope.setUpdateInterval(100)
    gyroSub = Gyroscope.addListener(({ x, y, z }) => {
      const m = mag(x, y, z)
      if (m > 6.0) gyroHighAt = Date.now()
    })
  }
  if (mic && !recording) {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
      const rec = new Audio.Recording()
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality)
      await rec.startAsync()
      recording = rec
      const metering = setInterval(async () => {
        try {
          const s = await rec.getStatusAsync()
          const amp = s.metering ? Math.min(1, Math.max(0, (s.metering + 160) / 80)) : 0
          if (amp > 0.65 && gyroHighAt && Date.now() - gyroHighAt < 800) { gyroHighAt = 0; triggerSOS('attack') }
        } catch {}
      }, 200)
      recording._meteringInterval = metering
    } catch {}
  }
}

export async function stopSensors() {
  if (accSub) { accSub.remove(); accSub = null }
  if (gyroSub) { gyroSub.remove(); gyroSub = null }
  if (recording) { try { await recording.stopAndUnloadAsync() } catch {} if (recording._meteringInterval) clearInterval(recording._meteringInterval); recording = null }
  lastImpactAt = 0; stillnessStart = 0; gyroHighAt = 0
}
