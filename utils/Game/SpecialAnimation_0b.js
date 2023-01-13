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

export const SpecialAnimation_0b = () => {
    // useContext API
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Special _ 0
    const special_0b = useRef(new Animated.ValueXY({ x: -1000, y: 0 })).current;
    const [posY_0b, setPosY_0b] = useState(0);
    const [posX_0b, setPosX_0b] = useState(0);
    const [opacityAnim_0b] = useState(new Animated.Value(1));
    const specialAnimation_0b = useRef(null);
    const isPowerInProgress_0b = useRef(false)
    let timeoutId_0b;


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

    const runspecialAnimation_0b = (x, y) => {
        if (isPowerInProgress_0b.current) {
            special_0b.setValue({ x: x - WidthRatio(65), y: y });
            opacityAnim_0b.setValue(1)
            specialAnimation_0b.current = Animated.parallel([
                Animated.timing(special_0b.x, {
                    toValue: 500, // or any other value you want to animate to
                    duration: 600,
                    useNativeDriver: false
                }),
                Animated.timing(special_0b.y, {
                    toValue: sharedState.current.charY, // or any other value you want to animate to
                    duration: 600,
                    useNativeDriver: false
                }),
                Animated.timing(opacityAnim_0b, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: false
                })
            ]).start(() => {
                if (timeoutId_0b) {
                    clearTimeout(timeoutId_0b);
                }
                timeoutId_0b = setTimeout(() => {
                    runspecialAnimation_0b(sharedState.current.charX + 290, sharedState.current.charY);
                }, 200)
            });
        } else {
            clearTimeout(timeoutId_0b);
            return;
        }
    };

    useEffect(() => {
        if (sharedState.current.specialActive_0) {
            console.log("specialActive_0")
            isPowerInProgress_0b.current = true;
            runspecialAnimation_0b(sharedState.current.charX + 300, sharedState.current.charY);
        } else {
            console.log("Stopping")
            isPowerInProgress_0b.current = false;
            setSharedState({
                s0a_x: null,
                s0a_y: null,
                s0a_Height: null,
                s0a_Width: null
            })
        }
    }, [sharedState.current.specialActive_0]);
    

    useEffect(() => {
        // Only way to pass posX_0b and posY_0b as integers 
        special_0b.addListener((value) => {
            setPosX_0b(value.x)
            setPosY_0b(value.y)
        });
    }, [special_0b])

    useEffect(() => {
        setSharedState({
            s0b_x: posX_0b,
            s0b_y: posY_0b,
            s0b_Height: 15,
            s0b_Width: 15
        })
    }, [posX_0b, posY_0b])

    return (
        <>
        {isPowerInProgress_0b.current &&
            <Animated.View
                style={[
                    {...Styling.projectile_obstacle_block, opacity: opacityAnim_0b},
                    {
                        transform: [{ translateX: special_0b.x }, { translateY: special_0b.y }],
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
