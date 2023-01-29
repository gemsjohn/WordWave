import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { HeightRatio, Styling, WidthRatio } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
} from '@fortawesome/free-solid-svg-icons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function deleteKey(key) {
    // console.log("** DELETE **")
    // console.log(key)
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


    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID.current }
    });


    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result && authState) {
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
                <ImageBackground
                    source={require('../../assets/home_background.png')}
                    resizeMode="cover"
                    style={{
                        justifyContent: 'center',
                        height: '100%'
                    }}>
                    {!loading &&
                        <>
                            <SafeAreaView style={{ height: '90%', marginBottom: HeightRatio(60) }}>
                                <ScrollView style={{}}>
                                    <View style={{}}>
                                        {displayUsername &&
                                            <>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(60),
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center',
                                                        margin: HeightRatio(20)
                                                    }}
                                                    allowFontScaling={false}>
                                                        {userByID?.user.username}
                                                    </Text>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(40),
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center'

                                                    }}
                                                    allowFontScaling={false}>
                                                        Tokens Remaining: {userByID?.user.tokens}
                                                    </Text>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(40),
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center',
                                                        margin: HeightRatio(20)

                                                    }}
                                                    allowFontScaling={false}>
                                                        Your High Score: {userByID?.user.highscore}
                                                    </Text>
                                                </View>
                                                <View style={Styling.profileDivisionLine}></View>
                                            </>
                                        }
                                        {!displaySignUpModal &&
                                            <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                                                {count == 0 &&
                                                    <View style={{
                                                        // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                        backgroundColor: 'transparent',
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

                                                        <View style={{...Styling.profileDivisionLine}}></View>

                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20)
                                                        }}
                                                        allowFontScaling={false}>
                                                            Collect <Text style={{ color: 'white' }}>
                                                                the correct letters.
                                                            </Text>
                                                        </Text>
                                                        <Image
                                                            source={require('../../assets/Example_0.png')}
                                                            style={{ height: HeightRatio(200), width: HeightRatio(300), alignSelf: 'center' }} />

                                                        <View style={{...Styling.profileDivisionLine}}></View>


                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize:  HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20)
                                                        }}
                                                        allowFontScaling={false}>
                                                            Avoid <Text style={{ color: 'white' }}>
                                                                the wrong letters.
                                                            </Text>
                                                        </Text>

                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize:  HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20)
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
                                                                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 5 }}>Asteroid</Text>
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
                                                                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 5 }}>Red UFO</Text>
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
                                                                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 5 }}>Twin</Text>
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
                                                                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 5 }}>Opacity Bot</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{...Styling.profileDivisionLine}}></View>

                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize:  HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20)
                                                        }}
                                                        allowFontScaling={false}>
                                                            Game over? <Text style={{ color: 'white' }}>
                                                                Well, that depends.
                                                            </Text>
                                                        </Text>
                                                        <Image
                                                            source={require('../../assets/Example_0b.png')}
                                                            style={{ height: 200, width: 200, alignSelf: 'center', marginTop: 20 }} />
                                                        <Text style={{
                                                            color: '#00fcff',
                                                            fontSize:  HeightRatio(50),
                                                            fontWeight: 'bold',
                                                            marginTop: HeightRatio(20)
                                                        }}
                                                        allowFontScaling={false}>
                                                            But wait, <Text style={{ color: 'white' }}>
                                                                use a token to continue!
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                }
                                                

                                                <View style={{ height: HeightRatio(200) }}></View>

                                            </View>
                                        }
                                    </View >
                                </ScrollView>
                            </SafeAreaView>
                        </>
                    }
                </ImageBackground>
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
                                    As an added bonus, you'll also receive 5 free tokens,
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
                                <Text style={{ color: 'white', fontSize: HeightRatio(50), alignSelf: 'center' }} allowFontScaling={false}>
                                    Close
                                </Text>
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