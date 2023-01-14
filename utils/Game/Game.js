import React, { useState, useRef, useEffect, useLayoutEffect, createContext, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { CharacterAndJoystick } from './CharacterAndJoystick';
import { Special } from './Special';
import { Simple } from './Simple';
import { Projectile } from './Projectile';
import {
  View,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  UIManager,
} from 'react-native';
import { SpecialAnimation_0a } from './SpecialAnimation_0a';
import { SpecialAnimation_0b } from './SpecialAnimation_0b';


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
      setLoadingComplete(false)
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

            <SharedStateContext.Provider 
              value={{ sharedState: sharedStateRef, setSharedState }}
            >
              <CharacterAndJoystick />
              {/* <Simple /> */}
              <Special />
              <SpecialAnimation_0a />
              {/* <SpecialAnimation_0b /> */}
              <Projectile />
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