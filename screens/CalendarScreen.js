import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as Notifications from 'expo-notifications';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Show date/time pickers and event info input fields
  const openEventModal = (day) => {
    setSelectedDate(day.dateString);
    scheduleNotification("Title", "Body", 1000)
  };



  // Function to schedule notifications
  const scheduleNotification = async (title, body, time) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          actions: [{ identifier: 'start', buttonTitle: 'Start', options: { opensAppToForeground: true } }],
        },
        trigger: { seconds: time }, // Schedule time in seconds
      });
      console.log("Notification scheduled", time)
      return notificationId;
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  // Notification system
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Function to register for push notifications
  const registerForPushNotificationsAsync = async () => {
    try {
      // Check and create notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      // Request permissions for notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted', 'Failed to get push token for push notification!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => openEventModal(day)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Adjust paddingTop to add space at the top
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24, // Increased font size for better readability
    marginBottom: 20, // Adds space below the heading
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5, // Adjusts spacing below each label
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15, // Reduced space between inputs
  },
  transportButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0, // Adds more space above transport buttons
    marginBottom: 0,
  },
  transportButton: {
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedTransportButton: {
    backgroundColor: '#007bff',
  },
  transportButtonText: {
    color: '#000',
  },
  selectedTransportButtonText: {
    color: '#fff',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adds spacing between the two time pickers
    paddingVertical: 10, // Optional: Adjust spacing vertically
  },
  timePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  timePicker: {
    marginLeft: 8, // Adjust spacing between text and DateTimePicker
  },
  modeOfTransportText: {
    marginBottom: 0,
  },
});


export default CalendarScreen;
