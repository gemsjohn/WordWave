import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, GameScreen, RequestScreen, ProfileScreen } from './utils/index';
import { getTerm } from './Localization/index';


const Stack = createNativeStackNavigator();

export default function App() {
  const language = 'en';
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`${getTerm('home', language, 'title')}`}>
        <Stack.Screen
          name={`${getTerm('home', language, 'title')}`}
          component={HomeScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={`${getTerm('game', language, 'title')}`}
          component={GameScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={`${getTerm('profile', language, 'title')}`}
          component={ProfileScreen}
          options={{
            animationEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


