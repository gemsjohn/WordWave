import React, {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    createContext,
    useContext
} from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ADD_GAME } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { CommonActions, useTheme } from '@react-navigation/native';
import { Navbar } from '../../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Styling,
    WidthRatio,
    HeightRatio,
    windowHeight,
    windowWidth
} from '../../Styling';
import { CharacterAndJoystick } from './CharacterAndJoystick';
  import { Stage_1_Projectile } from './Stages/Stage_1_Projectile';
  import { Stage_2_Projectile } from './Stages/Stage_2_Projectile';
  import { Stage_3_Projectile } from './Stages/Stage_3_Projectile';
import {
    View,
    Platform,
    Image,
    ActivityIndicator,
    UIManager,
} from 'react-native';

export const SharedStateContext = createContext();

export const GameScreen = ({ navigation }) => {
    const sharedStateRef = useRef({});
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [retainUpgradeToSpecial_0, setRetainUpgradeToSpecial_0] = useState(false)
    const [stage1, setStage1] = useState(true);
    const [stage2, setStage2] = useState(false);
    const [stage3, setStage3] = useState(false);

    const [userID, setUserID] = useState('');
    const [authState, setAuthState] = useState(false);

    // // REACT Navigation
    // const resetActionGame = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: 'Game', params: {} }]
    // });

    // ADD_GAME
    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID }
    });
    // console.log(userByID?.user)
    const [addGame] = useMutation(ADD_GAME);

    const CheckAuthState = async () => {
        let value = await AsyncStorage.getItem('@authState')
        if (value === 'true') {
            setAuthState(true);
        } else if (value === 'false') {
            setAuthState(false);
        }
    }

    const CurrentUser = async () => {
        let value = await AsyncStorage.getItem('@userID', value);
        setUserID(value);
    }

    setTimeout(() => {
        setLoadingComplete(true)
    }, 1000)

    useEffect(() => {
        CheckAuthState();
        CurrentUser();
        // This is the effect that should be cleaned up when the component is unmounted
        const timeoutId = setTimeout(() => {
            console.log("MOUNTED")
        }, 1000);

        // Return a function that cleans up the effect
        return () => {
            console.log("UNMOUNTED")
            clearTimeout(timeoutId);
            setLoadingComplete(false)
        };
    }, []);

    const setSharedState = (newState) => {
        sharedStateRef.current = { ...sharedStateRef.current, ...newState };
    };

    useEffect(() => {
        const intervalCheckUpgradeToSpecial_0 = setInterval(() => {
            setRetainUpgradeToSpecial_0(sharedStateRef.current.upgradeToSpecial_0);

            if (sharedStateRef.current.stage1 != null) {
                setStage1(sharedStateRef.current.stage1);
            }
            if (sharedStateRef.current.stage2 != null) {
                setStage2(sharedStateRef.current.stage2);
            }
            if (sharedStateRef.current.stage3 != null) {
                setStage3(sharedStateRef.current.stage3);
            }
        }, 250)


    }, [])

    return (
        <>
            <View style={{}}>
                <Image
                    source={require('../../assets/background_4.png')}
                    style={{ position: 'absolute', zIndex: -10 }}
                />
                {loadingComplete ?
                    <>

                        <SharedStateContext.Provider
                            value={{ sharedState: sharedStateRef, setSharedState }}
                        >
                            <CharacterAndJoystick />

                            {/* {retainUpgradeToSpecial_0 &&
                <Special />
              } */}

                            {stage1 && <Stage_1_Projectile nav={navigation} />}
                            {stage2 && <Stage_2_Projectile nav={navigation} />}
                            {stage3 && <Stage_3_Projectile nav={navigation} />}
                        </SharedStateContext.Provider>
                    </>
                    :
                    <View style={{ width: windowWidth, height: windowHeight }}>
                        <ActivityIndicator
                            size="large"
                            color="#00ff00"
                            style={{
                                position: 'absolute',
                                top: windowHeight / 2 - 20,
                                left: windowWidth / 2 - 20
                            }}
                        />
                    </View>
                }



            </View>
            <Navbar nav={navigation} auth={authState} position={'absolute'} from={'game'} />
            <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle={'dark-content'}
            showHideTransition={'none'}
            hidden={true} />
        </>
    )

}

