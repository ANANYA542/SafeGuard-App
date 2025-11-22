import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import PressOnButton from '../components/PressonButton';

const { width, height } = Dimensions.get('window');

export default function VideoScreen({ navigation }) {
  return (
    <View style={styles.container}>
     
      <Video
        source={require('../assets/bg1.mov')} 
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />


      <TouchableOpacity
        style={styles.rakshakButton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Rakshak</Text>
      </TouchableOpacity>


      <PressOnButton onPress={() => console.log("Press On button pressed!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  rakshakButton: {
    position: 'absolute',
    bottom: 400, 
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
