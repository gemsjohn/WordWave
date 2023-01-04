import React, { useState, useRef } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
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
  PanResponder 
} from 'react-native';


export const Game = (props) => {
  // Setup
  const [loadingComplete, setLoadingComplete] = useState(false)
  let newY;

  setTimeout(() => {
    setLoadingComplete(true)
  }, 1000)

  const JoyStickTest = () => {

    const objectPosition = useRef({ x: 0, y: 0 });
    let yInit = [];

    const [posY, setPosY] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const dx = new Animated.Value(0);
    const dy = new Animated.Value(0);

    dx.setValue(
      pan.x.interpolate({
        inputRange: [-Infinity, 0, Infinity],
        outputRange: [0, 0, pan.x],
      })
    );
    dy.setValue(
      pan.y.interpolate({
        inputRange: [-Infinity, 0, Infinity],
        outputRange: [0, 0, pan.y],
      })
    );


    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {

          yInit.push(gestureState.moveY);
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: 0,
            y: pan.y._value
          });
        },
        onPanResponderMove: (e, gestureState) => {
          newY = gestureState.moveY - yInit[0];
          if (newY <= 0) {
            newY = 0;
          } else if (newY >= 360) {
            newY = 360;
          }

          // Update the object's position in state
          objectPosition.current = { x: 0, y: newY };
          setPosY(Math.trunc(objectPosition.current.y));


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


    return (
      <View style={Styling.joyStickContainer}>
        {/* <HandleScore score={score._value} /> */}
        <View style={Styling.boxContainer}>
          <Animated.View
            style={{
              transform: [{ translateX: 480 }, { translateY: posY }]

            }}
            {...panResponder.panHandlers}
          >
            <View style={{ right: windowWidth - 100, top: 0, flexDirection: 'row' }} >
              <Image source={require('../../assets/Char_0.png')} style={{ height: 42, width: 62 }} />
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 4, height: 23, width: 29, borderRadius: 10, left: -95, top: 16 }}>
                <Text style={{ color: '#ccff33', fontSize: 10 }}>{posY}</Text>
              </View>
            </View>
            <View style={Styling.box} />

          </Animated.View>

        </View>
        {/* <AnimateBlocks charY={posY} /> */}
        {/* {startGame && <AnimateBlocks charY={posY} />} */}


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
        <Image
          source={require('../../assets/background_0.png')}
          style={{ position: 'absolute', zIndex: -10, left: -10 }}
        />
        {loadingComplete ?
          // <JoyStickTest /> 
          <>
            {/* GUIDE LINES START */}
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: windowHeight / 2 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: windowWidth / 2 }} />
            {/* GUIDE LINES START */}
            <JoyStickTest />
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