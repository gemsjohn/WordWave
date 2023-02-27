import React, { useEffect, useInsertionEffect, useState, useContext, useRef } from 'react';
import { View, Text, Button, Dimensions, Image, TouchableOpacity, PixelRatio, TouchableHighlight, Linking  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID, GET_ME } from '../utils/queries';
import { MainStateContext } from '../App';
import moment from 'moment';
import { Styling } from '../Styling';
import { Tokens } from '../pages/home/Tokens';
import Constants from 'expo-constants';


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
    const version = Constants.manifest2.extra.expoClient.version;

    const [isTokenValid, setIsTokenValid] = useState(null);
    const [minimizeNav, setMinimizeNav] = useState(false);
    const [displayTokenModal, setDisplayTokenModal] = useState(mainState.current.displayTokenModal);
    const [fromGame, setFromGame] = useState(false);

    const authState = useRef(false);
    const userID = useRef(null);

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

    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: mainState.current.userID }
    });


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
        refetch()
        // console.log("NAV BAR USEEFFECT")
        if (props.from == 'home') {
            console.log("Home")
            setFromGame(false)
        }
        if (props.from == 'game') {
            console.log("game")
            setMinimizeNav(true)
            setFromGame(true)
        }
        if (props.from == 'leader') {
            console.log("leader")
            setFromGame(false)
        }
        if (props.from == 'profile') {
            console.log("profile")
            setFromGame(false)
        }

        authState.current = mainState.current.authState
        userID.current = mainState.current.userID;

    }, [])

    if (localKeyMoment != mainState.current.initialKeyMoment && mainState.current.bearerToken != null) {
        checkToken();
    }






    return (
        <>
            {minimizeNav ?
                <View
                    style={{
                        position: 'absolute',
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
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: HeightRatio(100),
                            height: HeightRatio(50),
                            width: HeightRatio(50),
                            padding: HeightRatio(5),
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}>
                        <FontAwesomeIcon
                            icon={faSolid, faBars}
                            style={{ color: 'white', alignSelf: 'center' }}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                :
                <>
                    {props.from == 'home' &&
                        <>
                            {typeof userByID?.user.currentVersion === 'string' && typeof version === 'string' && userByID?.user.currentVersion != version ?
                               
                                    <TouchableHighlight
                                        onPress={() => {
                                            Linking.openURL('https://play.google.com/store/apps/details?id=com.cosmicscramble&hl=en_US&gl=US');
                                        }}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 20,
                                            // top: 0,
                                            // left: 0,
                                            // right: 0,
                                            bottom: HeightRatio(70),
                                            // right: HeightRatio(30),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            backgroundColor: '#43484f',
                                            flexDirection: 'row',
                                            height: HeightRatio(60),
                                            width: HeightRatio(300),
                                            borderRadius: HeightRatio(30),
                                            borderWidth: 2,
                                            borderColor: '#35faa9'
                                        }}
                                        underlayColor="#ffffff"
                                    >
                                        <Text
                                            style={{ color: 'white', fontSize: HeightRatio(24), fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}
                                            allowFontScaling={false}
                                        >
                                            UPDATE
                                        </Text>
                                    </TouchableHighlight>
                                :
                                <View
                                    style={{
                                        position: 'absolute',
                                        zIndex: 20,
                                        // top: 0,
                                        // left: 0,
                                        // right: 0,
                                        bottom: HeightRatio(70),
                                        right: HeightRatio(30),
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        backgroundColor: '#161b21',
                                        flexDirection: 'row',
                                        // padding: HeightRatio(10),
                                        height: HeightRatio(40),
                                        width: HeightRatio(80),
                                        borderRadius: HeightRatio(30),
                                        borderWidth: 2,
                                        borderColor: '#35faa9'
                                    }}
                                >
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(18), textAlign: 'center', alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        v{version}
                                    </Text>
                                </View>
                            }
                        </>

                    }
                    <View
                        style={{
                            position: `${props.position}`,
                            zIndex: 10,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderTopLeftRadius: HeightRatio(30) }}
                        >
                            <View
                                style={{
                                    flexDirection: 'column', marginLeft: HeightRatio(10), marginRight: HeightRatio(10),
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
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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

                        {authState.current == true && userID.current != null &&
                            // <Tokens userID={userID.current} />
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                {displayTokenModal ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDisplayTokenModal(false);
                                            setMainState({
                                                displayTokenModal: false,
                                                tokens_isPurchaseSuccessful: false,
                                                tokens_display: true
                                            })

                                        }}
                                        style={{
                                            height: HeightRatio(60),
                                            width: HeightRatio(60),
                                            flexDirection: 'column',
                                            backgroundColor: 'red',
                                            borderRadius: HeightRatio(100),
                                            justifyContent: 'center',
                                            borderWidth: 2,
                                            borderColor: 'white',
                                            backgroundColor: 'red'
                                        }}
                                    >

                                        <Text style={{
                                            color: 'white',
                                            fontSize: HeightRatio(13),
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }} allowFontScaling={false}>
                                            CLOSE
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDisplayTokenModal(true)
                                            setMainState({
                                                displayTokenModal: true,
                                                tokens_display: true,
                                                tokens_isPurchaseSuccessful: false
                                            })
                                        }}
                                        style={{
                                            height: HeightRatio(60),
                                            width: HeightRatio(60),
                                            flexDirection: 'column',
                                            backgroundColor: 'blue',
                                            borderRadius: HeightRatio(100),
                                            justifyContent: 'center',
                                            borderWidth: 2,
                                            borderColor: 'white',
                                            backgroundColor: '#35faa9'
                                        }}
                                    >

                                        <Text style={{
                                            color: 'black',
                                            fontSize: HeightRatio(13),
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }} allowFontScaling={false}>
                                            BUY TOKENS
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }

                        {/* [[[LEADER BOARD]]] */}
                        <TouchableOpacity
                            onPress={() => {
                                props.nav.dispatch(resetActionLeader);
                                setMainState({
                                    isGameInProgress: false
                                })
                            }}
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderTopRightRadius: HeightRatio(30) }}
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
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderTopRightRadius: HeightRatio(30) }}
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

                        {fromGame &&
                            <TouchableOpacity
                                onPress={() => setMinimizeNav(true)}
                                style={{
                                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                                    borderRadius: HeightRatio(100),
                                    height: HeightRatio(50),
                                    width: HeightRatio(50),
                                    padding: HeightRatio(5),
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    zIndex: 10,
                                    top: HeightRatio(10),
                                    left: HeightRatio(160)
                                }}>
                                <FontAwesomeIcon
                                    icon={faSolid, faX}
                                    style={{ color: 'white', alignSelf: 'center' }}
                                    size={20}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </>
            }
            {displayTokenModal &&
                <>
                    {authState.current == true && userID.current != null &&
                        <Tokens userID={userID.current} />
                    }
                </>

            }
        </>
    )
}