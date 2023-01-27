import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { Styling } from '../../Styling';
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
                            <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 32 }}>
                                <ScrollView style={{}}>
                                    <View style={{}}>
                                        {displayUsername &&
                                            <>
                                                <View style={{ marginTop: 50, flexDirection: 'column' }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 30,
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center'
                                                    }}>
                                                        {userByID?.user.username}
                                                    </Text>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 15,
                                                        fontWeight: 'bold',
                                                        alignSelf: 'center'

                                                    }}>
                                                        Tokens Remaining: {userByID?.user.tokens}
                                                    </Text>
                                                </View>
                                                <View style={Styling.profileDivisionLine}></View>
                                            </>
                                        }
                                        {!displaySignUpModal &&
                                            <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                                                {count == 0 &&
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        width: 400,
                                                        margin: 10,
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                            width: 400,
                                                            margin: 4
                                                        }}>
                                                            Objective
                                                        </Text>
                                                        <Text style={{
                                                            color: 'white',
                                                            fontSize: 20,
                                                            fontWeight: 'bold',
                                                            width: 350,
                                                            margin: 10
                                                        }}>
                                                            Collect letters to spell the word at the top of the screen,
                                                            avoid obstacles and enemies. Complete all 5 levels to advance
                                                            to the next stage. Game over after colliding with 3 objects.
                                                        </Text>

                                                        <View style={{...Styling.profileDivisionLine, width: 300}}></View>

                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                            marginTop: 20
                                                        }}>
                                                            Collect <Text style={{ color: 'white' }}>
                                                                the correct letters.
                                                            </Text>
                                                        </Text>
                                                        <Image
                                                            source={require('../../assets/Example_0.png')}
                                                            style={{ height: 130, width: 200, alignSelf: 'center' }} />

                                                        <View style={{...Styling.profileDivisionLine, width: 300}}></View>


                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                            marginTop: 20
                                                        }}>
                                                            Avoid <Text style={{ color: 'white' }}>
                                                                the wrong letters.
                                                            </Text>
                                                        </Text>

                                                        <Text style={{
                                                            color: '#f8200d',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                            marginTop: 20
                                                        }}>
                                                            Avoid <Text style={{ color: 'white' }}>
                                                                obstacles.
                                                            </Text>
                                                        </Text>
                                                        
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                            alignSelf: 'center',
                                                            justifyContent: 'center',
                                                            marginTop: 20
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

                                                        <View style={{...Styling.profileDivisionLine, width: 300}}></View>

                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                            marginTop: 20
                                                        }}>
                                                            Game over? <Text style={{ color: 'white' }}>
                                                                Well, that depends.
                                                            </Text>
                                                        </Text>
                                                        <Image
                                                            source={require('../../assets/Example_0b.png')}
                                                            style={{ height: 200, width: 200, alignSelf: 'center', marginTop: 20 }} />
                                                        <Text style={{
                                                            color: '#00fcff',
                                                            fontSize: 25,
                                                            fontWeight: 'bold',
                                                            marginTop: 0
                                                        }}>
                                                            But wait, <Text style={{ color: 'white' }}>
                                                                use a token to continue!
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                }
                                                {count == 1 &&
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        width: 400,
                                                        margin: 10,
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                            width: 400,
                                                            margin: 4
                                                        }}>
                                                            Characters
                                                        </Text>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                        }}>
                                                            {/* CHARACTER: You */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/Char_1.png')}
                                                                    style={{ height: 75, width: 75 }} />
                                                                <Text style={{ color: 'white', alignSelf: 'center' }}>You</Text>
                                                            </View>

                                                            {/* CHARACTER: Asteroid */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_asteroid_2.png')}
                                                                    style={{ height: 75, width: 75 }} />
                                                                <Text style={{ color: 'white', alignSelf: 'center' }}>Asteroid</Text>
                                                            </View>

                                                            {/* CHARACTER: Red UFO */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_red_ufo.png')}
                                                                    style={{ height: 75, width: 75 }} />
                                                                <Text style={{ color: 'white', alignSelf: 'center' }}>Red UFO</Text>
                                                            </View>

                                                            {/* CHARACTER: Twin */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_enemy_4.png')}
                                                                    style={{ height: 75, width: 75 }} />
                                                                <Text style={{ color: 'white', alignSelf: 'center' }}>Twin</Text>
                                                            </View>

                                                            {/* CHARACTER: Opacity Bot */}
                                                            <View style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                borderRadius: 10,
                                                                padding: 10,
                                                                margin: 5
                                                            }}>
                                                                <Image
                                                                    source={require('../../assets/projectile_enemy_3.png')}
                                                                    style={{ height: 75, width: 75 }} />
                                                                <Text style={{ color: 'white', alignSelf: 'center' }}>Opacity Bot</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                }
                                                {count == 2 &&
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        width: 400,
                                                        margin: 10,
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                            width: 400,
                                                            margin: 4
                                                        }}>
                                                            Stages
                                                        </Text>
                                                        <Text style={{
                                                            color: 'white',
                                                            fontSize: 20,
                                                            fontWeight: 'bold',
                                                            width: 350,
                                                            margin: 10
                                                        }}>
                                                            Details
                                                        </Text>
                                                    </View>
                                                }
                                                {count == 3 &&
                                                    <View style={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        width: 400,
                                                        margin: 10,
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        <Text style={{
                                                            color: '#fcd01f',
                                                            fontSize: 40,
                                                            fontWeight: 'bold',
                                                            width: 400,
                                                            margin: 4
                                                        }}>
                                                            Extras
                                                        </Text>
                                                        <Text style={{
                                                            color: 'white',
                                                            fontSize: 20,
                                                            fontWeight: 'bold',
                                                            width: 350,
                                                            margin: 10
                                                        }}>
                                                            Details
                                                        </Text>
                                                    </View>
                                                }

                                                <View style={{ height: 200 }}></View>

                                            </View>
                                        }
                                    </View >
                                </ScrollView>
                            </SafeAreaView>

                            {/* <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 200 }}>
                        <TouchableOpacity onPress={() => { console.log("UP"); setCount(prev => prev - 1); }}>
                        <Image
                            source={require('../../assets/home_up_arrow.png')}
                            style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>

                        <View style={{ width: 50, height: 50 }} />

                        <TouchableOpacity onPress={() => { console.log("DOWN"); setCount(prev => prev + 1); }}>
                        <Image
                            source={require('../../assets/home_down_arrow.png')}
                            style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        </View> */}
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
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#fcd01f', fontSize: 25, fontWeight: 'bold' }}>
                                Main thing : <Text style={{ color: 'white' }}>
                                    Sign up!
                                </Text>
                            </Text>
                            <View style={{ height: 10 }}></View>
                            <Text style={{ color: '#fcd01f', fontSize: 25, fontWeight: 'bold' }}>
                                Details : <Text style={{ color: 'white' }}>
                                    Enhance your gaming experience and put your skills on display by
                                    signing up or logging in and climbing to the top of the leaderboard!
                                </Text>
                            </Text>
                            <View style={{ height: 10 }}></View>

                            <Text style={{ color: '#fcd01f', fontSize: 25, fontWeight: 'bold' }}>
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
                                    padding: 20,
                                    borderRadius: 40,
                                    alignSelf: 'center',
                                    margin: 10,
                                    width: 350
                                }}>
                                    <Text
                                        style={{ color: 'white', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        Sign Up or Login
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setDisplaySignUpModal(!displaySignUpModal)}>
                                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>
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