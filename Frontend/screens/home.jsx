import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx'; 
import AllSafeFeed from '../components/safefeed.jsx'; 
import SafetyMonitor from '../components/safetymonitor.jsx';
import FeatureBoxes from '../components/features.jsx';
import ActivityMonitorButton from '../components/ActivityMonitor.jsx';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header at the top */}
      <Header />

      {/* AllSafeFeed directly below header */}
      <View style={{ width: width, height: height * 0.3 }}> 
        <AllSafeFeed />
      </View>
      <SafetyMonitor />
      <FeatureBoxes />
      <ActivityMonitorButton onPress={() => { /* Handle press */ }} />

      {/* Optional scrollable content below the feed */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
        {/* Add other content here if needed */}
      </ScrollView>


      {/* Footer at the bottom */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
