import React, { useEffect, useRef, useState, useContext } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { LinearGradient } from 'expo-linear-gradient';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';

const resetActionHome = CommonActions.reset({
    index: 1,
    routes: [{ name: 'Home', params: {} }]
});

async function deleteKey(key) {
    await SecureStore.deleteItemAsync(key);
}

export const KeyScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [key, setKey] = useState(null);
    const [keyPress, setKeyPress] = useState('');
    const [keyArray, setKeyArray] = useState([]);
    const [count, setCount] = useState(0);
    const [pageLoadComplete, setPageLoadComplete] = useState(false);

    const handleKeyPress = (value) => {
        setKeyPress(keyPress + value);
        setKeyArray(current => [...current, value])
        setCount(prev => prev + 1)
    };

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            setKey(result.split(''));
            setPageLoadComplete(true)

        } else {
            navigation.dispatch(resetActionHome);
        }
    }

    useEffect(() => {
        getValueFor('cosmicKey')

    }, [])

    function areArraysEqual(arr1, arr2) {
        // Check if the arrays have the same length
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const updateAuth = async () => {
        let localBearerToken = await SecureStore.getItemAsync('bearerToken');
        let localUserID = await SecureStore.getItemAsync('userID');
        let localAuthState = await SecureStore.getItemAsync('authState');
        let updatedLocalAuthState;
        if (localAuthState == 'true') {
            updatedLocalAuthState = true;
        } else if (localAuthState == 'false' || !localAuthState) {
            updatedLocalAuthState = false;
        }

        setMainState({
            bearerToken: `${localBearerToken}`,
            userID: `${localUserID}`,
            authState: updatedLocalAuthState,
            initialKeyMoment: moment()
        })
    }


    useEffect(() => {
        if (count > 3 && areArraysEqual(key, keyArray)) {
            updateAuth();
            setTimeout(() => {
                navigation.dispatch(resetActionHome);

            }, 500)


        } else if (count > 3 && !areArraysEqual(key, keyArray)) {
            setKeyPress('')
            setKeyArray([])
            setCount(0)
        }
    }, [count])

    return (
        <>
            <LinearGradient
                colors={['#f34734', '#feb832']}
                style={{ flex: 1 }}
            >
                {pageLoadComplete ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <StatusBar
                            barStyle="default"
                            hidden={false}
                            backgroundColor="transparent"
                            translucent={true}
                            networkActivityIndicatorVisible={true}
                        />
                        <Image
                            source={require('../../assets/adaptive_icon_0.png')}
                            style={{
                                height: HeightRatio(200),
                                width: HeightRatio(200),
                                borderRadius: 200,
                                marginTop: HeightRatio(50),
                                alignSelf: 'center'
                            }} />
                        <View style={{ marginTop: HeightRatio(50), alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {count > 0 ?
                                    <View style={{
                                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderTopLeftRadius: HeightRatio(70)
                                    }} />

                                    :
                                    <View style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderTopLeftRadius: HeightRatio(70)
                                    }} />
                                }
                                {count > 1 ?
                                    <View style={{
                                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderTopRightRadius: HeightRatio(70)
                                    }} />

                                    :
                                    <View style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderTopRightRadius: HeightRatio(70)
                                    }} />
                                }
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                {count > 3 ?
                                    <View style={{
                                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderBottomLeftRadius: HeightRatio(70)
                                    }} />

                                    :
                                    <View style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderBottomLeftRadius: HeightRatio(70)
                                    }} />
                                }
                                {count > 2 ?
                                    <View style={{
                                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderBottomRightRadius: HeightRatio(70)
                                    }} />

                                    :
                                    <View style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                        height: HeightRatio(70),
                                        width: HeightRatio(70),
                                        margin: HeightRatio(20),
                                        borderBottomRightRadius: HeightRatio(70)
                                    }} />
                                }
                            </View>


                        </View>
                        <View style={{ marginTop: HeightRatio(50) }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('1')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('2')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('3')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('4')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('5')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('6')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('7')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('8')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('9')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(120), width: HeightRatio(120), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('0')}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(20) }}
                                        allowFontScaling={false}
                                    >0</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteKey('cosmicKey');
                                    navigation.dispatch(resetActionHome);
                                }}
                                style={Styling.modalWordButton}>
                                <View style={{}}>
                                    <Text
                                        style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                                        allowFontScaling={false}
                                    >
                                        Forgot Key?
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ backgroundColor: 'black' }} />
                }
            </LinearGradient>
        </>
    )
}