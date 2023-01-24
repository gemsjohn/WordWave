import React from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/link-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen, GameScreen, RequestScreen, ProfileScreen, AuthScreen } from './utils/index';
import { getTerm } from './Localization/index';


const Stack = createNativeStackNavigator();

export default function App() {
  const language = 'en';

  const GRAPHQL_API_URL = 'https://cosmicbackend.herokuapp.com/graphql';
  const asyncAuthLink = setContext(async () => {
    return {
      headers: {
        Authorization: await AsyncStorage.getItem('@storage_Key'),
      },
    };
  });


  const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL,
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: asyncAuthLink.concat(httpLink),
  });

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#001219',
      notification: 'rgb(255, 69, 58)',
    },
  };


  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={`${getTerm('home', language, 'title')}`}>
          <Stack.Screen
            name={`${getTerm('auth', language, 'title')}`}
            component={AuthScreen}
            options={{
              animationEnabled: false,
              headerShown: false,
              orientation: 'portrait_up'
            }}
          />
          <Stack.Screen
            name={`${getTerm('home', language, 'title')}`}
            component={HomeScreen}
            options={{
              animationEnabled: false,
              headerShown: false,
              orientation: 'landscape'
            }}
          />
          <Stack.Screen
            name={`${getTerm('game', language, 'title')}`}
            component={GameScreen}
            options={{
              animationEnabled: false,
              headerShown: false,
              orientation: 'landscape'
            }}
          />
          <Stack.Screen
            name={`${getTerm('profile', language, 'title')}`}
            component={ProfileScreen}
            options={{
              animationEnabled: false,
              headerShown: false,
              orientation: 'portrait_up'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


