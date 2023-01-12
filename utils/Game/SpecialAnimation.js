import React, { useState, useRef, useEffect, useContext, useLayoutEffect, createContext } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isPowerColliding_0, isPowerColliding_1, isPowerColliding_2, isPowerColliding_3 } from './CollisionHandler';
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

export const SpecialAnimation = (props) => {
    // useContext API
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Special _ 0
    const special_0 = useRef(new Animated.ValueXY({ x: -1000, y: 0 })).current;
    const specialAnimation_0 = useRef(null);
    const isPowerInProgress_0 = useRef(false)
    const posYRef_0 = useRef(0);
    const posXRef_0 = useRef(0);
    let timeoutId_0;
    const specialPosInterval_0 = useRef(null);

    useEffect(() => {
        posXRef_0.current = props.charX - 100;
        posYRef_0.current = props.charY;

    }, [props])


    const runSpecialAnimation_0 = (x, y) => {
        if (isPowerInProgress_0.current) {
            special_0.setValue({ x: x - WidthRatio(65), y: y });
            specialAnimation_0.current = Animated.parallel([
                Animated.timing(special_0.x, {
                    toValue: 1000, // or any other value you want to animate to
                    duration: 2000,
                    useNativeDriver: false
                }),
                Animated.timing(special_0.y, {
                    toValue: posYRef_0.current, // or any other value you want to animate to
                    duration: 2000,
                    useNativeDriver: false
                })
            ]).start(() => {
                if (timeoutId_0) {
                    clearTimeout(timeoutId_0);
                }
                timeoutId_0 = setTimeout(() => {
                    runSpecialAnimation_0(posXRef_0.current, posYRef_0.current);
                }, 200)
            });
        } else {
            clearTimeout(timeoutId_0);
            return;
        }
    };



    useEffect(() => {
        if (sharedState.current) {
            console.log("Shared from Game: ")
            console.log(sharedState.current)
            if (sharedState.current.specialActive_0) {
                isPowerInProgress_0.current = true;
                runSpecialAnimation_0(posXRef_0.current, posYRef_0.current);
                // specialPosInterval_0.current = setInterval(() => {
                //     // console.log(special_0)
                //     setSharedState({
                //         special_0: special_0
                //     })
                // }, 20)
            } else if (!sharedState.current.specialActive_0) {
                console.log("Stopping")
                isPowerInProgress_0.current = false;
                // clearInterval(specialPosInterval_0.current);
                // specialPosInterval_0.current = null;

            }
        }
    }, [sharedState.current]);

    // useEffect(() => {
    //     setSharedState({
    //         special_0_x: special_0.x,
    //         special_0_y: special_0.y
    //     })
    //     console.log(special_0)
    // }, [special_0])



    //   console.log(special_0)
    //   const [objPower_0, setObjPower_0] = useState({
    //     x: special_0.x,
    //     y: special_0.y,
    //     width: 15,
    //     height: 15
    //   });


    //   useEffect(() => {
    //     setObjPower_0({
    //       x: special_0.x,
    //       y: special_0.y,
    //       width: 15,
    //       height: 15
    //     });
    //   }, [special_0]);



    //   useLayoutEffect(() => {
    //     console.log(objPower_0)
    //   }, [objPower_0]);

    return (
        <>
            <Animated.View
                style={[
                    Styling.projectile_obstacle_block,
                    {
                        transform: [{ translateX: special_0.x }, { translateY: special_0.y }],
                    },
                ]}
            >
                <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: 15, width: 15 }} />
            </Animated.View>
            <View></View>
        </>
    )
}