import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { UserDetails } from './UserDetails';
import { SavedGame } from './SavedGame';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { HeightRatio, WidthRatio, Styling } from '../../Styling';
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
    faGamepad,
} from '@fortawesome/free-solid-svg-icons'
import { SecureStorage } from './SecureStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function deleteKey(key) {
    await SecureStore.deleteItemAsync(key);
}

export const ProfileScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    const [displaySetUpCosmicKeyModal, setDisplaySetUpCosmicKeyModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [expand_0, setExpand_0] = useState(false)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const authState = useRef(false);
    const userID = useRef(null);

    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: mainState.current.userID }
    });

    const resetActionAuth = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Auth', params: {} }]
    });

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result && authState) {
            return;
        } else if (!result && authState.current) {
            setDisplaySetUpCosmicKeyModal(true)
        }
    }


    useEffect(() => {
        setLoading(true)
        refetch();
        setTimeout(() => {
            authState.current = mainState.current.authState
            userID.current = mainState.current.userID;
            getValueFor('cosmicKey')
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }, 500)

    }, [])


    return (
        <>
            <View style={{ ...Styling.container }}>
                {!loading &&
                    <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 0 }}>
                        <ScrollView
                            style={{}}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={{}}>
                                {mainState.current.authState &&
                                    <>
                                        <View style={{}}>


                                            <Image
                                                source={require('../../assets/profile_alien_full.png')}
                                                style={{
                                                    height: HeightRatio(600),
                                                    width: HeightRatio(600),
                                                    alignSelf: 'center'
                                                }} />

                                            <View style={{ flexDirection: 'row', marginTop: HeightRatio(20), alignSelf: 'center' }}>
                                                <View style={{
                                                    height: HeightRatio(120),
                                                    width: HeightRatio(270),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(10)

                                                }}>
                                                    <LinearGradient
                                                        colors={['#0b132b', '#181d21']}
                                                        style={{
                                                            ...Styling.background,
                                                            height: HeightRatio(120),
                                                            borderRadius: HeightRatio(20),
                                                            borderWidth: 2,
                                                            borderColor: 'rgba(255, 255, 255, 0.25)',
                                                            opacity: 0.5
                                                        }}
                                                    />
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(20)
                                                    }} allowFontScaling={false}>
                                                        YOUR HIGH SCORE
                                                    </Text>

                                                    <Text style={{
                                                        color: 'white',
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
                                                    margin: HeightRatio(10)
                                                }}>
                                                    <LinearGradient
                                                        colors={['#0b132b', '#181d21']}
                                                        style={{
                                                            ...Styling.background,
                                                            height: HeightRatio(120),
                                                            borderRadius: HeightRatio(20),
                                                            borderWidth: 2,
                                                            borderColor: 'rgba(255, 255, 255, 0.25)',
                                                            opacity: 0.5
                                                        }}
                                                    />
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(20)
                                                    }} allowFontScaling={false}>
                                                        TOKENS
                                                    </Text>

                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: HeightRatio(30),
                                                        textAlign: 'center',
                                                        marginTop: HeightRatio(10)
                                                    }} allowFontScaling={false}>
                                                        {userByID?.user.tokens}
                                                    </Text>
                                                </View>
                                            </View>
                                            {userByID?.user.tobecontinued != null &&
                                                    <View
                                                        style={{
                                                            
                                                        }}
                                                    >
                                                        


                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setExpand_0(current => !current)
                                                            }}
                                                            style={{
                                                                marginTop: HeightRatio(20),
                                                                marginBottom: expand_0 ? HeightRatio(150) : HeightRatio(20),
                                                                // backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                                borderRadius: HeightRatio(40),
                                                                width: windowWidth*0.8,
                                                                alignSelf: 'center',
                                                                flexDirection: 'row',
                                                            }}>
                                                            {!expand_0 ?
                                                                <>
                                                                    <LinearGradient
                                                                        colors={['#0b132b', '#181d21']}
                                                                        style={{
                                                                            ...Styling.background,
                                                                            height: HeightRatio(190),
                                                                            borderRadius: HeightRatio(20),
                                                                            borderWidth: 2,
                                                                            borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                            opacity: 0.5
                                                                        }}
                                                                    />
                                                                    <Image
                                                                        source={require('../../assets/victory.png')}
                                                                        style={{
                                                                            height: HeightRatio(200),
                                                                            width: HeightRatio(200)
                                                                        }}
                                                                    />
                                                                    <View style={{
                                                                        flexDirection: 'column',
                                                                        alignSelf: 'center',
                                                                    }}>
                                                                        
                                                                        <Text style={{
                                                                            color: '#fcd01f',
                                                                            fontSize: HeightRatio(40),
                                                                            textAlign: 'center',
                                                                            width: HeightRatio(400),
                                                                        }} allowFontScaling={false}>
                                                                            YOU BEAT THE GAME!
                                                                        </Text>
                                                                    </View>
                                                                </>
                                                                :
                                                                <>
                                                                    <LinearGradient
                                                                        colors={['#0b132b', '#181d21']}
                                                                        style={{
                                                                            ...Styling.background,
                                                                            height: HeightRatio(320),
                                                                            borderRadius: HeightRatio(20),
                                                                            borderWidth: 2,
                                                                            borderColor: 'rgba(255, 255, 255, 0.25)',
                                                                            opacity: 0.5
                                                                        }}
                                                                    />
                                                                    <Image
                                                                        source={require('../../assets/victory.png')}
                                                                        style={{
                                                                            height: HeightRatio(200),
                                                                            width: HeightRatio(200)
                                                                        }}
                                                                    />
                                                                    <View style={{
                                                                        flexDirection: 'column',
                                                                        alignSelf: 'center',
                                                                        marginTop: HeightRatio(60)
                                                                    }}>
                                                                        
                                                                        <Text style={{
                                                                            color: '#fcd01f',
                                                                            fontSize: HeightRatio(40),
                                                                            textAlign: 'center',
                                                                            width: HeightRatio(400),
                                                                        }} allowFontScaling={false}>
                                                                            YOU BEAT THE GAME!
                                                                        </Text>
                                                                        <Text style={{
                                                                            color: 'white',
                                                                            fontSize: HeightRatio(30),
                                                                            // textAlign: 'center',
                                                                            marginTop: HeightRatio(10),
                                                                            marginBottom: HeightRatio(10),
                                                                            marginLeft: HeightRatio(30)
                                                                        }} allowFontScaling={false}>
                                                                            Score: {userByID?.user.tobecontinued.score}
                                                                        </Text>
                                                                        <Text style={{
                                                                            position: 'absolute',
                                                                            left: HeightRatio(-180),
                                                                            top: HeightRatio(100),
                                                                            color: 'white',
                                                                            fontSize: HeightRatio(30),
                                                                            marginTop: HeightRatio(20),
                                                                            marginLeft: HeightRatio(20),
                                                                            width: HeightRatio(580),
                                                                            padding: HeightRatio(20),
                                                                            borderRadius: HeightRatio(20),
                                                                            backgroundColor: 'rgba(0, 255, 0, 0.1)'
                                                                        }} allowFontScaling={false}>
                                                                            You will get a notification when more stages are available.
                                                                        </Text>
                                                                    </View>
                                                                </>
                                                            }
                                                            {!expand_0 ?
                                                                <View
                                                                    style={{
                                                                        position: 'absolute',
                                                                        zIndex: 10,
                                                                        top: HeightRatio(16),
                                                                        alignSelf: 'center',
                                                                        left: WidthRatio(130),
                                                                        padding: HeightRatio(13),
                                                                        height: HeightRatio(50),
                                                                        width: HeightRatio(50),
                                                                        borderRadius: HeightRatio(100),
                                                                        flexDirection: 'row',
                                                                        backgroundColor: '#35faa9',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <Text style={{color: 'black', textAlign: 'center'}}>
                                                                        i
                                                                    </Text>
                                                                </View>
                                                                :
                                                                <View
                                                                    style={{
                                                                        position: 'absolute',
                                                                        zIndex: 10,
                                                                        top: HeightRatio(16),
                                                                        alignSelf: 'center',
                                                                        left: WidthRatio(130),
                                                                        padding: HeightRatio(13),
                                                                        height: HeightRatio(50),
                                                                        width: HeightRatio(50),
                                                                        borderRadius: HeightRatio(100),
                                                                        flexDirection: 'row',
                                                                        backgroundColor: 'red',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <Text style={{color: 'black', textAlign: 'center'}}>
                                                                        i
                                                                    </Text>
                                                                </View>
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            {/* [[[USER DETAILS]]] */}
                                            <View
                                                style={{ flexDirection: 'row', margin: HeightRatio(20), marginTop: HeightRatio(5), alignSelf: 'center' }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSolid, faSliders}
                                                    style={{ ...Styling.modalFontAwesomeIcons, color: 'white' }}
                                                    size={30}
                                                />
                                                <Text
                                                    style={Styling.modalScoringVarText}
                                                    allowFontScaling={false}>
                                                    User Details
                                                </Text>
                                            </View>
                                            <View style={{ alignSelf: 'center' }}>
                                                <UserDetails nav={navigation} />
                                            </View>


                                            {/* [[[SAVED GAME DETAILS]]] */}
                                            <View
                                                style={{ flexDirection: 'row', margin: HeightRatio(20), alignSelf: 'center' }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSolid, faGamepad}
                                                    style={{ ...Styling.modalFontAwesomeIcons, color: 'white' }}
                                                    size={30}
                                                />
                                                <Text style={Styling.modalScoringVarText} allowFontScaling={false}>
                                                    Saved Game
                                                </Text>
                                            </View>
                                            {userByID?.user.saved != null && userByID?.user.saved.date != null ?
                                                <View style={{
                                                    alignSelf: 'center',
                                                    marginBottom: 20,
                                                    width: WidthRatio(160),
                                                    padding: HeightRatio(25),
                                                    width: WidthRatio(160),
                                                    flexDirection: 'column',
                                                    margin: HeightRatio(20),
                                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                    borderTopLeftRadius: HeightRatio(20),
                                                    alignSelf: 'center'
                                                }}>
                                                    <LinearGradient
                                                        colors={['#0b132b', '#181d21']}
                                                        style={{ ...Styling.background, height: HeightRatio(325), borderRadius: HeightRatio(30), opacity: 0.5 }}
                                                    />
                                                    <SavedGame nav={navigation} />
                                                </View>
                                                :
                                                <View style={{ marginBottom: HeightRatio(50) }}>
                                                    <Text
                                                        style={{ color: 'white', fontSize: HeightRatio(50), textAlign: 'center' }}
                                                        allowFontScaling={false}
                                                    >
                                                        None
                                                    </Text>
                                                </View>
                                            }

                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteKey('cosmicKey');
                                                        setTimeout(() => {
                                                            setDisplaySetUpCosmicKeyModal(true)
                                                        }, 500)
                                                    }}
                                                    style={Styling.modalWordButton}>
                                                    <View style={{
                                                        backgroundColor: '#f8200d',
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                        padding: HeightRatio(40),
                                                        borderRadius: HeightRatio(80),
                                                        alignSelf: 'center',
                                                        margin: HeightRatio(10),
                                                        width: WidthRatio(160)
                                                    }}>
                                                        <Text
                                                            style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                                                            allowFontScaling={false}
                                                        >
                                                            Remove/Reset Keycode
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    deleteKey('cosmicKey');

                                                    setMainState({
                                                        bearerToken: null,
                                                        userID: null,
                                                        authState: false
                                                    })
                                                    navigation.dispatch(resetActionAuth)
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
                                                    width: WidthRatio(160)
                                                }}>
                                                    <Text
                                                        style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                                                        allowFontScaling={false}
                                                    >
                                                        Switch User
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{ marginBottom: 200 }}></View>
                                    </>
                                }
                            </View >
                        </ScrollView>
                    </SafeAreaView>
                }
                {/* </ImageBackground> */}
                <Navbar nav={navigation} auth={mainState.current.authState} position={'absolute'} from={'profile'} />

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={displaySetUpCosmicKeyModal}
                onRequestClose={() => {
                    setDisplaySetUpCosmicKeyModal(!displaySetUpCosmicKeyModal);
                }}
            >
                <View style={Styling.modal_centered_view}>
                    <View style={Styling.modal_view}>
                        <View style={{ flexDirection: 'column' }}>

                            <SecureStorage />

                            <TouchableOpacity
                                onPress={() => setDisplaySetUpCosmicKeyModal(!displaySetUpCosmicKeyModal)}
                                style={{ marginTop: HeightRatio(20) }}>
                                <Text
                                    style={{ color: '#35faa9', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center' }}
                                    allowFontScaling={false}
                                >
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