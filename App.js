import React, { createContext, useEffect, useRef } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/link-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameScreen } from './pages/game/Game';
import { HomeScreen } from './pages/home/Home';
import { LeaderScreen } from './pages/leader/Leader';
import { ProfileScreen } from './pages/profile/Profile';
import { Auth } from './pages/auth/auth';

export const MainStateContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const mainStateRef = useRef({});
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

  const setMainState = (newState) => {
    mainStateRef.current = { ...mainStateRef.current, ...newState };
  };

  

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <MainStateContext.Provider
          value={{ mainState: mainStateRef, setMainState }}>
        <NavigationContainer theme={MyTheme} onStateChange={(state) => {console.log('New state is', state.routes)}}>
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
        cardStyleInterpolator: forFade,
        animationEnabled: false,
      }}
        >
        <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
        animationEnabled: false,
        headerShown: false,
        orientation: 'portrait_up'
      }}
        />
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
        animationEnabled: false,
        headerShown: false,
        orientation: 'landscape'
      }}
        />
        <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
        animationEnabled: false,
        headerShown: false,
        orientation: 'landscape'
      }}
        />
        <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
        animationEnabled: false,
        headerShown: false,
        orientation: 'portrait_up'
      }}
        />
        <Stack.Screen
        name="Leader"
        component={LeaderScreen}
        options={{
        animationEnabled: false,
        headerShown: false,
        orientation: 'portrait_up'
      }}
        />

        </Stack.Navigator>
        </NavigationContainer>
        </MainStateContext.Provider>
      </ApolloProvider>
    </>
  );
}
