import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { HeightRatio, Styling, WidthRatio } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Image,
    RefreshControl,
    Animated
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
} from '@fortawesome/free-solid-svg-icons'
import { Tokens } from './Tokens';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AlienEffect_middle = () => {
    const alienPosition = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const animation = useRef(null);
    let timeoutAlien_ID;

    const AlienAnimation = () => {
        console.log("ANIMATE")
        let localYPos_0 = HeightRatio(250);
        let localYPos_1 = HeightRatio(100);

        alienPosition.setValue({ x: HeightRatio(10), y: localYPos_0 })


        animation.current = Animated.sequence([
            Animated.timing(alienPosition.y, {
                toValue: localYPos_1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition.y, {
                toValue: localYPos_0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]);

        animation.current.start(() => {
            animation.current.stop((value) => {
                alienPosition.setValue(value)

            })

            timeoutAlien_ID = setTimeout(() => {
                AlienAnimation();
            }, 100)
        });
    }


    useEffect(() => {
        AlienAnimation();

        return () => {
            clearTimeout(timeoutAlien_ID);
            animation.current.stop();
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
                <Image
                    source={require('../../assets/home_background_image.png')}
                    style={{
                        width: windowWidth,
                        height: HeightRatio(900),
                        position: 'absolute',
                        top: 10,
                    }}
                />
            </Animated.View>
        </>
    );
}