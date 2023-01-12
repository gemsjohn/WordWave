import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isPowerColliding_0, isPowerColliding_1, isPowerColliding_2, isPowerColliding_3 } from './CollisionHandler';
import { SharedStateContext } from './Game';
import {
    View,
} from 'react-native';

export const PowerUps = (props) => {
    const isGameInProgress = useRef(false);
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Powers
    const [powerColor_0, setPowerColor_0] = useState('transparent')
    const powerPosition_0 = useRef({ x: 0, y: HeightRatio(140) });
    const [powerColorPositionTimer_0, setPowerColorPositionTimer_0] = useState(null);
    const retainPower_0 = useRef(false);

    const [powerColor_1, setPowerColor_1] = useState('transparent')
    const powerPosition_1 = useRef({ x: 0, y: HeightRatio(260) });
    const [powerColorPositionTimer_1, setPowerColorPositionTimer_1] = useState(null);
    const retainPower_1 = useRef(false);

    const [powerColor_2, setPowerColor_2] = useState('transparent')
    const powerPosition_2 = useRef({ x: 0, y: HeightRatio(380) });
    const [powerColorPositionTimer_2, setPowerColorPositionTimer_2] = useState(null);
    const retainPower_2 = useRef(false);

    const [powerColor_3, setPowerColor_3] = useState('transparent')
    const powerPosition_3 = useRef({ x: 0, y: HeightRatio(500) });
    const [powerColorPositionTimer_3, setPowerColorPositionTimer_3] = useState(null);
    const retainPower_3 = useRef(false);

    // Collision Detection Variables
    let localCharXPos = useRef(props.charX - Math.trunc(windowWidth * 0.313));
    let localCharYPos = useRef(props.charY - Math.trunc(windowHeight * 0.022));

    useLayoutEffect(() => {
        isGameInProgress.current = false;
        localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
        localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);
    }, [])

    localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
    localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);

    const [obj1, setObj1] = useState({
        x: localCharXPos.current,
        y: localCharYPos.current,
        width: props.charWidth,
        height: props.charHeight
    });



    useEffect(() => {
        setObj1({
            x: localCharXPos.current,
            y: localCharYPos.current,
            width: props.charWidth,
            height: props.charHeight
        });
    }, [localCharXPos.current, localCharYPos.current, props.charWidth, props.charHeight]);

    useLayoutEffect(() => {
        // console.log(obj1)
        let power_0 = { x: powerPosition_0.current.x, y: powerPosition_0.current.y, width: props.charWidth, height: props.charWidth }
        let power_1 = { x: powerPosition_1.current.x, y: powerPosition_1.current.y, width: props.charWidth, height: props.charWidth }
        let power_2 = { x: powerPosition_2.current.x, y: powerPosition_2.current.y, width: props.charWidth, height: props.charWidth }
        let power_3 = { x: powerPosition_3.current.x, y: powerPosition_3.current.y, width: props.charWidth, height: props.charWidth }

        // Power _ 0
        if (isPowerColliding_0(obj1, power_0)) {
            setPowerColor_0('rgba(255, 255, 255, 0.25)')
            if (powerColorPositionTimer_0) {
                clearTimeout(powerColorPositionTimer_0);
            }
            const timer = setTimeout(() => {
                // setSharedState({...sharedState, powerupActive: true });
                setSharedState({
                    powerupActive_0: !retainPower_0.current,
                    powerupActive_1: false,
                    powerupActive_2: false,
                    powerupActive_3: false
                });
                retainPower_0.current = !retainPower_0.current;
                retainPower_1.current = false;
                retainPower_2.current = false;
                retainPower_3.current = false;


            }, 100);
            setPowerColorPositionTimer_0(timer);

        } else {
            setPowerColor_0('transparent')
        }

        // Power _ 1
        if (isPowerColliding_1(obj1, power_1)) {
            setPowerColor_1('rgba(255, 255, 255, 0.25)')
            if (powerColorPositionTimer_1) {
                clearTimeout(powerColorPositionTimer_1);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    powerupActive_0: false,
                    powerupActive_1: !retainPower_1.current,
                    powerupActive_2: false,
                    powerupActive_3: false
                });
                retainPower_0.current = false;
                retainPower_1.current = !retainPower_1.current;
                retainPower_2.current = false;
                retainPower_3.current = false;


            }, 100);
            setPowerColorPositionTimer_1(timer);
        } else {
            setPowerColor_1('transparent')
        }

        // Power _ 2

        if (isPowerColliding_2(obj1, power_2)) {
            setPowerColor_2('rgba(255, 255, 255, 0.25)')
            if (powerColorPositionTimer_2) {
                clearTimeout(powerColorPositionTimer_2);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    powerupActive_0: false,
                    powerupActive_1: false,
                    powerupActive_2: !retainPower_2.current,
                    powerupActive_3: false
                });
                retainPower_0.current = false;
                retainPower_1.current = false;
                retainPower_2.current = !retainPower_2.current;
                retainPower_3.current = false;


            }, 100);
            setPowerColorPositionTimer_2(timer);
        } else {
            setPowerColor_2('transparent')
        }

        // Power _ 3

        if (isPowerColliding_3(obj1, power_3)) {
            setPowerColor_3('rgba(255, 255, 255, 0.25)')
            if (powerColorPositionTimer_3) {
                clearTimeout(powerColorPositionTimer_3);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    powerupActive_0: false,
                    powerupActive_1: false,
                    powerupActive_2: false,
                    powerupActive_3: !retainPower_3.current
                });
                retainPower_0.current = false;
                retainPower_1.current = false;
                retainPower_2.current = false;
                retainPower_3.current = !retainPower_3.current;


            }, 100);
            setPowerColorPositionTimer_3(timer);
        } else {
            setPowerColor_3('transparent')
        }

        return () => {
            null
        }
    }, [obj1]);

    const data = [
        { 
            select: retainPower_0.current, 
            backgroundColor: powerColor_0, 
            top: HeightRatio(140) 
        },
        { 
            select: retainPower_1.current, 
            backgroundColor: powerColor_1, 
            top: HeightRatio(260) 
        },
        { 
            select: retainPower_2.current, 
            backgroundColor: powerColor_2, 
            top: HeightRatio(380) 
        },
        { 
            select: retainPower_3.current, 
            backgroundColor: powerColor_3, 
            top: HeightRatio(500) 
        },
    ]

    const PowerUpBlocks = ({ data }) => {
        return (
            <>
                {data.map((item, index) => (
                    <>
                        {item.select ?
                            <View
                                key={index}
                                style={[
                                    Styling.power_block,
                                    {
                                        backgroundColor: 'transparent',
                                        height: props.charWidth,
                                        width: props.charWidth,
                                        zIndex: -2,
                                        top: item.top,
                                        borderWidth: 2, 
                                        borderColor: 'yellow'
                                    }
                                ]}
                            >
                            </View>
                            :
                            <View
                                key={index}
                                style={[
                                    Styling.power_block,
                                    {
                                        backgroundColor: item.backgroundColor,
                                        height: props.charWidth,
                                        width: props.charWidth,
                                        top: item.top
                                    }
                                ]}
                            >
                            </View>
                        }
                    </>
                ))}
            </>
        );
    };

    return (
        <PowerUpBlocks data={data} />
    )
}