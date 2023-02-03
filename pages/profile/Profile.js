import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { UserDetails } from './UserDetails';
import { SavedGame } from './SavedGame';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { RecentGames } from '../game/RecentGames';
import { HeightRatio, WidthRatio, Styling } from '../../Styling';
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
    ImageBackground
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
} from '@fortawesome/free-solid-svg-icons'
import { SecureStorage } from './SecureStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function deleteKey(key) {
    // console.log("** DELETE **")
    // console.log(key)
    await SecureStore.deleteItemAsync(key);
}

export const ProfileScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [userDetailsOpen, setUserDetailsOpen] = useState(false);
    const [recentGamesOpen, setRecentGamesOpen] = useState(false);
    const [leaderBoardsOpen, setLeaderBoardsOpen] = useState(false);
    const [premiumOpen, setPremiumOpen] = useState(false);
    const [displayUsername, setDisplayUsername] = useState(false);
    const [displaySetUpCosmicKeyModal, setDisplaySetUpCosmicKeyModal] = useState(false);

    const authState = useRef(false);
    const userID = useRef(null);

    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID.current }
    });





    const resetActionAuth = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Auth', params: {} }]
    });

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result && authState) {
            setDisplayUsername(true)
            return;
        } else if (!result && authState.current) {
            setDisplaySetUpCosmicKeyModal(true)
            setDisplayUsername(false)
        }
    }


    useEffect(() => {
        setTimeout(() => {
            authState.current = mainState.current.authState
            userID.current = mainState.current.userID;
            getValueFor('cosmicKey')
        }, 500)

    }, [])

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
                    <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 0 }}>
                        <ScrollView style={{}}>
                            <View style={{}}>
                                {/* Buttons */}
                                {mainState.current.authState &&
                                    <>
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
                                            {/* [[[USER DETAILS]]] */}
                                            <View
                                                style={{ flexDirection: 'row', margin: 20, alignSelf: 'center' }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSolid, faSliders}
                                                    style={{ ...Styling.modalFontAwesomeIcons, color: 'white' }}
                                                    size={30}
                                                />
                                                <Text style={Styling.modalScoringVarText} allowFontScaling={false}>
                                                    User Details
                                                </Text>
                                            </View>
                                            <View style={{ alignSelf: 'center', marginBottom: 20 }}>
                                                <UserDetails nav={navigation} />
                                            </View>

                                            <View style={Styling.profileDivisionLine}></View>

                                            {/* [[[SAVED GAME DETAILS]]] */}
                                            <View
                                                style={{ flexDirection: 'row', margin: 20, alignSelf: 'center' }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSolid, faSliders}
                                                    style={{ ...Styling.modalFontAwesomeIcons, color: 'white' }}
                                                    size={30}
                                                />
                                                <Text style={Styling.modalScoringVarText} allowFontScaling={false}>
                                                    Saved Game
                                                </Text>
                                            </View>
                                            <View style={{ alignSelf: 'center', marginBottom: 20 }}>
                                                <SavedGame nav={navigation} />
                                            </View>

                                            <View style={Styling.profileDivisionLine}></View>


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
                </ImageBackground>
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
                                    style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center' }}
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