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
    RefreshControl
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
} from '@fortawesome/free-solid-svg-icons'


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
        variables: { id: userID.current }
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
                                    <Image
                                        source={require('../../assets/home_background_image.png')}
                                        style={{
                                            width: windowWidth,
                                            height: HeightRatio(600),
                                            position: 'absolute',
                                            zIndex: -10,
                                            borderBottomLeftRadius: HeightRatio(100),
                                            borderBottomRightRadius: HeightRatio(100),
                                            opacity: 1.0
                                        }}
                                    />
                                    {displayUsername ?
                                        <>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: HeightRatio(70),
                                                fontWeight: 'bold',
                                                alignSelf: 'center',
                                                position: 'absolute',
                                                top: HeightRatio(400),
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                padding: HeightRatio(15),
                                                width: windowWidth,
                                                textAlign: 'center'
                                            }}
                                                allowFontScaling={false}>
                                                {userByID?.user.username}
                                            </Text>
                                            <View style={{ flexDirection: 'row', marginTop: HeightRatio(500), alignSelf: 'center' }}>
                                                <View style={{
                                                    height: HeightRatio(120),
                                                    width: HeightRatio(270),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(10),
                                                    backgroundColor: '#35faa9',
                                                    borderRadius: HeightRatio(20),
                                                    borderWidth: 1,
                                                }}>

                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(20)
                                                    }} allowFontScaling={false}>
                                                        YOUR HIGH SCORE
                                                    </Text>

                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(10)
                                                    }} allowFontScaling={false}>
                                                        {userByID?.user.highscore}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    height: HeightRatio(120),
                                                    width: HeightRatio(270),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(10),
                                                    backgroundColor: '#35faa9',
                                                    borderRadius: HeightRatio(20),
                                                    borderWidth: 1
                                                }}>

                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(20),
                                                    }} allowFontScaling={false}>
                                                        TOKENS
                                                    </Text>

                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(10)
                                                    }} allowFontScaling={false}>
                                                        {userByID?.user.tokens}
                                                    </Text>
                                                </View>
                                                {/* <View style={{
                                                    height: HeightRatio(130),
                                                    width: HeightRatio(130),
                                                    flexDirection: 'column',
                                                    backgroundColor: '#fcd01f',
                                                    borderRadius: HeightRatio(100),
                                                    justifyContent: 'center',
                                                }}>

                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: HeightRatio(30),
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                    }}>
                                                        BUY TOKENS
                                                    </Text>
                                                </View> */}
                                            </View>
                                        </>
                                        :
                                        <View style={{ height: HeightRatio(600) }} />
                                    }
                                    {!displaySignUpModal &&
                                        <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                                            {count == 0 &&
                                                <View>
                                                    <View style={{

                                                        backgroundColor: '#043648',
                                                        // borderColor: 'rgba(255, 255, 255, 0.25)',
                                                        borderWidth: 1,
                                                        padding: HeightRatio(20),
                                                        borderRadius: HeightRatio(40),
                                                        width: WidthRatio(160),
                                                        margin: HeightRatio(20),
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(4),
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                            padding: HeightRatio(10),
                                                            borderRadius: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Objective
                                                        </Text>
                                                        <Text style={{
                                                            color: 'white',
                                                            fontSize: HeightRatio(40),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(20),
                                                            alignSelf: 'center'
                                                        }}
                                                            allowFontScaling={false}>
                                                            Collect letters to spell the word at the top of the screen,
                                                            avoid obstacles and enemies. Complete all 5 levels to advance
                                                            to the next stage. Game over after colliding with 3 objects.
                                                        </Text>
                                                    </View>

                                                    <View style={{
                                                        backgroundColor: '#043648',
                                                        // borderColor: 'rgba(255, 255, 255, 0.25)',
                                                        borderWidth: 1,
                                                        padding: HeightRatio(20),
                                                        borderRadius: HeightRatio(40),
                                                        width: WidthRatio(160),
                                                        margin: HeightRatio(20),
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            margin: HeightRatio(4),
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                            padding: HeightRatio(10),
                                                            borderRadius: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Collect <Text style={{ color: 'white' }}>
                                                                the correct letters.
                                                            </Text>
                                                        </Text>

                                                        <Image
                                                            source={require('../../assets/Example_0.png')}
                                                            style={{ height: HeightRatio(200), width: HeightRatio(300), alignSelf: 'center' }} />

                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20),
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                            padding: HeightRatio(10),
                                                            borderRadius: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Avoid <Text style={{ color: 'white' }}>
                                                                the wrong letters.
                                                            </Text>
                                                        </Text>

                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20),
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                            padding: HeightRatio(10),
                                                            borderRadius: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Avoid <Text style={{ color: 'white' }}>
                                                                obstacles.
                                                            </Text>
                                                        </Text>

                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                            alignSelf: 'center',
                                                            justifyContent: 'center',
                                                            marginTop: HeightRatio(20)
                                                        }}>

                                                            {/* CHARACTER: Asteroid */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_asteroid_2.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Asteroid</Text>
                                                            </View>

                                                            {/* CHARACTER: Red UFO */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_red_ufo.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Red UFO</Text>
                                                            </View>

                                                            {/* CHARACTER: Twin */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_enemy_4.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Twin</Text>
                                                            </View>

                                                            {/* CHARACTER: Opacity Bot */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_enemy_3.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Opacity Bot</Text>
                                                            </View>
                                                            {/* CHARACTER: Atomic Oscillator */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_atomic.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Atomic Oscillator</Text>
                                                            </View>

                                                            {/* CHARACTER: Triangle */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectiles_triangle.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Triangle</Text>
                                                            </View>

                                                            {/* CHARACTER: Fireball */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_fire_ball_1.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Fireball</Text>
                                                            </View>

                                                            {/* CHARACTER: Fire Boss */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_enemy_0.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Fire Boss</Text>
                                                            </View>

                                                            {/* CHARACTER: Blank Key */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5,
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/block_keyboard_key.png')}
                                                                    style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                                                <Text 
                                                                    style={{ color: 'white', textAlign: 'center', marginTop: 5 }}
                                                                    allowFontScaling={false}
                                                                >Blank Key</Text>
                                                            </View>

                                                        </View>
                                                    </View>


                                                    <View style={{
                                                       backgroundColor: '#043648',
                                                       borderColor: 'rgba(255, 255, 255, 0.25)',
                                                       borderWidth: 1,
                                                       padding: HeightRatio(20),
                                                       borderRadius: HeightRatio(40),
                                                       width: WidthRatio(160),
                                                       margin: HeightRatio(20),
                                                       alignSelf: 'center',
                                                       justifyContent: 'center',
                                                       flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(45),
                                                            fontWeight: 'bold',
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                            padding: HeightRatio(10),
                                                            borderRadius: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            Game over? <Text style={{ color: 'white' }}>
                                                                Well, that depends.
                                                            </Text>
                                                        </Text>
                                                        <Image
                                                            source={require('../../assets/Example_0b.png')}
                                                            style={{ height: 200, width: 200, alignSelf: 'center', marginTop: 20 }} />
                                                    </View>

                                                    <View style={{
                                                        backgroundColor: '#043648',
                                                        borderColor: 'rgba(255, 255, 255, 0.25)',
                                                        borderWidth: 1,
                                                        padding: HeightRatio(20),
                                                        borderRadius: HeightRatio(40),
                                                        width: WidthRatio(160),
                                                        margin: HeightRatio(20),
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                       
                                                        <Text style={{
                                                            color: '#00fcff',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            // marginTop: HeightRatio(20)
                                                        }}
                                                            allowFontScaling={false}>
                                                            But wait, <Text style={{ color: 'white' }}>
                                                                if you want to continue playing you can use a token!
                                                            </Text>
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                console.log("BUY TOKEN")
                                                            }}
                                                            style={{ ...Styling.modalWordButton, marginTop: 0 }}
                                                        >
                                                            <View style={{
                                                                backgroundColor: 'blue',
                                                                display: 'flex',
                                                                justifyContent: 'flex-start',
                                                                padding: HeightRatio(40),
                                                                borderRadius: HeightRatio(80),
                                                                alignSelf: 'center',
                                                                margin: HeightRatio(10),
                                                                width: WidthRatio(140)
                                                            }}>
                                                                <Text
                                                                    style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                                                                    allowFontScaling={false}
                                                                >
                                                                    Buy Tokens
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                            }


                                            <View style={{ height: HeightRatio(500) }}></View>

                                        </View>
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
                <View style={Styling.modal_centered_view}>
                    <View style={Styling.modal_view}>
                        <View style={{ flexDirection: 'column', width: WidthRatio(160) }}>
                            <Text
                                style={{ color: '#fcd01f', fontSize: HeightRatio(50), fontWeight: 'bold' }}
                                allowFontScaling={false}>
                                Main thing : <Text style={{ color: 'white' }}>
                                    Sign up!
                                </Text>
                            </Text>
                            <View style={{ height: 10 }}></View>
                            <Text
                                style={{ color: '#fcd01f', fontSize: HeightRatio(50), fontWeight: 'bold' }}
                                allowFontScaling={false}>
                                Details : <Text style={{ color: 'white' }}>
                                    Enhance your gaming experience and put your skills on display by
                                    signing up or logging in and climbing to the top of the leaderboard!
                                </Text>
                            </Text>
                            <View style={{ height: 10 }}></View>

                            <Text style={{ color: '#fcd01f', fontSize: HeightRatio(50), fontWeight: 'bold' }} allowFontScaling={false}>
                                Oh yeah? : <Text style={{ color: 'white' }}>
                                    As an added bonus, you'll also receive <Text style={{color: '#6de5e9'}}>5 free</Text> tokens,
                                    providing you with the chance to keep playing even if you hit a setback.
                                </Text>
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.dispatch(resetActionAuth)}
                                style={{ ...Styling.modalWordButton, marginTop: 10 }}
                            >
                                <View style={{
                                    backgroundColor: 'blue',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    padding: HeightRatio(40),
                                    borderRadius: HeightRatio(40),
                                    alignSelf: 'center',
                                    margin: HeightRatio(10),
                                }}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        Sign Up or Login
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setDisplaySignUpModal(!displaySignUpModal)}>
                                <View style={{
                                    padding: HeightRatio(10),
                                    alignSelf: 'center',
                                    margin: HeightRatio(10),
                                }}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        Close
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