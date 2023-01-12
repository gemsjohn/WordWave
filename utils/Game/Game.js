import React, { useState, useRef, useEffect, useLayoutEffect, createContext, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { CharacterAndJoystick } from './CharacterAndJoystick';
import { Special } from './Special';
import { Simple } from './Simple';
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

  // const charX = useRef(0);
  // const charY = useRef(0);
  // const charHeight = useRef(0);
  // const charWidth = useRef(0);

  const [charX, setCharX] = useState(0)
  const [charY, setCharY] = useState(0)
  const [charHeight, setCharHeight] = useState(0)
  const [charWidth, setCharWidth] = useState(0)

  
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

  const characterInterval = useRef(null);
  useEffect(() => {
    characterInterval.current = setInterval(() => {
      setCharX(sharedStateRef.current.charX)
      setCharY(sharedStateRef.current.charY)
      setCharHeight(sharedStateRef.current.charHeight)
      setCharWidth(sharedStateRef.current.charWidth)

  }, 1)

    // Return a function that cleans up the effect
    return () => {
      clearInterval(characterInterval.current);
    };
  }, []);



  const setSharedState = (newState) => {
    sharedStateRef.current = {...sharedStateRef.current, ...newState};
  };


  // useEffect(() => {
  //   console.log(sharedStateRef.current)
  // }, [sharedStateRef.current])

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
              {/* <Simple 
                charX={charX + 191} 
                charY={charY} 
                charHeight={charHeight}
                charWidth={charWidth}
              /> */}
              <Special 
                charX={charX + 191} 
                charY={charY} 
                charHeight={charHeight}
                charWidth={charWidth}
              />
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