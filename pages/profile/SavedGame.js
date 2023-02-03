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

export const SavedGame = () => {
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
        let str = `${userByID?.user.saved.displayLetters}`;
        setTimeout(() => {
            let arr = str.split(",");
            setDisplayLetters(arr)
        }, 500)

        console.log(str)

    }, [userByID])


    return (
        <View style={{ alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)', height: HeightRatio(300), width: HeightRatio(450) }}>


            {displayLetters.map((l, i) => (
                <View style={{
                    width: WidthRatio(14),
                    position: 'absolute',
                    top: 10,
                    left: ((((displayLetters.length * WidthRatio(16)) / windowWidth) * 100) + (i * WidthRatio(16))),
                    height: WidthRatio(14),
                    borderRadius: HeightRatio(20),
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    key={i}
                >
                    <Text style={{...Styling.projectile_random_word_letter, fontSize: HeightRatio(35)}} allowFontScaling={false}>{l.toUpperCase()}</Text>
                </View>
            ))}
            <View style={{position: 'absolute', top: WidthRatio(18), left: WidthRatio(10), marginTop: WidthRatio(4)}}>
                <Text style={{ color: 'white', fontSize: 20, backgroundColor: 'rgba(255, 255, 255, 0.25)', width: ((((displayLetters.length * WidthRatio(16)) / windowWidth) * 100) + (displayLetters.length * WidthRatio(16))) }}>
                    Stage: {userByID?.user.saved.stage}
                </Text>
                <Text style={{ color: 'white', fontSize: 20, backgroundColor: 'rgba(0, 0, 0, 0.25)', width: ((((displayLetters.length * WidthRatio(16)) / windowWidth) * 100) + (displayLetters.length * WidthRatio(16))) }}>
                    Level: {userByID?.user.saved.level}
                </Text>
                <Text style={{ color: 'white', fontSize: 20, backgroundColor: 'rgba(255, 255, 255, 0.25)', width: ((((displayLetters.length * WidthRatio(16)) / windowWidth) * 100) + (displayLetters.length * WidthRatio(16))) }}>
                    Score: {userByID?.user.saved.score}
                </Text>
                <TouchableOpacity
                    onPress={() => console.log("Play Saved Game")}
                    style={{backgroundColor: 'blue', width: WidthRatio(40), alignSelf: 'center', borderRadius: HeightRatio(20), padding: HeightRatio(20), marginTop: HeightRatio(10)}}>
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                            Play 
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}