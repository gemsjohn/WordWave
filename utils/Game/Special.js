import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isSpecialColliding_0, isSpecialColliding_1, isSpecialColliding_2, isSpecialColliding_3 } from './CollisionHandler';
import { SharedStateContext } from './Game';
import {
    View,
} from 'react-native';

export const Special = (props) => {
    const isGameInProgress = useRef(false);
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    // Specials
    const [specialColor_0, setSpecialColor_0] = useState('transparent')
    const specialPosition_0 = useRef({ x: 0, y: 70 });
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

    // Collision Detection Variables
    // let localCharXPos = useRef(props.charX - Math.trunc(windowWidth * 0.313));
    // let localCharYPos = useRef(props.charY - Math.trunc(windowHeight * 0.022));

    // useLayoutEffect(() => {
    //     isGameInProgress.current = false;
    //     localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
    //     localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);

    // }, [])


    // localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
    // localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);

    // const [obj1, setObj1] = useState({
    //     x: localCharXPos.current,
    //     y: localCharYPos.current,
    //     width: props.charWidth,
    //     height: props.charHeight
    // });



    // useEffect(() => {
    //     setObj1({
    //         x: localCharXPos.current,
    //         y: localCharYPos.current,
    //         width: props.charWidth,
    //         height: props.charHeight
    //     });
    // }, [localCharXPos.current, localCharYPos.current, props.charWidth, props.charHeight]);

    const [obj1, setObj1] = useState({
        x: props.charX,
        y: props.charY,
        width: props.charWidth,
        height: props.charHeight
    });



    useEffect(() => {
        setObj1({
            x: props.charX,
            y: props.charY,
            width: props.charWidth,
            height: props.charHeight
        });
    }, [props.charX, props.charY, props.charWidth, props.charHeight]);




    useLayoutEffect(() => {
        // console.log(obj1)
        let special_0 = { x: specialPosition_0.current.x, y: specialPosition_0.current.y, width: props.charWidth, height: props.charWidth }
        let special_1 = { x: specialPosition_1.current.x, y: specialPosition_1.current.y, width: props.charWidth, height: props.charWidth }
        let special_2 = { x: specialPosition_2.current.x, y: specialPosition_2.current.y, width: props.charWidth, height: props.charWidth }
        let special_3 = { x: specialPosition_3.current.x, y: specialPosition_3.current.y, width: props.charWidth, height: props.charWidth }

        // Special _ 0
        if (isSpecialColliding_0(obj1, special_0)) {
            setSpecialColor_0('rgba(255, 255, 255, 0.25)')
            if (specialColorPositionTimer_0) {
                clearTimeout(specialColorPositionTimer_0);
            }
            const timer = setTimeout(() => {
                // setSharedState({...sharedState, specialActive: true });
                setSharedState({
                    specialActive_0: !retainSpecial_0.current,
                    specialActive_1: false,
                    specialActive_2: false,
                    specialActive_3: false
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
        // if (isSpecialColliding_1(obj1, special_1)) {
        //     setSpecialColor_1('rgba(255, 255, 255, 0.25)')
        //     if (specialColorPositionTimer_1) {
        //         clearTimeout(specialColorPositionTimer_1);
        //     }
        //     const timer = setTimeout(() => {
        //         setSharedState({
        //             specialActive_0: false,
        //             specialActive_1: !retainSpecial_1.current,
        //             specialActive_2: false,
        //             specialActive_3: false
        //         });
        //         retainSpecial_0.current = false;
        //         retainSpecial_1.current = !retainSpecial_1.current;
        //         retainSpecial_2.current = false;
        //         retainSpecial_3.current = false;


        //     }, 100);
        //     setSpecialColorPositionTimer_1(timer);
        // } else {
        //     setSpecialColor_1('transparent')
        // }

        // // Special _ 2

        // if (isSpecialColliding_2(obj1, special_2)) {
        //     setSpecialColor_2('rgba(255, 255, 255, 0.25)')
        //     if (specialColorPositionTimer_2) {
        //         clearTimeout(specialColorPositionTimer_2);
        //     }
        //     const timer = setTimeout(() => {
        //         setSharedState({
        //             specialActive_0: false,
        //             specialActive_1: false,
        //             specialActive_2: !retainSpecial_2.current,
        //             specialActive_3: false
        //         });
        //         retainSpecial_0.current = false;
        //         retainSpecial_1.current = false;
        //         retainSpecial_2.current = !retainSpecial_2.current;
        //         retainSpecial_3.current = false;


        //     }, 100);
        //     setSpecialColorPositionTimer_2(timer);
        // } else {
        //     setSpecialColor_2('transparent')
        // }

        // // Special _ 3

        // if (isSpecialColliding_3(obj1, special_3)) {
        //     setSpecialColor_3('rgba(255, 255, 255, 0.25)')
        //     if (specialColorPositionTimer_3) {
        //         clearTimeout(specialColorPositionTimer_3);
        //     }
        //     const timer = setTimeout(() => {
        //         setSharedState({
        //             specialActive_0: false,
        //             specialActive_1: false,
        //             specialActive_2: false,
        //             specialActive_3: !retainSpecial_3.current
        //         });
        //         retainSpecial_0.current = false;
        //         retainSpecial_1.current = false;
        //         retainSpecial_2.current = false;
        //         retainSpecial_3.current = !retainSpecial_3.current;


        //     }, 100);
        //     setSpecialColorPositionTimer_3(timer);
        // } else {
        //     setSpecialColor_3('transparent')
        // }

        return () => {
            null
        }
    }, [obj1]);

    const data = [
        { 
            id: 0,
            select: retainSpecial_0.current, 
            backgroundColor: specialColor_0, 
            top: 70 
        },
        // { 
        //     id: 1,
        //     select: retainSpecial_1.current, 
        //     backgroundColor: specialColor_1, 
        //     top: HeightRatio(260) 
        // },
        // { 
        //     id: 2,
        //     select: retainSpecial_2.current, 
        //     backgroundColor: specialColor_2, 
        //     top: HeightRatio(380) 
        // },
        // { 
        //     id: 3,
        //     select: retainSpecial_3.current, 
        //     backgroundColor: specialColor_3, 
        //     top: HeightRatio(500) 
        // },
    ]

    const SpecialBlocks = ({ data }) => {
        return (
            <>
                {data.map((item, index) => (
                    <>
                        {item.select ?
                            <View
                                key={item.id}
                                style={[
                                    Styling.special_block,
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
                                key={item.id}
                                style={[
                                    Styling.special_block,
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
        <>
        <View style={{backgroundColor: 'red', position: 'absolute', zIndex: 10, left: 0, top: HeightRatio(140), height: 20, width: 20 }} />
        <SpecialBlocks data={data} />
        </>
    )
}