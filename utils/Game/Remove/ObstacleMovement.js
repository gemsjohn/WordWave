import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../../Styling';
import { Navbar } from '../../../components/Navbar';
import { getTerm } from '../../../Localization';
import { shuffle } from 'lodash';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1 } from '../CollisionHandler';
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
    StyleSheet
} from 'react-native';

export const MovementA = () => {
    // [DESCRIPTION]: Sharp angular movement. Springs into place. Quick straight dash to the left.
    const pan = useRef(new Animated.ValueXY()).current;

    const startAnimation = () => {
        // Initial position of the animated object
        pan.setValue({ x: 1000, y: 0 });

        Animated.sequence([
            Animated.spring(pan, {
                toValue: { x: 500, y: 300 },
                bounciness: 20,
                speed: 20,
                useNativeDriver: true,
            }),
            Animated.timing(pan.x, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(pan, {
                toValue: { x: -80, y: 300 },
                bounciness: 20,
                speed: 20,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyles = {
        transform: pan.getTranslateTransform()
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Text>AnimatedValueXY</Text>
            </Animated.View>
            <Text onPress={startAnimation}>Start Animation</Text>
        </View>
    )
}

export const MovementB = () => {
    // [DESCRIPTION]: Angular movement, right to left.
    const pan = useRef(new Animated.ValueXY()).current;

    const startAnimation = () => {
        // Initial position of the animated object
        let localYPos_0 = Math.floor(Math.random() * windowHeight * 0.78);
        let localYPos_1 = Math.floor(Math.random() * windowHeight * 0.78);

        pan.setValue({ x: 1000, y: localYPos_0 });

  
        Animated.sequence([
          Animated.timing(pan, {
            toValue: {x: 0, y: localYPos_1},
            duration: 2500,
            useNativeDriver: true,
          }),
        ]).start();
      };
  
      const animatedStyles = {
          transform: pan.getTranslateTransform()
      }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Text>AnimatedValueXY</Text>
            </Animated.View>
            <Text onPress={startAnimation}>Start Animation</Text>
        </View>
    )
}
export const MovementC = () => {
    // [DESCRIPTION]: Angular movement, right to left.
    const pan = useRef(new Animated.ValueXY()).current;

    const startAnimation = () => {
      // Initial position of the animated object
      pan.setValue({ x: 500, y: 200 });

      // Animation configuration
      Animated.timing(pan, {
        toValue: { x: 0, y: 300 },
        duration: 4000,
        useNativeDriver: true,
      }).start();
    };

    // x = A * cos(t) + B
    // y = C * sin(t) + D
    const x = pan.x.interpolate({
        inputRange: [0, 1],
        outputRange: [500, 100],
    });

    const y = pan.y.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    const animatedStyles = {
        transform: [
            { translateX: x },
            { translateY: 100 },
        ],
        // transform: pan.getTranslateTransform()
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Text>AnimatedValueXY</Text>
            </Animated.View>
            <Text onPress={startAnimation}>Start Animation</Text>
        </View>
    )
}

export const MovementD = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    let localYPos_0 = Math.floor(Math.random() * windowHeight * 0.78);
    let localYPos_1 = Math.floor(Math.random() * windowHeight * 0.78);
    console.log("0: " + localYPos_0 + " 1: " + localYPos_1)

    const startAnimation = () => {
      // Initial position of the animated object
      pan.setValue({ x: 1000, y: localYPos_0 });

      Animated.parallel([
        Animated.timing(pan.x, {
          toValue: -80,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pan.y, {
            toValue: localYPos_1,
            duration: 2500,
            useNativeDriver: true,
        }),
        
      ]).start();
    };

    const animatedStyles = {
        // transform: pan.getTranslateTransform()
        transform: [
            { translateX: pan.x },
            { translateY: pan.y },
        ],
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Text>Animated Curve</Text>
            </Animated.View>
            <Text onPress={startAnimation}>Start Animation</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});