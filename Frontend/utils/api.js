import { Platform } from 'react-native'

const IOS = 'ios'
const ANDROID = 'android'

export const API_BASE = Platform.OS === ANDROID ? 'http://10.0.2.2:4000' : 'http://localhost:4000'
