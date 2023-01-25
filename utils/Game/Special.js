import React, { 
    useState, 
    useRef, 
    useEffect, 
    useLayoutEffect, 
    useContext 
} from 'react';
import { 
    Styling, 
    WidthRatio, 
    HeightRatio, 
    windowHeight, 
    windowWidth 
} from '../../Styling';
import {  
    isSpecialColliding_0, 
    isSpecialColliding_1, 
    isSpecialColliding_2, 
    isSpecialColliding_3 
} from './CollisionHandler';
import { SharedStateContext } from './Game';
import {
    View,
    Text
} from 'react-native';

export const Special = (props) => {
    const isGameInProgress = useRef(false);
    const { sharedState, setSharedState } = useContext(SharedStateContext);
    const defenseTimeMaximum = 2;
    // [SPECIALS]
    // Special 0
    const [specialColor_0, setSpecialColor_0] = useState('transparent')
    const specialPosition_0 = useRef({ x: 0, y: HeightRatio(140) });
    const [specialColorPositionTimer_0, setSpecialColorPositionTimer_0] = useState(null);
    const retainSpecial_0 = useRef(false);
    // Special 0 - Timing
    const [startDefenseTimer_0, setStartDefenseTimer_0] = useState(false);
    const intervalDefenseTimerID_0 = useRef(null);
    const countRefDefenseTimer_0 = useRef(defenseTimeMaximum); // Initial value of 10
    const [startCooldownTimer, setStartCooldownTimer] = useState(false);
    const intervalCooldownId = useRef(null);

    // Special 1
    const [specialColor_1, setSpecialColor_1] = useState('transparent')
    const specialPosition_1 = useRef({ x: 0, y: HeightRatio(260) });
    const [specialColorPositionTimer_1, setSpecialColorPositionTimer_1] = useState(null);
    const retainSpecial_1 = useRef(false);
    // Special 1 - Timing
    const [startDefenseTimer_1, setStartDefenseTimer_1] = useState(false);
    const intervalDefenseTimerID_1 = useRef(null);
    const countRefDefenseTimer_1 = useRef(defenseTimeMaximum); // Initial value of defenseTimeMaximum

    // Special 2
    const [specialColor_2, setSpecialColor_2] = useState('transparent')
    const specialPosition_2 = useRef({ x: 0, y: HeightRatio(380) });
    const [specialColorPositionTimer_2, setSpecialColorPositionTimer_2] = useState(null);
    const retainSpecial_2 = useRef(false);
    // Special 2 - Timing
    const [startDefenseTimer_2, setStartDefenseTimer_2] = useState(false);
    const intervalDefenseTimerID_2 = useRef(null);
    const countRefDefenseTimer_2 = useRef(defenseTimeMaximum); // Initial value of defenseTimeMaximum

    // Special 3
    const [specialColor_3, setSpecialColor_3] = useState('transparent')
    const specialPosition_3 = useRef({ x: 0, y: HeightRatio(500) });
    const [specialColorPositionTimer_3, setSpecialColorPositionTimer_3] = useState(null);
    const retainSpecial_3 = useRef(false);
    // Special 3 - Timing
    const [startDefenseTimer_3, setStartDefenseTimer_3] = useState(false);
    const intervalDefenseTimerID_3 = useRef(null);
    const countRefDefenseTimer_3 = useRef(defenseTimeMaximum); // Initial value of defenseTimeMaximum
    

    const areDefenseTimersAvailable = useRef({
        _0: true,
        _1: true,
        _2: true,
        _3: true,
    });
 
    


    const [obj1, setObj1] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {
        // console.log("Start !!!!!!")
        countRefDefenseTimer_0.current = defenseTimeMaximum;
        countRefDefenseTimer_1.current = defenseTimeMaximum;
        countRefDefenseTimer_2.current = defenseTimeMaximum;
        countRefDefenseTimer_3.current = defenseTimeMaximum;

        areDefenseTimersAvailable.current._0 = true;
        areDefenseTimersAvailable.current._1 = true; 
        areDefenseTimersAvailable.current._2 = true; 
        areDefenseTimersAvailable.current._3 = true; 
        setSharedState({deployUpgradeToSpecialAnimation: false})

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
        let special_0 = { x: specialPosition_0.current.x, y: specialPosition_0.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_1 = { x: specialPosition_1.current.x, y: specialPosition_1.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_2 = { x: specialPosition_2.current.x, y: specialPosition_2.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }
        let special_3 = { x: specialPosition_3.current.x, y: specialPosition_3.current.y, width: sharedState.current.charWidth, height: sharedState.current.charWidth }

        // Special _ 0
        if (isSpecialColliding_0(obj1, special_0) && countRefDefenseTimer_0.current > 0) {
            setSpecialColor_0('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_0) {
                clearTimeout(specialColorPositionTimer_0);
            }
            // if (countRefDefenseTimer_0.current > 0) {setStartCooldownTimer(false)}
            setStartDefenseTimer_0(true);
            setStartDefenseTimer_1(false);
            setStartDefenseTimer_2(false);
            setStartDefenseTimer_3(false);

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
        if (isSpecialColliding_1(obj1, special_1) && countRefDefenseTimer_1.current > 0) {
            setSpecialColor_1('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_1) {
                clearTimeout(specialColorPositionTimer_1);
            }

            // if (countRefDefenseTimer_0.current > 0) {setStartCooldownTimer(false)}
            setStartDefenseTimer_0(false);
            setStartDefenseTimer_1(true);
            setStartDefenseTimer_2(false);
            setStartDefenseTimer_3(false);

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
        if (isSpecialColliding_2(obj1, special_2) && countRefDefenseTimer_2.current > 0) {
            setSpecialColor_2('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_2) {
                clearTimeout(specialColorPositionTimer_2);
            }

            // if (countRefDefenseTimer_0.current > 0) {setStartCooldownTimer(false)}
            setStartDefenseTimer_0(false);
            setStartDefenseTimer_1(false);
            setStartDefenseTimer_2(true);
            setStartDefenseTimer_3(false);

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
        if (isSpecialColliding_3(obj1, special_3) && countRefDefenseTimer_3.current > 0) {
            setSpecialColor_3('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_3) {
                clearTimeout(specialColorPositionTimer_3);
            }

            // if (countRefDefenseTimer_0.current > 0) {setStartCooldownTimer(false)}
            setStartDefenseTimer_0(false);
            setStartDefenseTimer_1(false);
            setStartDefenseTimer_2(false);
            setStartDefenseTimer_3(true);

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
            setStartDefenseTimer_0(false);
            setStartDefenseTimer_1(false);
            setStartDefenseTimer_2(false);
            setStartDefenseTimer_3(false);

            // setStartCooldownTimer(true)


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
        if (!startDefenseTimer_0) {
            clearInterval(intervalDefenseTimerID_0.current);
            return;
        } else {
            intervalDefenseTimerID_0.current = setInterval(() => {
                if (countRefDefenseTimer_0.current > 0) {
                    countRefDefenseTimer_0.current--;
                } else {
                    clearInterval(intervalDefenseTimerID_0.current);
                    retainSpecial_0.current = false;
                    areDefenseTimersAvailable.current._0 = false;
                    // setStartCooldownTimer(true)
                }
            }, 1000);
        }

        return () => clearInterval(intervalDefenseTimerID_0.current);

    }, [startDefenseTimer_0])

    useEffect(() => {

        if (!startDefenseTimer_1) {
            clearInterval(intervalDefenseTimerID_1.current);
            return;
        } else {
            intervalDefenseTimerID_1.current = setInterval(() => {
                if (countRefDefenseTimer_1.current > 0) {
                    countRefDefenseTimer_1.current--;
                } else {
                    clearInterval(intervalDefenseTimerID_1.current);
                    retainSpecial_1.current = false;
                    areDefenseTimersAvailable.current._1 = false;
                    // setStartCooldownTimer(true)
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalDefenseTimerID_1.current)
        };

    }, [startDefenseTimer_1])

    useEffect(() => {
        if (!startDefenseTimer_2) {
            clearInterval(intervalDefenseTimerID_2.current);
            return;
        } else {
            intervalDefenseTimerID_2.current = setInterval(() => {
                if (countRefDefenseTimer_2.current > 0) {
                    countRefDefenseTimer_2.current--;
                } else {
                    clearInterval(intervalDefenseTimerID_2.current);
                    retainSpecial_2.current = false;
                    areDefenseTimersAvailable.current._2 = false;
                    // setStartCooldownTimer(true)
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalDefenseTimerID_2.current)
        };

    }, [startDefenseTimer_2])

    useEffect(() => {
        if (!startDefenseTimer_3) {
            clearInterval(intervalDefenseTimerID_3.current);
            return;
        } else {
            intervalDefenseTimerID_3.current = setInterval(() => {
                if (countRefDefenseTimer_3.current > 0) {
                    countRefDefenseTimer_3.current--;
                } else {
                    clearInterval(intervalDefenseTimerID_3.current);
                    retainSpecial_3.current = false;
                    areDefenseTimersAvailable.current._3 = false;
                    // setStartCooldownTimer(true)
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalDefenseTimerID_3.current)
        };

    }, [startDefenseTimer_3])

    useEffect(() => {
        // console.log(areDefenseTimersAvailable.current)
        if (
            !areDefenseTimersAvailable.current._0 &&
            !areDefenseTimersAvailable.current._1 &&
            !areDefenseTimersAvailable.current._2 &&
            !areDefenseTimersAvailable.current._3
        ) {
            setSharedState({deployUpgradeToSpecialAnimation: true})
        } else {
            setSharedState({deployUpgradeToSpecialAnimation: false})
        }
    }, [
        areDefenseTimersAvailable.current._0, 
        areDefenseTimersAvailable.current._1, 
        areDefenseTimersAvailable.current._2, 
        areDefenseTimersAvailable.current._3
    ])

    // useEffect(() => {
    //     if (!startCooldownTimer) {
    //         clearInterval(intervalCooldownId.current);
    //         return;
    //     } else {
    //         intervalCooldownId.current = setInterval(() => {
    //             if (countRefDefenseTimer_0.current < 10) {
    //                 countRefDefenseTimer_0.current++;
    //             } else {
    //                 clearInterval(intervalCooldownId.current);
    //                 countRefDefenseTimer_0.current = 10;
    //                 setStartCooldownTimer(false)
    //             }
    //         }, 1000);
    //     }

    //     return () => clearInterval(intervalCooldownId.current);
    // }, [startCooldownTimer])

    const data = [
        { 
            id_0: "0_0",
            id_1: "0_1",
            select: retainSpecial_0.current, 
            backgroundColor: specialColor_0, 
            top: HeightRatio(125),
            timer: countRefDefenseTimer_0.current
        },
        { 
            id_0: "1_0",
            id_1: "1_1",
            select: retainSpecial_1.current, 
            backgroundColor: specialColor_1, 
            top: HeightRatio(245),
            timer: countRefDefenseTimer_1.current
        },
        { 
            id_0: "2_0",
            id_1: "2_1",
            select: retainSpecial_2.current, 
            backgroundColor: specialColor_2, 
            top: HeightRatio(365),
            timer: countRefDefenseTimer_2.current

        },
        { 
            id_0: "3_0",
            id_1: "3_1",
            select: retainSpecial_3.current, 
            backgroundColor: specialColor_3, 
            top: HeightRatio(485),
            timer: countRefDefenseTimer_3.current
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
                                        backgroundColor: 'rgba(0, 255, 255, 0.25)',
                                        height: sharedState.current.charWidth,
                                        width: sharedState.current.charWidth,
                                        zIndex: -2,
                                        top: item.top,
                                        left: WidthRatio(80),
                                        // borderWidth: 2, 
                                        borderColor: 'rgba(0, 255, 255, 1.00)',
                                        borderTopWidth: 2,
                                        borderRightWidth: 2,
                                        borderBottomWidth: 2,
                                        borderLeftWidth: 0

                                    }
                                ]}
                            >
                                <Text style={{
                                    alignSelf: 'center',
                                    fontSize: HeightRatio(70), 
                                    fontWeight: 'bold', 
                                    color: 'white'
                                }}>{item.timer}</Text>

                            </View>
                            :
                            <>
                            {item.timer > 0 &&
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
                                        fontSize: HeightRatio(70), 
                                        fontWeight: 'bold', 
                                        color: 'white'
                                    }}>{item.timer}</Text>
                                </View>
                            }
                            </>
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