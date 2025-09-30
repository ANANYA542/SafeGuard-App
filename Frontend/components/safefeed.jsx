import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const safetyFeed = [
  "Stay indoors during emergencies",
  "Keep emergency contact numbers handy",
  "Carry a first-aid kit",
  "Inform someone before going out alone",
  "Charge your phone regularly",
  "Have a safe meeting point for family",
];

export default function AllSafeFeed() {
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % safetyFeed.length;
      setCurrentIndex(nextIndex);
      scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000); // scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // prevent manual scrolling
        pagingEnabled={true}  // snap to each card
        contentContainerStyle={styles.scrollContainer}
      >
        {safetyFeed.map((item, index) => (
          <LinearGradient
            key={index}
            colors={['#0D47A1', '#1976D2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.card}
          >
            <Text style={styles.text}>{item}</Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%', 
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    width: width * 0.95,  
    height: height * 0.25,  
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 18, // larger text
    textAlign: 'center',
  },
});
