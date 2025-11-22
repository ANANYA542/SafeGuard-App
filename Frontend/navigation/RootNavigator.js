import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useColorScheme } from 'react-native'
import HomeScreen from '../screens/Home'
import SafetyMonitorScreen from '../screens/SafetyMonitor'
import KnowYourAreaScreen from '../screens/KnowYourArea'
import DailyReportsScreen from '../screens/DailyReports'
import NearbyUsersScreen from '../screens/NearbyUsers'
import ActivityMonitorScreen from '../screens/ActivityMonitor'
import SOSScreen from '../screens/SOS'
import AlarmScreen from '../screens/Alarm'
import LocationScreen from '../screens/Location'
import SettingsScreen from '../screens/Settings'
import ContactsScreen from '../screens/Contacts'
import FAQsScreen from '../screens/FAQs'
import ProfileScreen from '../screens/Profile'
import { Ionicons } from '@expo/vector-icons'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2F80ED', tabBarStyle: { borderTopWidth: 0, backgroundColor: 'rgba(255,255,255,0.9)' } }}>
      <Tab.Screen name="Alarm" component={AlarmScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="alarm-outline" color={color} size={size} /> }} />
      <Tab.Screen name="SOS" component={SOSScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="call-outline" color={color} size={size} /> }} />
      <Tab.Screen name="Location" component={LocationScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} /> }} />
    </Tab.Navigator>
  )
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SafetyMonitor" component={SafetyMonitorScreen} />
      <Stack.Screen name="DailyReports" component={DailyReportsScreen} />
      <Stack.Screen name="NearbyUsers" component={NearbyUsersScreen} />
      <Stack.Screen name="ActivityMonitor" component={ActivityMonitorScreen} />
      <Stack.Screen name="Alarm" component={AlarmScreen} />
      <Stack.Screen name="SOS" component={SOSScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="QuickActions" component={BottomTabs} />
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  const scheme = useColorScheme()
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Main" component={MainStack} />
        <Drawer.Screen name="KnowYourArea" component={KnowYourAreaScreen} />
        <Drawer.Screen name="FAQs" component={FAQsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}