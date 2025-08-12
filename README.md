# SafeGuard: Sensor-Based Accident and Attack Detection App

## Project Overview  
SafeGuard is a cross-platform mobile app built with React Native that enhances personal safety by detecting accidents and attacks using smartphone sensors. It monitors accelerometer, gyroscope, microphone, and GPS data to identify emergencies and automatically alerts emergency contacts with the user’s location.

A backend server built with Node.js handles alert notifications and stores incident data in a MongoDB database for record-keeping and analysis.

## Features  
- Accident detection via accelerometer and gyroscope  
- Attack detection using microphone audio patterns  
- Real-time location tracking with GPS  
- Automatic alerts to emergency contacts via SMS and notifications  
- Manual panic button for immediate help  
- Incident logging and storage on backend server  

## Technologies  
- React Native with Expo for mobile app development  
- Node.js and Express.js for backend API and alert management  
- MongoDB for storing user profiles, emergency contacts, and incident logs  
- Expo Sensor APIs (Accelerometer, Gyroscope, Location, Audio)  
- AsyncStorage for local caching  
- Push notification and SMS integration via third-party services  

## Data Handling  
- Continuous sensor data streams for movement and sound analysis on the device  
- Processed features sent to backend for incident logging  
- Location data included in alerts  
- MongoDB stores incident reports and user data securely  

## Expected Outcome  
A reliable, sensor-driven safety app with a robust backend system that detects emergencies, sends timely alerts, and maintains incident records for improved personal safety.

---

