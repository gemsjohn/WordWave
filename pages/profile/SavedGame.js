import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, PixelRatio } from "react-native";
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSolid, faAddressCard, faEnvelope, faSackDollar, faStar, faX, faPenToSquare, faCopy } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { DemoAppInvoiceAndQuote } from './VerificationInvoiceAndQuote';
import * as Clipboard from 'expo-clipboard';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainStateContext } from '../../App';
import { SecureStorage } from './SecureStorage';
import { windowHeight, windowWidth, HeightRatio, WidthRatio, Styling } from '../../Styling';
import {
    UPDATE_USER,
    LOGIN_USER,
    UPDATE_USER_PASSWORD,
    DELETE_USER
} from '../../utils/mutations';

const resetActionGame = CommonActions.reset({
    index: 1,
    routes: [{ name: 'Game', params: {} }]
});

export const SavedGame = (props) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    const [displayLetters, setDisplayLetters] = useState([])

    const userID = useRef(null);


    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID.current }
    });

    useEffect(() => {
        userID.current = mainState.current.userID;
    }, [])

    useEffect(() => {
        refetch();
        
        let str = `${userByID?.user.saved.displayLetters}`;
        setTimeout(() => {
            let arr = str.split(",");
            setDisplayLetters(arr)
        }, 500)

    }, [userByID])




    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                    {displayLetters.map((l, i) => (
                        <View style={{
                            width: WidthRatio(15),
                            // position: 'absolute',
                            // top: 10,
                            left: ((i * WidthRatio(2))),
                            height: WidthRatio(15),
                            borderRadius: HeightRatio(20),
                            backgroundColor: 'rgba(255, 255, 255, 0.65)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}
                            key={i}
                        >
                            <Text 
                                style={{ ...Styling.projectile_random_word_letter, fontSize: HeightRatio(35) }} 
                                allowFontScaling={false}
                            >{l.toUpperCase()}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text 
                        style={{
                            color: 'white',
                            fontSize: HeightRatio(40),
                            margin: HeightRatio(10),
                            width: HeightRatio(400),
                        }}
                        allowFontScaling={false}
                    >
                        Stage: {userByID?.user.saved.stage}
                    </Text>
                    <Text 
                        style={{
                            color: 'white',
                            fontSize: HeightRatio(40),
                            margin: HeightRatio(10),
                            width: HeightRatio(400),
                        }}
                        allowFontScaling={false}
                    >
                        Level: {userByID?.user.saved.level}
                    </Text>
                    <Text 
                        style={{
                            color: 'white',
                            fontSize: HeightRatio(40),
                            margin: HeightRatio(10),
                            width: HeightRatio(400),
                        }}
                        allowFontScaling={false}
                    >
                        Score: {userByID?.user.saved.score}
                    </Text>
                </View>

            </View>

            <TouchableOpacity
                onPress={() => {
                    props.nav.dispatch(resetActionGame);
                    setMainState({
                        isGameInProgress: false
                    })
                }}
                style={{
                    height: HeightRatio(100),
                    width: HeightRatio(200),
                    backgroundColor: '#35faa9',
                    borderRadius: HeightRatio(50),
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <Text 
                    style={{ color: 'black', fontSize: HeightRatio(30), fontWeight: 'bold', textAlign: 'center' }}
                    allowFontScaling={false}
                >
                    PLAY
                </Text>
            </TouchableOpacity>
        </View>
    )
}