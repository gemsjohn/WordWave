import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
// import { SettingsModal from './Settings';
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDetails } from './UserDetails';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { RecentGames } from '../game/RecentGames';
import { Styling } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { MainStateContext } from '../../App';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Pressable,
    TextInput,
    ActivityIndicator,
    Modal,
    SafeAreaView,
    ScrollView,
    Button,
    Image
} from 'react-native';
import {
    faSolid,
    faX,
    faClock,
    faCheck,
    faGift,
    faFlagCheckered,
    faCaretDown,
    faUser,
    faGear,
    faSliders,
    faStar,
    faTrophy
} from '@fortawesome/free-solid-svg-icons'
import { SecureStorage } from './SecureStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ProfileScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    
    const [userDetailsOpen, setUserDetailsOpen] = useState(false);
    const [recentGamesOpen, setRecentGamesOpen] = useState(false);
    const [leaderBoardsOpen, setLeaderBoardsOpen] = useState(false);
    const [premiumOpen, setPremiumOpen] = useState(false);
    

    const resetActionAuth = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Auth', params: {} }]
    });

    return (
        <>
            <View style={Styling.container}>

                <SafeAreaView style={Styling.profileContainer}>
                    <ScrollView style={Styling.profileScrollView}>
                        <View style={{}}>
                            {/* Buttons */}
                            {mainState.current.authState &&
                                <>
                                    <View style={{}}>
                                        <View style={{ marginTop: windowHeight / 24 }}></View>
                                        {/* [[[USER DETAILS]]] */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                setUserDetailsOpen(!userDetailsOpen);
                                                setRecentGamesOpen(false)
                                                setLeaderBoardsOpen(false)
                                                setPremiumOpen(false)
                                            }}
                                        >
                                            <View
                                                style={{ flexDirection: 'row', margin: 10 }}
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
                                        </TouchableOpacity>
                                        {userDetailsOpen ?
                                            <View style={{ alignSelf: 'center' }}>
                                                <UserDetails nav={navigation} />
                                            </View>
                                            :
                                            null
                                        }
                                        <View style={Styling.profileDivisionLine}></View>
                                        {/* [[[RECENT GAMES]]] */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                setUserDetailsOpen(false);
                                                setRecentGamesOpen(!recentGamesOpen)
                                                setLeaderBoardsOpen(false)
                                                setPremiumOpen(false)
                                            }}
                                        >
                                            <View
                                                style={{ flexDirection: 'row', margin: 10 }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSolid, faFlagCheckered}
                                                    style={{ ...Styling.modalFontAwesomeIcons, color: 'white' }}
                                                    size={30}
                                                />
                                                <Text style={Styling.modalScoringVarText} allowFontScaling={false}>
                                                    Recent Games
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {recentGamesOpen ?
                                            <View style={{ marginLeft: 10 }}>
                                                <RecentGames />
                                            </View>
                                            :
                                            null
                                        }
                                        <View style={Styling.profileDivisionLine}></View>


                                        <TouchableOpacity
                                            onPress={() => {
                                                setMainState({
                                                    bearerToken: null,
                                                    userID: null,
                                                    authState: false
                                                })
                                                navigation.dispatch(resetActionAuth)
                                            }}
                                            style={{ ...Styling.modalWordButton, marginTop: 60 }}
                                        >
                                            <LinearGradient
                                                // Button Linear Gradient
                                                colors={['#aacc00', '#80b918']}
                                                style={Styling.modalWordButton}
                                            >
                                                <Text
                                                    style={{ ...Styling.modalWordButtonText, fontSize: 20, }}
                                                    allowFontScaling={false}
                                                >
                                                    Logout
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <SecureStorage />
                                    </View>
                                    
                                    <View style={{ marginBottom: 200 }}></View>
                                </>
                            }
                        </View >
                    </ScrollView>
                </SafeAreaView>
                <Navbar nav={navigation} auth={mainState.current.authState} position={'absolute'} from={'profile'} />

            </View>

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