import React, { useEffect, useState } from 'react';
import { View, Text, Button, Dimensions, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faComment, faPen, faW, faF, faFlagCheckered, faGear, faTrophy, faHouse, faTruck } from '@fortawesome/free-solid-svg-icons';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { HeightRatio, WidthRatio, windowWidth, windowHeight, Styling } from '../Styling';
// import { useQuery } from '@apollo/client';
// import { GET_USER_BY_ID, GET_ME } from '../utils/queries';
import { resetActionHome, resetActionGame, resetActionProfile } from '../utils/ResetActions';
import { getTerm } from '../Localization';


export const Navbar = (props) => {
    const [authState, setAuthState] = useState(false);
    const [userID, setUserID] = useState('');
    const [bearerToken, storeBearerToken] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);
    const [homeBg, setHomeBg] = useState('rgba(255, 255, 255, 0.1)');
    const [gameBg, setGameBg] = useState('rgba(255, 255, 255, 0.1)');
    const [profileBg, setProfileBg] = useState('rgba(255, 255, 255, 0.1)');
    // let fontLoaded_0 = useFonts({ Inter_900Black, });
    // if (!fontLoaded_0) { return null; }

    const checkToken = async (value) => {
        try {
          const response = await fetch('', {
            method: 'GET',
            headers: {
              'Authorization': `${value}`
            }
          });
          if (response.ok) {
            // Token is still valid
            setIsTokenValid(true)
            return true;
          } else {
            // Token is no longer valid
            setIsTokenValid(false)
            return false;
          }
        } catch (error) {
          console.error(error);
        }
    }

    const CurrentUser = async () => {
        let value = await AsyncStorage.getItem('@userID', value);
        setUserID(value);
    }

    const getBearerToken = async () => {
          let value = await AsyncStorage.getItem('@storage_Key', value)
          checkToken(value)
    }


    const CheckAuthState = async () => {
        let value = await AsyncStorage.getItem('@authState')
        // console.log(value)
        if (value === 'true') {
            setAuthState(true)
        } else if (value === 'false') {
            setAuthState(false)
        }
    }
    // CheckAuthState()

    const buttons = [
        { key: 0, icon: faHouse, label: `${getTerm('home', props.language, 'title')}`, backgroundColor: homeBg, iconColor: 'white', onPress: () => { props.nav.dispatch(resetActionHome); } }, 
        { key: 1, icon: faFlagCheckered, label: `${getTerm('game', props.language, 'title')}`, backgroundColor: gameBg, iconColor: '#4996ea', onPress: () => { props.nav.dispatch(resetActionGame); } },
        { key: 2,icon: faUser, label: `${getTerm('profile', props.language, 'title')}`, backgroundColor: profileBg, iconColor: '#4996ea', onPress: () => { props.nav.dispatch(resetActionProfile); } }
    ];

    useEffect(() => {
        if (props.from == `${getTerm('home', props.language, 'title')}`) {setHomeBg('rgba(255, 255, 255, 0.1)')} else {setHomeBg('transparent')}
        if (props.from == `${getTerm('game', props.language, 'title')}`) {setGameBg('rgba(255, 255, 255, 0.1)')} else {setGameBg('transparent')}
        if (props.from == `${getTerm('profile', props.language, 'title')}`) {setProfileBg('rgba(255, 255, 255, 0.1)')} else {setProfileBg('transparent')}
        
        // CurrentUser()
        // getBearerToken()
    }, [])


    return (
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
                width: windowWidth
            }}
            >
            {buttons.map(button => (
                <TouchableOpacity onPress={button.onPress} key={button.key}>
                <View
                    style={{
                    backgroundColor: button.backgroundColor,
                    padding: WidthRatio(8),
                    borderRadius: 10,
                    width: windowWidth / 4,
                    flexDirection: "column"
                    }}
                    accessible
                    accessibilityLabel={button.label}
                >
                    <FontAwesomeIcon
                    icon={faSolid, button.icon}
                    style={{ color: button.iconColor, alignSelf: "center" }}
                    size={25}
                    />
                    <Text
                    style={{
                        color: "white",
                        marginTop: 6,
                        alignSelf: "center",
                        fontSize: HeightRatio(14),
                        // fontFamily: "Inter_900Black"
                    }}
                    allowFontScaling={false}
                    >
                    {button.label}
                    </Text>
                </View>
                </TouchableOpacity>
            ))}
            </View>
    )
}