import React, { useState, useRef, useEffect, useContext, useLayoutEffect, createContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { SharedStateContext } from './Game';
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

export const CharacterAndJoystick = () => {
    // const sharedStateRef = useRef({});
    const { sharedState, setSharedState } = useContext(SharedStateContext);
    const objectPosition = useRef({ x: 0, y: 0 });
    let yInit = [];
    let xInit = [];
    const xValue = useRef(new Animated.Value(0)).current;
    const yValue = useRef(new Animated.Value(0)).current;
    const [posY, setPosY] = useState(0);
    const [posX, setPosX] = useState(0);
    let newY;
    let newX;
    let charHeight = 38;
    let charWidth = 62;
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

    // useEffect(() => {
    //     if (sharedState.current) {
    //       // do something
    //       console.log(sharedState.current)
    //     }
    // }, [sharedState.current]);

    useEffect(() => {
        setSharedState({
            charX: posX,
            charY: posY,
            charHeight: charHeight,
            charWidth: charWidth
        })
    }, [posY, posX])


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

        </View>
      </View>
    );
  }