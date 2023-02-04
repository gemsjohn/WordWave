import React, { useEffect, useInsertionEffect, useState, useContext, useRef } from 'react';
import { View, Text, Button, Dimensions, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faComment, faPen, faW, faF, faFlagCheckered, faGear, faTrophy, faHouse } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_ME } from '../utils/queries';
import { MainStateContext } from '../App';
import moment from 'moment';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scaleWidth = SCREEN_WIDTH / 360;
const scaleHeight = SCREEN_HEIGHT / 800;

const WidthRatio = (size) => {
    const newSize = size * scaleWidth;
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

const HeightRatio = (size) => {
    const newSize = size * scaleHeight;
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}


export const Navbar = (props) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [isTokenValid, setIsTokenValid] = useState(null);
    const [minimizeNav, setMinimizeNav] = useState(false);

    let localKeyMoment = moment();

    const checkToken = async () => {
        // console.log("= = = = = = ")
        // console.log(mainState.current.bearerToken)
        // console.log("= = = = = = ")

        try {
            const response = await fetch('https://cosmicbackend.herokuapp.com/protected-route', {
                method: 'GET',
                headers: {
                    'Authorization': `${mainState.current.bearerToken}`
                }
            });
            if (response.ok) {
                // Token is still valid
                // console.log("NAV - Token is still valid")
                setIsTokenValid(true)
                return true;
            } else {
                // Token is no longer valid
                // console.log("NAV - Token is no longer valid")

                setIsTokenValid(false)
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const resetActionHome = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home', params: {} }]
    });
    const resetActionGame = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Game', params: {} }]
    });
    // const resetActionLeader = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: 'Leader', params: {} }]
    // });
    const resetActionProfile = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Profile', params: {} }]
    });
    const resetActionAuth = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Auth', params: {} }]
    });
    const resetActionLeader = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Leader', params: {} }]
    });


    useEffect(() => {
        // console.log("NAV BAR USEEFFECT")
        if (props.from == 'home') {
            console.log("Home")
        }
        if (props.from == 'game') {
            console.log("game")
            setMinimizeNav(true)
        }
        if (props.from == 'leader') {
            console.log("leader")
        }
        if (props.from == 'profile') {
            console.log("profile")
        }

    }, [])

    if (localKeyMoment != mainState.current.initialKeyMoment) {
        checkToken();
    }





    return (
        <>
            {minimizeNav ?
                <View
                    style={{
                        position: `${props.position}`,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setMinimizeNav(false)}
                        style={{
                            backgroundColor: 'black',
                            borderRadius: HeightRatio(5),
                            padding: HeightRatio(5),
                        }}>
                        <Text
                            style={{ color: 'white', fontSize: HeightRatio(20), fontWeight: 'bold', alignSelf: 'center' }}
                            allowFontScaling={false}
                        >
                            Exit
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <View
                    style={{
                        position: `${props.position}`,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}
                >
                    {/* [[[HOME]]] */}
                    <TouchableOpacity
                        onPress={() => { 
                            props.nav.dispatch(resetActionHome); 
                            setMainState({
                                isGameInProgress: false
                            })
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10)
                            }}
                            accessible={true}
                            accessibilityLabel="Home"
                        >
                            <Image source={require('../assets/button_home_nav.png')} style={{ height: HeightRatio(60), width: HeightRatio(60) }} />
                        </View>
                    </TouchableOpacity>

                    {/* [[[GAME]]] */}
                    <TouchableOpacity
                        onPress={() => { 
                            props.nav.dispatch(resetActionGame); 
                            setMainState({
                                isGameInProgress: false
                            })
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10)
                            }}
                            accessible={true}
                            accessibilityLabel="Game"
                        >
                            <Image source={require('../assets/button_game_nav.png')} style={{ height: HeightRatio(60), width: HeightRatio(60) }} />
                        </View>
                    </TouchableOpacity>
                    {/* [[[LEADER BOARD]]] */}
                    <TouchableOpacity
                        onPress={() => { 
                            props.nav.dispatch(resetActionLeader); 
                            setMainState({
                                isGameInProgress: false
                            })
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10)
                            }}
                            accessible={true}
                            accessibilityLabel="High Scores"
                        >
                            <Image source={require('../assets/button_scores_nav.png')} style={{ height: HeightRatio(60), width: HeightRatio(60) }} />
                        </View>
                    </TouchableOpacity>

                    {/* [[[PROFILE]]] */}
                    {isTokenValid ?
                        <TouchableOpacity
                            onPress={() => { 
                                props.nav.dispatch(resetActionProfile); 
                                setMainState({
                                    isGameInProgress: false
                                })
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10)
                                }}
                                accessible={true}
                                accessibilityLabel="User profile"
                            >
                                <Image source={require('../assets/button_profile_nav.png')} style={{ height: HeightRatio(60), width: HeightRatio(60) }} />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => { props.nav.dispatch(resetActionAuth); }}
                        >
                            <View
                                style={{
                                    flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10)
                                }}
                            >
                                <Image source={require('../assets/button_profile_nav.png')} style={{ height: HeightRatio(60), width: HeightRatio(60) }} />
                            </View>
                        </TouchableOpacity>

                    }
                </View>
            }
        </>
    )
}