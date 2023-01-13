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

export const SpecialAnimation_0a = () => {
    // useContext API
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Special _ 0
    const special_0a = useRef(new Animated.ValueXY({ x: -1000, y: 0 })).current;
    const [posY_0a, setPosY_0a] = useState(0);
    const [posX_0a, setPosX_0a] = useState(0);
    const [opacityAnim_0a] = useState(new Animated.Value(1));
    const specialAnimation_0a = useRef(null);
    const isPowerInProgress_0a = useRef(false)
    let timeoutId_0a;


    const [obj1, setObj1] = useState({x: 0, y: 0});

    useEffect(() => {
        // This function will be called on every animation frame
        const update = () => {
            setObj1({
                x: sharedState.current.charX + 300,
                y: sharedState.current.charY,
            });

            requestAnimationFrame(update);
        };
        update();
    }, [])

    const runspecialAnimation_0a = (x, y) => {
        if (isPowerInProgress_0a.current) {
            special_0a.setValue({ x: x - WidthRatio(65), y: y });
            opacityAnim_0a.setValue(1)
            specialAnimation_0a.current = Animated.parallel([
                Animated.timing(special_0a.x, {
                    toValue: 500, // or any other value you want to animate to
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(special_0a.y, {
                    toValue: sharedState.current.charY, // or any other value you want to animate to
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(opacityAnim_0a, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start(() => {
                if (timeoutId_0a) {
                    clearTimeout(timeoutId_0a);
                }
                timeoutId_0a = setTimeout(() => {
                    runspecialAnimation_0a(sharedState.current.charX + 300, sharedState.current.charY);
                }, 200)
            });
        } else {
            clearTimeout(timeoutId_0a);
            return;
        }
    };

    useEffect(() => {
        if (sharedState.current.specialActive_0) {
            console.log("specialActive_0")
            isPowerInProgress_0a.current = true;
            runspecialAnimation_0a(sharedState.current.charX + 300, sharedState.current.charY);
        } else {
            console.log("Stopping")
            isPowerInProgress_0a.current = false;
            setSharedState({
                s0a_x: null,
                s0a_y: null,
                s0a_Height: null,
                s0a_Width: null
            })
        }
    }, [sharedState.current.specialActive_0]);
    

    useEffect(() => {
        // Only way to pass posX_0a and posY_0a as integers 
        special_0a.addListener((value) => {
            setPosX_0a(value.x)
            setPosY_0a(value.y)
        });
    }, [special_0a])

    useEffect(() => {
        setSharedState({
            s0a_x: posX_0a,
            s0a_y: posY_0a,
            s0a_Height: 15,
            s0a_Width: 15
        })
    }, [posX_0a, posY_0a])

    return (
        <>
        {isPowerInProgress_0a.current &&
            <Animated.View
                style={[
                    {...Styling.projectile_obstacle_block, opacity: opacityAnim_0a},
                    {
                        transform: [{ translateX: special_0a.x }, { translateY: special_0a.y }],
                    },
                ]}
            >
                <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: 15, width: 15 }} />
            </Animated.View>
        }
            <View></View>
        </>
    )
}
