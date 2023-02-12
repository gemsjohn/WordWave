import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { HeightRatio, Styling, WidthRatio } from '../../../Styling';

import {
    View,
    Dimensions,
    Animated
} from 'react-native';

export const StarAnimation_3_top = () => {
    const alienPosition = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const animation = useRef(null);
    let timeoutAlien_ID;

    const AlienAnimation = () => {
        console.log("#3 - STAR_TOP")
        let localYPos_0 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);

        alienPosition.setValue({ x: HeightRatio(1000), y: localYPos_0 })


        animation.current = Animated.parallel([
            Animated.timing(alienPosition.x, {
                toValue: HeightRatio(-40),
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition.y, {
                toValue: localYPos_0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]);

        animation.current.start(() => {
            animation.current.stop((value) => {
                alienPosition.setValue(value)

            })

            timeoutAlien_ID = setTimeout(() => {
                AlienAnimation();
            }, 500)
        });
    }

    useEffect(() => {
        setTimeout(() => {
            AlienAnimation();
        }, 1500)

        return () => {
            clearTimeout(timeoutAlien_ID);

            if (animation.current != null) {
                animation.current.stop();
            }

        };
    }, [])

    return (
        <>
            {/* ALIEN */}
            <Animated.View
                style={
                    [
                        {
                            transform: [
                                { translateX: alienPosition.x },
                                { translateY: alienPosition.y }
                            ],
                        },
                    ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    height: HeightRatio(10),
                    width: HeightRatio(10),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
        </>
    );
}