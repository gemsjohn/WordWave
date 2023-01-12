import React, { useState, useRef, useEffect, useLayoutEffect, createContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { CharacterAndJoystick } from './CharacterAndJoystick';
import {
  View,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  UIManager,
} from 'react-native';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const SharedStateContext = createContext();

export const Game = (props) => {
  const sharedStateRef = useRef({});
  const [loadingComplete, setLoadingComplete] = useState(false)
  
  setTimeout(() => {
    setLoadingComplete(true)
  }, 1000)

  useEffect(() => {
    // This is the effect that should be cleaned up when the component is unmounted
    const timeoutId = setTimeout(() => {
      console.log("MOUNTED")
    }, 1000);

    // Return a function that cleans up the effect
    return () => {
      console.log("UNMOUNTED")
      clearTimeout(timeoutId);
    };
  }, []);

  const setSharedState = (newState) => {
    sharedStateRef.current = {...sharedStateRef.current, ...newState};
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        showHideTransition={'none'}
        hidden={true} />
      {/* BODY */}
      <View style={{}}>
        <Image
          source={require('../../assets/background_0.png')}
          style={{ position: 'absolute', zIndex: -10, left: -10, top: -200 }}
        />
        {loadingComplete ?
          <>
            {/* GUIDE LINES START */}
            {/* CROSS */}
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: windowHeight / 2 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: windowWidth / 2 }} /> */}

            {/* Char Left to Right */}
            {/* <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 40 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 252 }} /> */}

            {/* Char Top to Bottom */}
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 10 }} />
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 412 }} /> */}

            <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 0,
              width: 1,
              height: windowHeight,
              width: 252,
              position: 'absolute',
              zIndex: -5,
              left: 0,
            }} />

            <SharedStateContext.Provider 
              value={{ sharedState: sharedStateRef, setSharedState }}
            >
              <CharacterAndJoystick />
            </SharedStateContext.Provider>
          </>
          :
          <View style={{ width: windowWidth, height: windowHeight }}>
            <ActivityIndicator 
              size="large" 
              color="#00ff00" 
              style={{ 
                position: 'absolute', 
                top: windowHeight / 2 - 20, 
                left: windowWidth / 2 - 20 
              }} 
            />
          </View>
        }
      </View>
      <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('game', props.lang, 'title')}`} language={props.lang} />

      {/* <View style={{ height: HeightRatio(40) }} /> */}
    </>
  );
}