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
import { AlienEffect } from './AlienAnimation';
import { AlienEffect_middle } from './AlientAnimation_middle';
import { AlienEffect_top } from './AlienAnimation_top';
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

async function deleteKey(key) {
    await SecureStore.deleteItemAsync(key);
}

const resetActionAuth = CommonActions.reset({
    index: 1,
    routes: [{ name: 'Auth', params: {} }]
});

export const HomeScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [count, setCount] = useState(0);
    const authState = useRef(false);
    const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
    const [displayUsername, setDisplayUsername] = useState(false);
    const [loading, setLoading] = useState(false);

    const [expand_0, setExpand_0] = useState(false)
    const [expand_1, setExpand_1] = useState(false)


    const userID = useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: mainState.current.userID }
    });


    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result && authState.current) {
            setDisplayUsername(true)
        } else if (!result && !authState.current) {
            setDisplaySignUpModal(true)
            setDisplayUsername(false)
        }
    }


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            authState.current = mainState.current.authState
            userID.current = mainState.current.userID;


            getValueFor('cosmicKey')
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }, 500)
    }, [])



    useEffect(() => {
        if (count > 3) {
            setCount(0);
        } else if (count < 0) {
            setCount(0)
        }
    }, [count])





    return (
        <>
            <View style={{ ...Styling.container }}>
                {/* <ImageBackground
                    source={require('../../assets/home_background.png')}
                    resizeMode="cover"
                    style={{
                        justifyContent: 'center',
                        height: '100%'
                    }}> */}
                {!loading &&
                    <>
                        <SafeAreaView style={{ marginBottom: HeightRatio(60) }}>
                            <ScrollView
                                style={{}}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            >
                                <View style={{}}>

                                    <AlienEffect_top style={{ position: 'absolute', zIndex: 10 }} />
                                    <AlienEffect_middle style={{ position: 'absolute', zIndex: 0, top: HeightRatio(200) }} />
                                    <AlienEffect style={{ position: 'absolute', zIndex: -10 }} />

                                    {displayUsername ?
                                        <>
                                            <View>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: HeightRatio(70),
                                                    fontWeight: 'bold',
                                                    position: 'absolute',
                                                    top: HeightRatio(100),
                                                    left: HeightRatio(50),
                                                    padding: HeightRatio(15),
                                                    width: windowWidth*0.9,
                                                }}
                                                    allowFontScaling={false}
                                                    ellipsizeMode='tail'
                                                    numberOfLines={1}>
                                                    {userByID?.user.username.toUpperCase()}
                                                </Text>
                                                <View style={{
                                                    position: 'absolute',
                                                    top: HeightRatio(200),
                                                    left: HeightRatio(70),
                                                    padding: HeightRatio(15),
                                                    width: windowWidth,
                                                }}>

                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(30),
                                                    }} allowFontScaling={false}>
                                                        HIGH SCORE <Text style={{
                                                            color: 'white',
                                                            fontSize: HeightRatio(30),
                                                        }} allowFontScaling={false}>
                                                            {userByID?.user.highscore}
                                                        </Text>
                                                    </Text>

                                                </View>
                                                <View style={{
                                                    position: 'absolute',
                                                    top: HeightRatio(250),
                                                    left: HeightRatio(70),
                                                    padding: HeightRatio(15),
                                                    width: windowWidth,
                                                }}>

                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(30),
                                                    }} allowFontScaling={false}>
                                                        TOKENS <Text style={{
                                                            color: 'white',
                                                            fontSize: HeightRatio(30),
                                                        }} allowFontScaling={false}>
                                                            {userByID?.user.tokens}
                                                        </Text>
                                                    </Text>

                                                </View>
                                                {userByID?.user.saved != null && userByID?.user.saved.date != null &&
                                                    <View 
                                                        style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            top: HeightRatio(100),
                                                            left: HeightRatio(550),
                                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                            borderRadius: HeightRatio(40)
                                                        }}
                                                    >
                                                        <Image 
                                                            source={require('../../assets/victory.png')}
                                                            style={{
                                                                height: HeightRatio(200),
                                                                width: HeightRatio(200)
                                                            }}
                                                        />
                                                    </View>
                                                }

                                            </View>
                                        </>
                                        :
                                        <>

                                        <View>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: HeightRatio(70),
                                                    fontWeight: 'bold',
                                                    position: 'absolute',
                                                    top: HeightRatio(100),
                                                    padding: HeightRatio(15),
                                                    width: windowWidth,
                                                    textAlign: 'center'
                                                }}
                                                    allowFontScaling={false}>
                                                    Cosmic Scramble
                                                </Text>
                                            </View>

                                        <View style={{ height: HeightRatio(600) }} />
                                        </>
                                    }
                                    {displayUsername ?
                                    <View style={{ marginTop: HeightRatio(1100) }} />
                                    :
                                    <View style={{ marginTop: HeightRatio(500) }} />
                                    }

                                    {/* MAIN CONTENT */}
                                    {!displaySignUpModal &&
                                        <>
                                            {/* OBJECTIVE */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setExpand_0(current => !current)
                                                }}
                                                style={{
                                                    borderRadius: HeightRatio(20),
                                                    padding: HeightRatio(15),
                                                    width: WidthRatio(160),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(20),
                                                    alignSelf: 'center',
                                                    backgroundColor: '#fa2083'
                                                }}>
                                                {!expand_0 ?
                                                    <>
                                                        <LinearGradient
                                                            colors={['#0b132b', '#181d21']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                // height: windowHeight,
                                                                height: HeightRatio(230),
                                                                borderRadius: HeightRatio(20),
                                                                borderWidth: 2,
                                                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                opacity: 0.5
                                                            }}
                                                        />
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Objective
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                // alignSelf: 'center', 
                                                                fontSize: HeightRatio(40),
                                                                fontWeight: 'bold',
                                                                margin: HeightRatio(10),
                                                                marginLeft: HeightRatio(20),
                                                                width: WidthRatio(140)
                                                            }}
                                                            numberOfLines={2}
                                                            ellipsizeMode='tail'
                                                            allowFontScaling={false}
                                                        >
                                                            Collect letters to spell the word at the top of the screen,
                                                            avoid obstacles and enemies. Complete all 5 levels to advance
                                                            to the next stage. Game over after colliding with 3 objects.
                                                        </Text>
                                                    </>
                                                    :
                                                    <>
                                                        <LinearGradient
                                                            colors={['#0b132b', '#181d21']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                height: HeightRatio(360),
                                                                borderRadius: HeightRatio(20),
                                                                borderWidth: 2,
                                                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                opacity: 0.5
                                                            }}
                                                        />
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Objective
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                // alignSelf: 'center', 
                                                                fontSize: HeightRatio(40),
                                                                fontWeight: 'bold',
                                                                margin: HeightRatio(10),
                                                                marginLeft: HeightRatio(20),
                                                                width: WidthRatio(140)
                                                            }}
                                                            numberOfLines={5}
                                                            ellipsizeMode='tail'
                                                            allowFontScaling={false}
                                                        >
                                                            Collect letters to spell the word at the top of the screen,
                                                            avoid obstacles and enemies. Complete all 5 levels to advance
                                                            to the next stage. Game over after colliding with 3 objects.
                                                        </Text>
                                                    </>
                                                }
                                                {!expand_0 ?
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            top: HeightRatio(30),
                                                            alignSelf: 'center',
                                                            left: WidthRatio(120),
                                                            padding: HeightRatio(20),
                                                            borderRadius: HeightRatio(20),
                                                            flexDirection: 'row',
                                                            backgroundColor: '#35faa9',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: HeightRatio(30),
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            allowFontScaling={false}
                                                        >
                                                            MORE
                                                        </Text>
                                                    </View>
                                                    :
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            top: HeightRatio(30),
                                                            alignSelf: 'center',
                                                            left: WidthRatio(120),
                                                            padding: HeightRatio(20),
                                                            borderRadius: HeightRatio(20),
                                                            flexDirection: 'row',
                                                            backgroundColor: '#35faa9',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: HeightRatio(30),
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            allowFontScaling={false}
                                                        >
                                                            CLOSE
                                                        </Text>
                                                    </View>
                                                }
                                            </TouchableOpacity>


                                            {/* GAMEPLAY */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setExpand_1(current => !current)
                                                }}
                                                style={{
                                                    borderRadius: HeightRatio(20),
                                                    padding: HeightRatio(15),
                                                    width: WidthRatio(160),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(20),
                                                    alignSelf: 'center',
                                                    backgroundColor: '#0f3aff'
                                                }}>
                                                {!expand_1 ?
                                                    <>
                                                        <LinearGradient
                                                            colors={['#0b132b', '#181d21']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                // height: windowHeight,
                                                                height: HeightRatio(230),
                                                                borderRadius: HeightRatio(20),
                                                                borderWidth: 2,
                                                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                opacity: 0.5
                                                            }}
                                                        />
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Gameplay
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                // alignSelf: 'center', 
                                                                fontSize: HeightRatio(40),
                                                                fontWeight: 'bold',
                                                                margin: HeightRatio(10),
                                                                marginLeft: HeightRatio(20),
                                                                width: WidthRatio(140)
                                                            }}
                                                            numberOfLines={2}
                                                            ellipsizeMode='tail'
                                                            allowFontScaling={false}
                                                        >
                                                            Learn the rules, play to win: the essentials of the game.
                                                        </Text>

                                                    </>
                                                    :
                                                    <>
                                                        <LinearGradient
                                                            colors={['#0b132b', '#181d21']}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 0,
                                                                right: 0,
                                                                top: 0,
                                                                height: HeightRatio(2120),
                                                                borderRadius: HeightRatio(20),
                                                                borderWidth: 2,
                                                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                opacity: 0.5
                                                            }}
                                                        />
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Gameplay
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                // alignSelf: 'center', 
                                                                fontSize: HeightRatio(40),
                                                                fontWeight: 'bold',
                                                                margin: HeightRatio(10),
                                                                marginLeft: HeightRatio(20),
                                                                width: WidthRatio(140)
                                                            }}
                                                            numberOfLines={5}
                                                            ellipsizeMode='tail'
                                                            allowFontScaling={false}
                                                        >
                                                            Learn the rules, play to win: the essentials of the game.
                                                        </Text>

                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                            borderRadius: HeightRatio(40)
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(50)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Use the green joystick to control the character.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/Example_1.png')}
                                                                style={{
                                                                    height: HeightRatio(300),
                                                                    width: HeightRatio(300)
                                                                }} />
                                                        </View>

                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center'
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(80),
                                                                    marginRight: HeightRatio(40)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Collect matching letters.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/Example_0.png')}
                                                                style={{
                                                                    height: HeightRatio(250),
                                                                    width: HeightRatio(250)
                                                                }} />
                                                        </View>

                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                            borderRadius: HeightRatio(40)
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(90)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Dodge enemy projectiles.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/projectile_enemy_3.png')}
                                                                style={{
                                                                    height: HeightRatio(300),
                                                                    width: HeightRatio(300)
                                                                }} />
                                                        </View>



                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center'
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(90),
                                                                    marginRight: HeightRatio(0)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Three collisions, you loose.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/Example_2.png')}
                                                                style={{
                                                                    height: HeightRatio(300),
                                                                    width: HeightRatio(300)
                                                                }} />
                                                        </View>

                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                            borderRadius: HeightRatio(40)
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(60),
                                                                    margin: HeightRatio(20)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Use Tokens to revive and continue playing.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/token.png')}
                                                                style={{
                                                                    height: HeightRatio(270),
                                                                    width: HeightRatio(270)
                                                                }} />
                                                        </View>

                                                        <View style={{ ...Styling.modalDivisionLine, width: windowWidth * 0.75 }} />

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignSelf: 'center',
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: 'white', fontSize: HeightRatio(40),
                                                                    width: HeightRatio(300),
                                                                    textAlign: 'center',
                                                                    marginTop: HeightRatio(60),
                                                                    margin: HeightRatio(20)
                                                                }}
                                                                allowFontScaling={false}
                                                            >
                                                                Claim your place on the leaderboard.
                                                            </Text>
                                                            <Image
                                                                source={require('../../assets/trophy.png')}
                                                                style={{
                                                                    height: HeightRatio(270),
                                                                    width: HeightRatio(270)
                                                                }} />
                                                        </View>

                                                    </>
                                                }
                                                {!expand_1 ?
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            top: HeightRatio(30),
                                                            alignSelf: 'center',
                                                            left: WidthRatio(120),
                                                            padding: HeightRatio(20),
                                                            borderRadius: HeightRatio(20),
                                                            flexDirection: 'row',
                                                            backgroundColor: '#35faa9',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: HeightRatio(30),
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            allowFontScaling={false}
                                                        >
                                                            MORE
                                                        </Text>
                                                    </View>
                                                    :
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            top: HeightRatio(30),
                                                            alignSelf: 'center',
                                                            left: WidthRatio(120),
                                                            padding: HeightRatio(20),
                                                            borderRadius: HeightRatio(20),
                                                            flexDirection: 'row',
                                                            backgroundColor: '#35faa9',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: 'black',
                                                                fontWeight: 'bold',
                                                                fontSize: HeightRatio(30),
                                                                alignSelf: 'flex-end'
                                                            }}
                                                            allowFontScaling={false}
                                                        >
                                                            CLOSE
                                                        </Text>
                                                    </View>
                                                }
                                            </TouchableOpacity>
                                            <View style={{ height: HeightRatio(500) }}></View>
                                        </>
                                        

                                    }
                                </View >
                            </ScrollView>
                        </SafeAreaView>
                    </>
                }
                {/* </ImageBackground> */}
                <Navbar nav={navigation} auth={mainState.current.authState} position={'absolute'} from={'profile'} />


            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={displaySignUpModal}
                onRequestClose={() => {
                    setDisplaySignUpModal(!displaySignUpModal);
                }}
            >
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ backgroundColor: '#191f25', borderTopLeftRadius: HeightRatio(60), borderTopRightRadius: HeightRatio(60) }}>
                        
                        <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity
                            onPress={() => setDisplaySignUpModal(!displaySignUpModal)}>
                            <View style={{
                                backgroundColor: 'white',
                                height: HeightRatio(20),
                                width: HeightRatio(120),
                                borderRadius: HeightRatio(100),
                                marginTop: HeightRatio(40),
                                alignSelf: 'center'
                            }} />
                        </TouchableOpacity>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: HeightRatio(50),
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    marginTop: HeightRatio(40)
                                }}
                                allowFontScaling={false}>
                                SIGN UP!
                            </Text>
                            <View style={{ height: 10 }}></View>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: HeightRatio(35),
                                    fontWeight: 'bold',
                                    width: windowWidth * 0.9,
                                    alignSelf: 'center'
                                }}
                                allowFontScaling={false}>
                                Enhance your gaming experience and put your skills on display by
                                signing up or logging in and climbing to the top of the leaderboard!
                            </Text>
                            <View style={{ height: 10 }}></View>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: HeightRatio(35),
                                    fontWeight: 'bold',
                                    width: windowWidth * 0.9,
                                    alignSelf: 'center'
                                }}
                                allowFontScaling={false}>
                                As an added bonus, you'll also receive <Text style={{ color: '#fcd01f' }}>5 free</Text> tokens,
                                providing you with the chance to keep playing even if you hit a setback.
                            </Text>
                            

                            <TouchableOpacity
                                onPress={() => navigation.dispatch(resetActionAuth)}
                                style={{ ...Styling.modalWordButton, marginTop: 10 }}
                            >
                                <View style={{
                                    backgroundColor: 'blue',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    padding: HeightRatio(20),
                                    borderRadius: HeightRatio(40),
                                    alignSelf: 'center',
                                    // margin: HeightRatio(10),
                                    width: windowWidth*0.9
                                }}>
                                    <Text
                                        style={{ 
                                            color: 'white', 
                                            fontSize: HeightRatio(40), 
                                            fontWeight: 'bold', 
                                            alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        Sign Up or Login
                                    </Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            </Modal>

            <StatusBar
                barStyle="default"
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
        </>
    )
}