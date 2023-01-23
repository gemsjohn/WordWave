import React, { 
    useState, 
    useRef, 
    useEffect, 
    useContext, 
    useCallback, 
    useLayoutEffect, 
    createContext, 
    useMemo 
} from 'react';
import { 
    Styling, 
    WidthRatio, 
    HeightRatio, 
    windowHeight, 
    windowWidth 
} from '../../../Styling';
import { SharedStateContext } from '../Game';
import {
    Text,
    View,
    Image,
    Animated,
} from 'react-native';

export const SpecialAnimation_0a = () => {
    // useContext API
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Special _ 0
    const special_0a = useRef(new Animated.ValueXY({ x: WidthRatio(400), y: 0 })).current;
    const [pos_0a, setPos_0a] = useState({x: 0, y: 0});
    const [opacityAnim_0a] = useState(new Animated.Value(1));
    const specialAnimation_0a = useRef(null);
    const isPowerInProgress_0a = useRef(false)
    const timeoutId_0a = useRef(null);

    const runspecialAnimation_0a = (x, y) => {
        if (isPowerInProgress_0a.current) {
            special_0a.setValue({ x: x - WidthRatio(65), y: y });
            opacityAnim_0a.setValue(1)
            specialAnimation_0a.current = Animated.parallel([
                Animated.timing(special_0a.x, {
                    toValue: WidthRatio(200), // or any other value you want to animate to
                    duration: 500,
                    useNativeDriver: true
                }),
                // Animated.timing(special_0a.y, {
                //     toValue: sharedState.current.charY, // or any other value you want to animate to
                //     duration: 200,
                //     useNativeDriver: true
                // }),
                // Animated.timing(opacityAnim_0a, {
                //     toValue: 0,
                //     duration: 200,
                //     useNativeDriver: true
                // })
            ]).start(() => {
                if (timeoutId_0a.current) {
                    clearTimeout(timeoutId_0a.current);
                }
                timeoutId_0a.current = setTimeout(() => {
                    runspecialAnimation_0a(sharedState.current.charX + 300, sharedState.current.charY);
                }, 200)
            });
        } else {
            clearTimeout(timeoutId_0a.current);
            return;
        }
    };

    const runSpecialAnimationCallback = useCallback(runspecialAnimation_0a, []);

    useEffect(() => {
        const update = () => {
            // console.log("alt: " + sharedState.current.specialActive_0)

            if (sharedState.current.specialActive_0 && !isPowerInProgress_0a.current) {
                console.log("specialActive_0")
                isPowerInProgress_0a.current = true;
                // runspecialAnimation_0a(sharedState.current.charX + 300, sharedState.current.charY);
                runSpecialAnimationCallback(sharedState.current.charX + 300, sharedState.current.charY);
            } else if (!sharedState.current.specialActive_0 && isPowerInProgress_0a.current) {
                console.log("Stopping")
                isPowerInProgress_0a.current = false;
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
        // Only way to pass posX_0a and posY_0a as integers 
        special_0a.addListener((value) => {
            setPos_0a({x: value.x, y: value.y})
        });
    }, [special_0a])

    const sharedStateProps = useMemo(() => ({
        s0a_x: pos_0a.x,
        s0a_y: pos_0a.y,
        s0a_Height: WidthRatio(7),
        s0a_Width: WidthRatio(7)
    }), [pos_0a])

    useEffect(() => {
        setSharedState(sharedStateProps)
    }, [sharedStateProps])


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
                <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: WidthRatio(7), width: WidthRatio(7) }} />

            </Animated.View>
        }
            <View></View>
        </>
    )
}
