import React, { useState, useRef, useEffect, useLayoutEffect, createContext } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isPowerColliding_0, isPowerColliding_1, isPowerColliding_2, isPowerColliding_3 } from './CollisionHandler';
import { MovementA, MovementB, MovementC, MovementD } from './ObstacleMovement';
import { Projectile } from './Projectile';
import { PowerUps } from './PowerUps';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  Image,
  ActivityIndicator,
  Animated,
  PanResponder,
  UIManager,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacityBase
} from 'react-native';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const SharedStateContext = createContext();

export const Game = (props) => {
  // Setup
  // const [sharedState, setSharedState] = useState({status: "a"});
  const sharedStateRef = useRef({});
  const [loadingComplete, setLoadingComplete] = useState(false)
  let newY;
  let newX;
  let charHeight = 38;
  let charWidth = 62;
  const powerup_0 = useRef(null);
  let timeoutId_0;
  


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


  const CharacterAndJoystick = () => {

    const objectPosition = useRef({ x: 0, y: 0 });
    let yInit = [];
    let xInit = [];
    const xValue = useRef(new Animated.Value(0)).current;
    const yValue = useRef(new Animated.Value(0)).current;
    const powerup_0 = useRef(new Animated.ValueXY({ x: -1000, y: 0 })).current;
    const powerupAnimation_0 = useRef(null);
    const isPowerInProgress_0 = useRef(false)
    const [posY, setPosY] = useState(0);
    const [posX, setPosX] = useState(0);
    const posYRef = useRef(0);
    const posXRef = useRef(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const dx = new Animated.Value(0);
    const dy = new Animated.Value(0);

    dx.setValue(
      pan.x.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      })
    );
    dy.setValue(
      pan.y.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      })
    );



    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          yInit.push(gestureState.moveY);
          xInit.push(gestureState.moveX);
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x.value,
            y: pan.y._value
          });
        },
        onPanResponderMove: (e, gestureState) => {
          newY = gestureState.moveY - yInit[0];
          newX = gestureState.moveX - xInit[0];
          xValue.current = newX;
          yValue.current = newY;

          if (newY <= 0) {
            newY = 0;
          } else if (newY >= (windowHeight * 0.78)) {
            newY = (windowHeight * 0.78);
          }

          if (newX <= -(windowWidth * 0.207)) {
            newX = -(windowWidth * 0.207);
          } else if (newX >= 0) {
            newX = 0;
          }

          // Update the object's position in state
          objectPosition.current = { x: newX, y: newY };
          setPosY(Math.trunc(objectPosition.current.y));
          setPosX(Math.trunc(objectPosition.current.x))

          posYRef.current = Math.trunc(objectPosition.current.y);
          posXRef.current = Math.trunc(objectPosition.current.x)

          Animated.event(
            [
              null,
              {
                dx,
                dy
              },
            ],
            { useNativeDriver: false }
          )(e, gestureState);

        },
        onPanResponderRelease: (e, gestureState) => {
          pan.flattenOffset();
        }
      })
    ).current;

    const runPowerupAnimation_0 = (x, y) => {
      if (isPowerInProgress_0.current) {
        // console.log("x: " +  x + " y: " + y)
        // console.log("runPowerupAnimation_0")
        powerup_0.setValue({ x: x - WidthRatio(65), y: y });
        powerupAnimation_0.current = Animated.parallel([
          Animated.timing(powerup_0.x, {
            toValue: 1000, // or any other value you want to animate to
            duration: 2000,
            useNativeDriver: false
          }),
          Animated.timing(powerup_0.y, {
            toValue: posYRef.current, // or any other value you want to animate to
            duration: 2000,
            useNativeDriver: false
          })
        ]).start(() => {
          if (timeoutId_0) {
            clearTimeout(timeoutId_0);
          }
          timeoutId_0 = setTimeout(() => {
            runPowerupAnimation_0(posXRef.current, posYRef.current);
          }, 200)
        });
      } else {
        clearTimeout(timeoutId_0);
        return;
      }
    };

    

    useEffect(() => {
      if (sharedStateRef.current) {
          console.log("Shared from Game: ")
          console.log(sharedStateRef.current)
          if (sharedStateRef.current.powerupActive_0) {
            isPowerInProgress_0.current = true;
            runPowerupAnimation_0(posXRef.current, posYRef.current);
          } else if (!sharedStateRef.current.powerupActive_0) {
            console.log("Stopping")
            isPowerInProgress_0.current = false;
            
          }
      }
    }, [sharedStateRef.current]);

    console.log(powerup_0)
    const [objPower_0, setObjPower_0] = useState({
      x: powerup_0.x,
      y: powerup_0.y,
      width: 15,
      height: 15
    });


    useEffect(() => {
      setObjPower_0({
        x: powerup_0.x,
        y: powerup_0.y,
        width: 15,
        height: 15
      });
    }, [powerup_0]);

    

    useLayoutEffect(() => {
      console.log(objPower_0)
    }, [objPower_0]);


    return (
      <View style={Styling.joystick_container}>
        <View style={Styling.joystick_inner_container}>
          <Animated.View
            style={{
              transform: [
                { translateX: posX + 480 },
                { translateY: posY + 10 }
              ]


            }}
            {...panResponder.panHandlers}
          >
            <View style={{ right: windowWidth - 250, top: 0, flexDirection: 'row' }} >
              <Image source={require('../../assets/Char_0.png')} style={{ height: charHeight, width: charWidth }} />
              {/* <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 4, height: 23, width: 29, borderRadius: 10, left: -95, top: 16 }}>
                <Text style={{ color: '#ccff33', fontSize: 10 }}>{posY}</Text>
              </View> */}
            </View>
            <View style={Styling.joystick_knob} />

          </Animated.View>
          <Animated.View
            style={[
              Styling.projectile_obstacle_block,
              {
                transform: [{ translateX: powerup_0.x }, { translateY: powerup_0.y }],
              },
            ]}
          >
            <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: 15, width: 15 }} />
          </Animated.View>

        </View>
        <SharedStateContext.Provider value={{ sharedState: sharedStateRef, setSharedState }}>
          <PowerUps charY={posY + 10} charX={posX + 480} charHeight={charHeight} charWidth={charWidth} />
          <Projectile charY={posY + 10} charX={posX + 480} charHeight={charHeight} charWidth={charWidth} />
        </SharedStateContext.Provider>
      </View>
    );
  }


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
        {/* <View style={{position: 'absolute', zIndex: -5, backgroundColor: 'red', height: 10, width: 10, top: windowHeight / 2, left: windowWidth / 2}} /> */}

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

            {/* Zone Box */}

            {/* <View style={{ 
              // backgroundColor: 'rgba(0, 0, 0, 0.25)', 
              width: 1, 
              height: (364 + charHeight), 
              width: 212, 
              position: 'absolute', 
              zIndex: -5, 
              left: 40, 
              top: 10,
              borderRadius: 8,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(0, 255, 255, 0.50)' 
            }} /> */}
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



            {/* GUIDE LINES START */}
            <CharacterAndJoystick />
          </>
          :
          <View style={{ width: windowWidth, height: windowHeight }}>
            <ActivityIndicator size="large" color="#00ff00" style={{ position: 'absolute', top: windowHeight / 2 - 20, left: windowWidth / 2 - 20 }} />
          </View>
        }
      </View>
      <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('game', props.lang, 'title')}`} language={props.lang} />

      {/* <View style={{ height: HeightRatio(40) }} /> */}
    </>
  );
}