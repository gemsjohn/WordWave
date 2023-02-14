import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef, useCallback, useLayoutEffect } from 'react';
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
    RefreshControl,
    Animated
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
    faCheck,
    faX
} from '@fortawesome/free-solid-svg-icons'
import { Tokens } from './Tokens';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AlienEffect_middle = () => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const alienPosition = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const animation = useRef(null);
    let timeoutAlien_ID;

    const AlienAnimation = () => {
        console.log("ANIMATE")
        let localYPos_0 = HeightRatio(250);
        let localYPos_1 = HeightRatio(100);

        alienPosition.setValue({ x: HeightRatio(10), y: localYPos_0 })


        animation.current = Animated.sequence([
            Animated.timing(alienPosition.y, {
                toValue: localYPos_1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition.y, {
                toValue: localYPos_0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]);

        animation.current.start(() => {
            animation.current.stop((value) => {
                alienPosition.setValue(value)

            })

            timeoutAlien_ID = setTimeout(() => {
                AlienAnimation();
            }, 100)
        });
    }


    

    const CharacterArray = [
        require('../../assets/Char_4.png'),
        require('../../assets/Char_5.png'),
        require('../../assets/Char_6.png'),
        require('../../assets/Char_7.png'),
        require('../../assets/Char_8.png')
    ]
    const [characterIndex, setCharacterIndex] = useState(0)
    const [selected, setSelected] = useState(false);

    const handleChangeCharacter = (input) => {
        if (input == 'forward') {
            setCharacterIndex((characterIndex + 1) % CharacterArray.length);
        } else if (input == 'back') {
            setCharacterIndex((CharacterArray.length + characterIndex - 1) % CharacterArray.length);
        }
    }

    useEffect(() => {
        AlienAnimation();

        if (mainState.current.selectedCharacter != null) {
            setSelected(true)
        } else {
            setSelected(false)
        }

        return () => {
            clearTimeout(timeoutAlien_ID);
            animation.current.stop();
        };
    }, [])



    return (
        <>
        {!selected &&
            <TouchableOpacity
                onPress={() => !selected ? handleChangeCharacter('back') : null}
                style={{
                    position: 'absolute',
                    zIndex: 30,
                    top: HeightRatio(600),
                    backgroundColor: 'rgba(25, 255, 255, 0.2)',
                    height: HeightRatio(100),
                    width: HeightRatio(100),
                    borderRadius: HeightRatio(100)
                }}
            >
                <Image
                    style={{ height: HeightRatio(35), width: HeightRatio(35), alignSelf: 'center', marginTop: HeightRatio(35) }}
                    source={require('../../assets/left_arrow.png')} />
            </TouchableOpacity>
            }

            {/* ALIEN */}
            <Animated.View
                style={
                    [
                        {
                            transform: [
                                { translateX: alienPosition.x },
                                { translateY: alienPosition.y }
                            ],
                        },
                    ]}
            >
                <Image
                    source={mainState.current.selectedCharacter != null ? mainState.current.selectedCharacter : CharacterArray[characterIndex]}
                    style={{
                        width: windowWidth,
                        height: HeightRatio(900),
                        position: 'absolute',
                        top: 10,
                    }}
                />
            </Animated.View>
            {selected ?
                <TouchableOpacity
                    onPress={() => {
                        setSelected(false)
                        setMainState({
                            selectedCharacter: null
                        })
                        setCharacterIndex(mainState.current.characterIndex)
                    }}
                    style={{
                        position: 'absolute',
                        zIndex: 30,
                        top: HeightRatio(950),
                        // left: HeightRatio(700),
                        alignSelf: 'center',
                        backgroundColor: 'red',
                        height: HeightRatio(100),
                        width: HeightRatio(100),
                        borderRadius: HeightRatio(100)
                    }}
                >
                    <FontAwesomeIcon
                        icon={faSolid, faX}
                        style={{ ...Styling.modalFontAwesomeIcons, color: 'white', marginTop: HeightRatio(35), marginLeft: HeightRatio(20) }}
                        size={20}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={() => {
                        setSelected(true)
                        setMainState({
                            selectedCharacter: CharacterArray[characterIndex],
                            characterIndex: characterIndex
                        })
                    }}
                    style={{
                        position: 'absolute',
                        zIndex: 30,
                        top: HeightRatio(950),
                        // left: HeightRatio(700),
                        alignSelf: 'center',
                        backgroundColor: '#35faa9',
                        height: HeightRatio(100),
                        width: HeightRatio(100),
                        borderRadius: HeightRatio(100)
                    }}
                >
                    <FontAwesomeIcon
                        icon={faSolid, faCheck}
                        style={{ ...Styling.modalFontAwesomeIcons, color: 'black', marginTop: HeightRatio(35), marginLeft: HeightRatio(20) }}
                        size={20}
                    />
                </TouchableOpacity>
            }
            {!selected &&
            <TouchableOpacity
                onPress={() => !selected ? handleChangeCharacter('forward') : null}
                style={{
                    position: 'absolute',
                    zIndex: 30,
                    top: HeightRatio(600),
                    left: HeightRatio(700),
                    backgroundColor: 'rgba(25, 255, 255, 0.2)',
                    height: HeightRatio(100),
                    width: HeightRatio(100),
                    borderRadius: HeightRatio(100)
                }}
            >
                <Image
                    style={{ height: HeightRatio(35), width: HeightRatio(35), alignSelf: 'center', marginTop: HeightRatio(35) }}
                    source={require('../../assets/right_arrow.png')} />
            </TouchableOpacity>
            }
        </>
    );
}