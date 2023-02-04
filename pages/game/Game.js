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
import { MainStateContext } from '../../App';
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
import { Stage_4_Projectile } from './Stages/Stage_4_Projectile';
import { Stage_5_Projectile } from './Stages/Stage_5_Projectile';
import { Stage_6_Projectile } from './Stages/Stage_6_Projectile';


import {
    View,
    Platform,
    Image,
    ActivityIndicator,
    UIManager,
    Text,
    TouchableOpacity
} from 'react-native';

export const GameScreen = ({ navigation }) => {
    const sharedStateRef = useRef({});
    const { mainState, setMainState } = useContext(MainStateContext);
    const userID = useRef(null);
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [retainUpgradeToSpecial_0, setRetainUpgradeToSpecial_0] = useState(false)
    const [stage1, setStage1] = useState(true);
    const [stage2, setStage2] = useState(false);
    const [stage3, setStage3] = useState(false);
    const [stage4, setStage4] = useState(false);
    const [stage5, setStage5] = useState(false);
    const [stage6, setStage6] = useState(false);
    const [stage7, setStage7] = useState(false);
    const [stage8, setStage8] = useState(false);
    const [stage9, setStage9] = useState(false);
    const [stage10, setStage10] = useState(false);
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    const [displayOptionsToPlaySavedGame, setDisplayOptionsToPlaySavedGame] = useState(false);

    const stage = useRef(null);

    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: mainState.current.userID }
    });


    useLayoutEffect(() => {
        console.log("Setup: #1 ")
        // userID.current = mainState.current.userID;
        refetch();

        setMainState({
            stage1: null,
            stage2: null,
            stage3: null,
            stage4: null,
            stage5: null,
            stage6: null,
            stage7: null,
            stage8: null,
            stage9: null,
            stage10: null,
            currentScore: 0,
            currentLevel: 0,
            currentCrashes: 0,
            currentLetterPocket: [],
            currentWordPlusSeven: [],
            currentDisplayLetters: [],
            currentLetter_countValue: 0,
            fromSavedGame: false
        })


    }, [])

    useEffect(() => {
        console.log("Setup: #2 ")
        refetch();

        setInterval(() => {
            setRetainUpgradeToSpecial_0(mainState.current.upgradeToSpecial_0);

            if (mainState.current.stage1 != null) {
                setStage1(mainState.current.stage1);
            }
            if (mainState.current.stage2 != null) {
                setStage2(mainState.current.stage2);
            }
            if (mainState.current.stage3 != null) {
                setStage3(mainState.current.stage3);
            }
            if (mainState.current.stage4 != null) {
                setStage4(mainState.current.stage4);
            }
            if (mainState.current.stage5 != null) {
                setStage5(mainState.current.stage5);
            }
            if (mainState.current.stage6 != null) {
                setStage6(mainState.current.stage6);
            }
            if (mainState.current.stage7 != null) {
                setStage7(mainState.current.stage7);
            }
            if (mainState.current.stage8 != null) {
                setStage8(mainState.current.stage8);
            }
            if (mainState.current.stage9 != null) {
                setStage9(mainState.current.stage9);
            }
            if (mainState.current.stage10 != null) {
                setStage10(mainState.current.stage10);
            }

            setIsGameInProgress(mainState.current.isGameInProgress);
        }, 500)


    }, [])

    useEffect(() => {
        console.log("Setup: #3 ")


        if (userByID?.user.saved.date != null) {
            setDisplayOptionsToPlaySavedGame(true)
            stage.current = parseInt(userByID?.user.saved.stage);
            console.log(userByID?.user.saved)

        } else {
            setDisplayOptionsToPlaySavedGame(false)
        }
    }, [userByID])


    useEffect(() => {
        // This is the effect that should be cleaned up when the component is unmounted
        const timeoutId = setTimeout(() => {
            console.log("MOUNTED")
            console.log("Setup: #4 ")
            setLoadingComplete(true)

        }, 1000);

        // Return a function that cleans up the effect
        return () => {
            console.log("UNMOUNTED")
            clearTimeout(timeoutId);
            setLoadingComplete(false)
        };
    }, []);

    const handleContinueSavedGame = (input) => {
        console.log("Setup: #5 ")

        console.log(input)

        let str_0 = `${userByID?.user.saved.letterPocket}`;
        let arr_0;
        if (str_0 == "") {
            arr_0 = [];
        } else {
            arr_0 = str_0.split(",");
        }

        arr_0
        let filteredArr_0 = arr_0.filter(function (value) {
            return value !== "";
        });

        console.log(filteredArr_0)


        let str_2 = `${userByID?.user.saved.displayLetters}`;
        let arr_2 = str_2.split(",");


        setMainState({
            fromSavedGame: true,
            currentScore: parseInt(userByID?.user.saved.score),
            currentLevel: parseInt(userByID?.user.saved.level),
            currentCrashes: parseInt(userByID?.user.saved.crashes),
            currentLetterPocket: filteredArr_0,
            currentDisplayLetters: arr_2,
            currentLetter_countValue: parseInt(userByID?.user.saved.currentLetterCountValue),
        })

        switch (input) {
            case 1:
                setStage1(true);
                setStage2(false);
                setStage3(false);
                setStage4(false);
                setStage5(false);
                setStage6(false);
                break;
            case 2:
                setStage1(false);
                setStage2(true);
                setStage3(false);
                setStage4(false);
                setStage5(false);
                setStage6(false);
                break;
            case 3:
                setStage1(false);
                setStage2(false);
                setStage3(true);
                setStage4(false);
                setStage5(false);
                setStage6(false);
                break;
            case 4:
                setStage1(false);
                setStage2(false);
                setStage3(false);
                setStage4(true);
                setStage5(false);
                setStage6(false);
                break;
            case 5:
                setStage1(false);
                setStage2(false);
                setStage3(false);
                setStage4(false);
                setStage5(true);
                setStage6(false);
                break;
            case 6:
                setStage1(false);
                setStage2(false);
                setStage3(false);
                setStage4(false);
                setStage5(false);
                setStage6(true);
                break;
            default:
                break;
        }


        setDisplayOptionsToPlaySavedGame(false)
    };

    useEffect(() => {
        console.log(stage1)
        console.log(stage2)
        console.log(stage3)
        console.log(stage4)
        console.log(stage5)
        console.log(stage6)

    }, [stage1, stage2, stage3, stage4, stage5, stage6])



    return (
        <>
            <View style={{}}>
                <Image
                    source={require('../../assets/background_4.png')}
                    style={{ position: 'absolute', zIndex: -10, width: '100%' }}
                />
                {loadingComplete ?
                    <>
                        {isGameInProgress &&
                            <View style={{ position: 'absolute', zIndex: 20 }} >
                                <CharacterAndJoystick />
                            </View>
                        }

                        {/* {retainUpgradeToSpecial_0 &&
                            <Special />
                        } */}
                        {displayOptionsToPlaySavedGame ?
                            <>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 25,
                                    top: HeightRatio(125),
                                    left: 0,
                                    height: HeightRatio(550),
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    // flex: 1,
                                    // width: '100%',
                                    width: windowWidth,
                                    alignSelf: 'center'
                                }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <View>

                                            <TouchableOpacity
                                                onPress={() => setDisplayOptionsToPlaySavedGame(false)}
                                                style={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    width: WidthRatio(150),
                                                    height: HeightRatio(500),
                                                    borderRadius: HeightRatio(10),
                                                    borderBottomLeftRadius: HeightRatio(200),
                                                    borderTopLeftRadius: HeightRatio(200),
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    margin: HeightRatio(25)
                                                }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: HeightRatio(100),
                                                    fontWeight: 'bold',
                                                    alignSelf: 'center',
                                                    textAlign: 'center'
                                                }}
                                                    allowFontScaling={false}
                                                >
                                                    New Game
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                onPress={() => handleContinueSavedGame(stage.current)}
                                                style={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    height: HeightRatio(500),
                                                    width: WidthRatio(150),
                                                    borderRadius: HeightRatio(10),
                                                    borderBottomRightRadius: HeightRatio(200),
                                                    borderTopRightRadius: HeightRatio(200),
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    margin: HeightRatio(25)
                                                }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: HeightRatio(100),
                                                    fontWeight: 'bold',
                                                    alignSelf: 'center',
                                                    textAlign: 'center'
                                                }}
                                                    allowFontScaling={false}
                                                >
                                                    Continue
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                            :
                            <View style={{ position: 'absolute', zIndex: 10 }} >
                                {stage1 && <Stage_1_Projectile nav={navigation} />}
                                {stage2 && <Stage_2_Projectile nav={navigation} />}
                                {stage3 && <Stage_3_Projectile nav={navigation} />}
                                {stage4 && <Stage_4_Projectile nav={navigation} />}
                                {stage5 && <Stage_5_Projectile nav={navigation} />}
                                {stage6 && <Stage_6_Projectile nav={navigation} />}
                            </View>
                        }

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
            {/* {isGameInProgress && */}
                <Navbar nav={navigation} position={'absolute'} from={'game'} />
            {/* } */}
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                barStyle={'dark-content'}
                showHideTransition={'none'}
                hidden={true} />
        </>
    )

}

