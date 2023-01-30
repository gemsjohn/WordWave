import React, { useState, useRef, useEffect, useContext, useLayoutEffect, createContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { MainStateContext } from '../../App';
import {
  Text,
  View,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

export const CharacterAndJoystick = () => {
  const { mainState, setMainState } = useContext(MainStateContext);

  let newY;
  let newX;
  let charHeight = HeightRatio(68);
  let charWidth = WidthRatio(24);
  let offset = WidthRatio(190);
  const objectPosition = useRef({ x: 0, y: 0 });
  let yInit = [];
  let xInit = [];
  const xValue = useRef(new Animated.Value(0)).current;
  const yValue = useRef(new Animated.Value(0)).current;
  const [posY, setPosY] = useState(charHeight / 2);
  const [posX, setPosX] = useState(0);

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
      inputRange: [0, 1.0],
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
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (e, gestureState) => {
        newY = gestureState.moveY - yInit[0];
        newX = gestureState.moveX - xInit[0];
        xValue.current = newX;
        yValue.current = newY;

        if (newY <= charHeight / 2) {
          newY = charHeight / 2;
        } else if (newY >= HeightRatio(670)) {
          newY = HeightRatio(670);
        }

        if (newX <= -WidthRatio(64)) {
          newX = -WidthRatio(64);
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


  useEffect(() => {
    setMainState({
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
              { translateX: ((posX - charWidth / 2) + offset) },
              { translateY: posY - charHeight / 2 }
            ]


          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              right: windowWidth - WidthRatio(98),
              top: 0,
              flexDirection: 'row'
            }}>
            <Image
              source={require('../../assets/Char_1.png')}
              style={{ height: charHeight, width: charWidth }} />
            {/* <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 4, height: 23, width: 29, borderRadius: 10, left: -95, top: 16 }}>
                <Text style={{ color: '#ccff33', fontSize: 10 }}>{posY - charHeight/2}</Text>
              </View> */}
          </View>
          <View style={Styling.joystick_knob} />

        </Animated.View>
        {/* GUIDELINES */}
        {/* <View 
            style={{
              borderColor: 'white', 
              borderWidth: 1, 
              position: 'absolute', 
              width: windowWidth, 
              top: posY, 
              left: -400
            }} />
          <View 
            style={{
              borderColor: 'white', 
              borderWidth: 1, 
              position: 'absolute', 
              height: windowHeight, 
              top: 0, 
              left: posX - WidthRatio(64) - charWidth/2
            }} /> */}


      </View>
    </View>
  );
}