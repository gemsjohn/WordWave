import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isSpecialColliding_0, isSpecialColliding_1, isSpecialColliding_2, isSpecialColliding_3 } from './CollisionHandler';
import { SharedStateContext } from './Game';
import { CountdownTimer } from './CountdownTimer';
import moment  from 'moment';
import {
    View,
    Text
} from 'react-native';
import { useMemo } from 'react/cjs/react.development';

export const Special = (props) => {
    const isGameInProgress = useRef(false);
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Specials
    const [specialColor_0, setSpecialColor_0] = useState('transparent')
    const specialPosition_0 = useRef({ x: 0, y: HeightRatio(140) });
    const [specialColorPositionTimer_0, setSpecialColorPositionTimer_0] = useState(null);
    const retainSpecial_0 = useRef(false);

    const [specialColor_1, setSpecialColor_1] = useState('transparent')
    const specialPosition_1 = useRef({ x: 0, y: HeightRatio(260) });
    const [specialColorPositionTimer_1, setSpecialColorPositionTimer_1] = useState(null);
    const retainSpecial_1 = useRef(false);

    const [specialColor_2, setSpecialColor_2] = useState('transparent')
    const specialPosition_2 = useRef({ x: 0, y: HeightRatio(380) });
    const [specialColorPositionTimer_2, setSpecialColorPositionTimer_2] = useState(null);
    const retainSpecial_2 = useRef(false);

    const [specialColor_3, setSpecialColor_3] = useState('transparent')
    const specialPosition_3 = useRef({ x: 0, y: HeightRatio(500) });
    const [specialColorPositionTimer_3, setSpecialColorPositionTimer_3] = useState(null);
    const retainSpecial_3 = useRef(false);

    
    
    const [startTimer_0, setStartTimer_0] = useState(false);
    const intervalId = useRef(null);
    const countRef = useRef(10); // Initial value of 10
    const [startCooldownTimer_0, setStartCooldownTimer_0] = useState(false);
    const intervalCooldownId = useRef(null);
 
    


    const [obj1, setObj1] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {
        // This function will be called on every animation frame
        const update = () => {
            setObj1({
                x: sharedState.current.charX + WidthRatio(64) + sharedState.current.charWidth/2,
                y: sharedState.current.charY,
                width: sharedState.current.charWidth,
                height: sharedState.current.charHeight/2
            });
            
            requestAnimationFrame(update);
        };

        update();

        // Return a function that cleans up the effect
        return () => {
            // No need to do anything here
        };
    }, [])

    

    const prevRetainSpecial_0 = useRef(retainSpecial_0.current);
    const prevRetainSpecial_1 = useRef(retainSpecial_1.current);
    const prevRetainSpecial_2 = useRef(retainSpecial_2.current);
    const prevRetainSpecial_3 = useRef(retainSpecial_3.current);

    useLayoutEffect(() => {
        // console.log(obj1)
        let special_0 = { x: specialPosition_0.current.x, y: specialPosition_0.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_1 = { x: specialPosition_1.current.x, y: specialPosition_1.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_2 = { x: specialPosition_2.current.x, y: specialPosition_2.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_3 = { x: specialPosition_3.current.x, y: specialPosition_3.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }

        // Special _ 0
        if (isSpecialColliding_0(obj1, special_0) && !startCooldownTimer_0) {
            setSpecialColor_0('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_0) {
                clearTimeout(specialColorPositionTimer_0);
            }

            setStartTimer_0(true);

            const timer = setTimeout(() => {
                // setSharedState({...sharedState, specialActive: true });
                setSharedState({
                    specialActive_0: !retainSpecial_0.current,
                    specialActive_1: false,
                    specialActive_2: false,
                    specialActive_3: false,
                    specialSizeLocation_0: {
                        x: WidthRatio(80), 
                        y: HeightRatio(125), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_1: {
                        x: 0, 
                        y: HeightRatio(245), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_2: {
                        x: 0, 
                        y: HeightRatio(365), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_3: {
                        x: 0, 
                        y: HeightRatio(485), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                });
                retainSpecial_0.current = !retainSpecial_0.current;
                retainSpecial_1.current = false;
                retainSpecial_2.current = false;
                retainSpecial_3.current = false;


            }, 100);
            setSpecialColorPositionTimer_0(timer);

        } else {
            setSpecialColor_0('transparent')
        }

        // Special _ 1
        if (isSpecialColliding_1(obj1, special_1)) {
            setSpecialColor_1('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_1) {
                clearTimeout(specialColorPositionTimer_1);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    specialActive_0: false,
                    specialActive_1: !retainSpecial_1.current,
                    specialActive_2: false,
                    specialActive_3: false,
                    specialSizeLocation_0: {
                        x: 0, 
                        y: HeightRatio(125), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_1: {
                        x: WidthRatio(80), 
                        y: HeightRatio(245), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_2: {
                        x: 0, 
                        y: HeightRatio(365), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_3: {
                        x: 0, 
                        y: HeightRatio(485), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                });
                retainSpecial_0.current = false;
                retainSpecial_1.current = !retainSpecial_1.current;
                retainSpecial_2.current = false;
                retainSpecial_3.current = false;


            }, 100);
            setSpecialColorPositionTimer_1(timer);
        } else {
            setSpecialColor_1('transparent')
        }

        // // Special _ 2
        if (isSpecialColliding_2(obj1, special_2)) {
            setSpecialColor_2('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_2) {
                clearTimeout(specialColorPositionTimer_2);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    specialActive_0: false,
                    specialActive_1: false,
                    specialActive_2: !retainSpecial_2.current,
                    specialActive_3: false,
                    specialSizeLocation_0: {
                        x: 0, 
                        y: HeightRatio(125), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_1: {
                        x: 0, 
                        y: HeightRatio(245), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_2: {
                        x: WidthRatio(80), 
                        y: HeightRatio(365), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_3: {
                        x: 0, 
                        y: HeightRatio(485), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                });
                retainSpecial_0.current = false;
                retainSpecial_1.current = false;
                retainSpecial_2.current = !retainSpecial_2.current;
                retainSpecial_3.current = false;


            }, 100);
            setSpecialColorPositionTimer_2(timer);
        } else {
            setSpecialColor_2('transparent')
        }

        // // Special _ 3
        if (isSpecialColliding_3(obj1, special_3)) {
            setSpecialColor_3('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_3) {
                clearTimeout(specialColorPositionTimer_3);
            }
            const timer = setTimeout(() => {
                setSharedState({
                    specialActive_0: false,
                    specialActive_1: false,
                    specialActive_2: false,
                    specialActive_3: !retainSpecial_3.current,
                    specialSizeLocation_0: {
                        x: 0, 
                        y: HeightRatio(125), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_1: {
                        x: 0, 
                        y: HeightRatio(245), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_2: {
                        x: 0, 
                        y: HeightRatio(365), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                    specialSizeLocation_3: {
                        x: WidthRatio(80), 
                        y: HeightRatio(485), 
                        height: sharedState.current.charWidth, 
                        width: sharedState.current.charWidth,
                    },
                });
                retainSpecial_0.current = false;
                retainSpecial_1.current = false;
                retainSpecial_2.current = false;
                retainSpecial_3.current = !retainSpecial_3.current;


            }, 100);
            setSpecialColorPositionTimer_3(timer);
        } else {
            setSpecialColor_3('transparent')
        }
        if (prevRetainSpecial_0.current === retainSpecial_0.current &&
            prevRetainSpecial_1.current === retainSpecial_1.current &&
            prevRetainSpecial_2.current === retainSpecial_2.current &&
            prevRetainSpecial_3.current === retainSpecial_3.current) {
          return;
        }
        if (!retainSpecial_0.current && !retainSpecial_1.current && !retainSpecial_2.current &&!retainSpecial_3.current) {
            setStartTimer_0(false);


            setSharedState({
                specialActive_0: false,
                specialActive_1: false,
                specialActive_2: false,
                specialActive_3: false,
                specialSizeLocation_0: {
                    x: 0, 
                    y: HeightRatio(125), 
                    height: sharedState.current.charWidth, 
                    width: sharedState.current.charWidth,
                },
                specialSizeLocation_1: {
                    x: 0, 
                    y: HeightRatio(245), 
                    height: sharedState.current.charWidth, 
                    width: sharedState.current.charWidth,
                },
                specialSizeLocation_2: {
                    x: 0, 
                    y: HeightRatio(365), 
                    height: sharedState.current.charWidth, 
                    width: sharedState.current.charWidth,
                },
                specialSizeLocation_3: {
                    x: 0, 
                    y: HeightRatio(485), 
                    height: sharedState.current.charWidth, 
                    width: sharedState.current.charWidth,
                },
            });
        }
        prevRetainSpecial_0.current = retainSpecial_0.current;
        prevRetainSpecial_1.current = retainSpecial_1.current;
        prevRetainSpecial_2.current = retainSpecial_2.current;
        prevRetainSpecial_3.current = retainSpecial_3.current;

        return () => {
            null
        }
    }, [obj1]);

    


    useEffect(() => {
        console.log(startTimer_0)
        if (!startTimer_0) {
            clearInterval(intervalId.current);
            return;
        } else {
            intervalId.current = setInterval(() => {
                console.log(countRef.current);
                if (countRef.current > 0) {
                    countRef.current--;
                } else {
                    clearInterval(intervalId.current);
                    countRef.current = 0;
                    retainSpecial_0.current = false;
                    setStartCooldownTimer_0(true)
                }
            }, 1000);
        }

        return () => clearInterval(intervalId.current);

    }, [startTimer_0])

    useEffect(() => {
        // intervalCooldownId
        if (!startCooldownTimer_0) {
            clearInterval(intervalCooldownId.current);
            return;
        } else {
            intervalCooldownId.current = setInterval(() => {
                console.log(countRef.current);
                if (countRef.current < 10) {
                    countRef.current++;
                } else {
                    clearInterval(intervalCooldownId.current);
                    countRef.current = 10;
                    // retainSpecial_0.current = false;
                    setStartCooldownTimer_0(false)
                }
            }, 1000);
        }

        return () => clearInterval(intervalCooldownId.current);
    }, [startCooldownTimer_0])

    const data = [
        { 
            id_0: "0_0",
            id_1: "0_1",
            select: retainSpecial_0.current, 
            backgroundColor: specialColor_0, 
            top: HeightRatio(125)
        },
        { 
            id_0: "1_0",
            id_1: "1_1",
            select: retainSpecial_1.current, 
            backgroundColor: specialColor_1, 
            top: HeightRatio(245) 
        },
        { 
            id_0: "2_0",
            id_1: "2_1",
            select: retainSpecial_2.current, 
            backgroundColor: specialColor_2, 
            top: HeightRatio(365) 
        },
        { 
            id_0: "3_0",
            id_1: "3_1",
            select: retainSpecial_3.current, 
            backgroundColor: specialColor_3, 
            top: HeightRatio(485) 
        },
    ]

    const SpecialBlocks = ({ data }) => {
        return (
            <>
                {data.map((item, index) => (
                    <>
                        {item.select ?
                            <View
                                key={item.id_1}
                                style={[
                                    Styling.special_block,
                                    {
                                        backgroundColor: 'rgba(255, 255, 0, 0.10)',
                                        height: sharedState.current.charWidth,
                                        width: sharedState.current.charWidth,
                                        zIndex: -2,
                                        top: item.top,
                                        left: WidthRatio(80),
                                        borderWidth: 2, 
                                        borderColor: 'rgba(255, 255, 0, 1.00)'
                                    }
                                ]}
                            >
                                <Text style={{
                                    alignSelf: 'center',
                                    fontSize: 20, 
                                    fontWeight: 'bold', 
                                    color: 'white'
                                }}>{countRef.current}</Text>

                            </View>
                            :
                            <View
                                key={item.id_0}
                                style={[
                                    Styling.special_block,
                                    {
                                        backgroundColor: item.backgroundColor,
                                        height: sharedState.current.charWidth,
                                        width: sharedState.current.charWidth,
                                        top: item.top
                                    }
                                ]}
                            >
                                <Text style={{
                                    alignSelf: 'center',
                                    fontSize: 20, 
                                    fontWeight: 'bold', 
                                    color: 'white'
                                }}>{countRef.current}</Text>
                            </View>
                        }
                    </>
                ))}
            </>
        );
    };

    return (
        <>
        {/* <View style={{backgroundColor: 'red', position: 'absolute', zIndex: 10, left: 0, top: HeightRatio(125), height: 20, width: 20 }} /> */}
        <SpecialBlocks data={data} />
        </>
    )
}