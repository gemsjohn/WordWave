import React, { useState, useRef, useEffect, useContext, useCallback, useLayoutEffect, createContext, useMemo } from 'react';
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
    const special_0b = useRef(new Animated.ValueXY({ x: WidthRatio(400), y: 0 })).current;
    const [pos_0b, setPos_0b] = useState({x: 0, y: 0});
    const [opacityAnim_0b] = useState(new Animated.Value(1));
    const specialAnimation_0b = useRef(null);
    const isPowerInProgress_0b = useRef(false)
    const timeoutId_0b = useRef(null);

    const runspecialAnimation_0b = (x, y) => {
        if (isPowerInProgress_0b.current) {
            special_0b.setValue({ x: x - WidthRatio(65), y: y });
            opacityAnim_0b.setValue(1)
            specialAnimation_0b.current = Animated.parallel([
                Animated.timing(special_0b.x, {
                    toValue: WidthRatio(200), // or any other value you want to animate to
                    duration: 300,
                    useNativeDriver: true
                }),
                // Animated.timing(special_0b.y, {
                //     toValue: sharedState.current.charY, // or any other value you want to animate to
                //     duration: 200,
                //     useNativeDriver: true
                // }),
                // Animated.timing(opacityAnim_0b, {
                //     toValue: 0,
                //     duration: 300,
                //     useNativeDriver: true
                // })
            ]).start(() => {
                if (timeoutId_0b.current) {
                    clearTimeout(timeoutId_0b.current);
                }
                timeoutId_0b.current = setTimeout(() => {
                    runspecialAnimation_0b(sharedState.current.charX + 300, sharedState.current.charY);
                }, 200)
            });
        } else {
            clearTimeout(timeoutId_0b.current);
            return;
        }
    };

    const runSpecialAnimationCallback = useCallback(runspecialAnimation_0b, []);

    useEffect(() => {
        const update = () => {
            // console.log("alt: " + sharedState.current.specialActive_0)

            if (sharedState.current.specialActive_0 && !isPowerInProgress_0b.current) {
                console.log("specialActive_0")
                isPowerInProgress_0b.current = true;
                // runspecialAnimation_0b(sharedState.current.charX + 300, sharedState.current.charY);
                runSpecialAnimationCallback(sharedState.current.charX + 300, sharedState.current.charY);
            } else if (!sharedState.current.specialActive_0 && isPowerInProgress_0b.current) {
                console.log("Stopping")
                isPowerInProgress_0b.current = false;
                setSharedState({
                    s0a_x: null,
                    s0a_y: null,
                    s0a_Height: null,
                    s0a_Width: null
                })
            }
            

            requestAnimationFrame(update);
        };
        update();
    }, [])
   

    useEffect(() => {
        // Only way to pass posX_0b and posY_0b as integers 
        special_0b.addListener((value) => {
            setPos_0b({x: value.x, y: value.y})
        });
    }, [special_0b])

    const sharedStateProps = useMemo(() => ({
        s0b_x: pos_0b.x,
        s0b_y: pos_0b.y,
        s0b_Height: WidthRatio(7),
        s0b_Width: WidthRatio(7)
    }), [pos_0b])

    useEffect(() => {
        setSharedState(sharedStateProps)
    }, [sharedStateProps])


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
                <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: WidthRatio(7), width: WidthRatio(7) }} />

            </Animated.View>
        }
            <View></View>
        </>
    )
}
