import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { UserDetails } from './UserDetails';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { RecentGames } from '../game/RecentGames';
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
            return;
        } else if (!result && authState.current) {
            setDisplaySetUpCosmicKeyModal(true)
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
                    <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 32 }}>
                        <ScrollView style={{}}>
                            <View style={{}}>
                                {/* Buttons */}
                                {mainState.current.authState &&
                                    <>
                                        <View style={{}}>
                                            <View style={{ marginTop: windowHeight / 24 }}></View>
                                            {/* [[[USER DETAILS]]] */}
                                            <View
                                                style={{ flexDirection: 'row', margin: 20 }}
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
                                            <View style={{ alignSelf: 'center' }}>
                                                <UserDetails nav={navigation} />
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
                                                        padding: 20,
                                                        borderRadius: 40,
                                                        alignSelf: 'center',
                                                        // margin: 10,
                                                        width: 350
                                                    }}>
                                                        <Text
                                                            style={{ color: 'white', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}
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
                                style={{ marginTop: 20 }}>
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