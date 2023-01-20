import React, { useState, useRef, useEffect, useLayoutEffect, createContext, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import moment  from 'moment';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { CharacterAndJoystick } from './CharacterAndJoystick';
import { Special } from './Special';
import { Simple } from './Simple';
import { Projectile } from './Projectile';
import { Stage_2_Projectile } from './Stage_2_Projectile';
import { CountdownTimer } from './CountdownTimer';

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
  const [retainUpgradeToSpecial_0, setRetainUpgradeToSpecial_0] = useState(false)
  const upgradeToSpecial_0 = useRef(null);

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

  useEffect(() => {
    const intervalCheckUpgradeToSpecial_0 = setInterval(() => {
      setRetainUpgradeToSpecial_0(sharedStateRef.current.upgradeToSpecial_0);
      // if (upgradeToSpecial_0.current != sharedStateRef.current.upgradeToSpecial_0) {
      //   console.log("Hanlde Special Display")
      //   setRetainUpgradeToSpecial_0(sharedStateRef.current.upgradeToSpecial_0);
      //   upgradeToSpecial_0.current = sharedStateRef.current.upgradeToSpecial_0;
      // }

    }, 250)

    
  }, [])


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
          source={require('../../assets/background_4.png')}
          style={{ position: 'absolute', zIndex: -10, left: -10, top: -200 }}
        />
        {loadingComplete ?
          <>

            <SharedStateContext.Provider 
              value={{ sharedState: sharedStateRef, setSharedState }}
            >             
              <CharacterAndJoystick />

              
              {retainUpgradeToSpecial_0 &&
                <Special />
              }
              <Projectile />
              {/* <Stage_2_Projectile /> */}
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