import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarScreen from './screens/CalendarScreen'; // Import Calendar screen
import 'react-native-get-random-values';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>  {/* Wrap your app with NavigationContainer */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#FF7F50',
          inactiveTintColor: 'gray',
          style: { paddingBottom: 5, paddingTop: 5, height: 60 },
        }}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;