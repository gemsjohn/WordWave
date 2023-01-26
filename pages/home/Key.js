import React, { useEffect, useRef, useState, useContext } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';

const resetActionHome = CommonActions.reset({
    index: 1,
    routes: [{ name: 'Home', params: {} }]
});

export const KeyScreen = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [key, setKey] = useState(null);
    const [keyPress, setKeyPress] = useState('');
    const [keyArray, setKeyArray] = useState([]);
    const [count, setCount] = useState(0);


    

    const handleKeyPress = (value) => {
        setKeyPress(keyPress + value);
        setKeyArray(current => [...current, value])
        setCount(prev => prev + 1)
    };

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        console.log(result)
        if (result) {
            setKey(result.split(''));
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

      const updatAuth = async () => {
        let localBearerToken = await SecureStore.getItemAsync('bearerToken');
        let localUserID = await SecureStore.getItemAsync('userID');
        let localAuthState = await SecureStore.getItemAsync('authState');
        let updatedLocalAuthState;
        if (localAuthState == 'true') {
            updatedLocalAuthState = true;
        } else if (localAuthState == 'false' || !localAuthState) {
            updatedLocalAuthState = false;
        }


        console.log("!*!*!*!*!*!*")
        console.log(localBearerToken)
        console.log(localUserID)
        console.log(updatedLocalAuthState)



        setMainState({
            bearerToken: `${localBearerToken}`,
            userID: `${localUserID}`,
            authState: updatedLocalAuthState,
            initialKeyMoment: moment()                        
        })
      }
      

      useEffect(() => {
          console.log(count)
        if (count > 3 && areArraysEqual(key, keyArray)) {
            navigation.dispatch(resetActionHome);
            updatAuth();

        } else if (count > 3 && !areArraysEqual(key, keyArray)) {
            setKeyPress('')
            setKeyArray([])
            setCount(0)
            console.log("INCORRECT")
        }
      }, [count])
      
    return (
        <View style={{...Styling.container, marginTop: 0, backgroundColor: 'black'}}>
            <StatusBar
              animated={true}
              backgroundColor="black"
              barStyle={'default'}
              showHideTransition={'none'}
              hidden={false} />
              <Image
                source={require('../../assets/adaptive_icon_0.png')}
                style={{
                    height: 100, 
                    width: 100, 
                    borderRadius: 200,
                    marginTop: 100,
                    alignSelf: 'center'
                }} />
            <View style={{marginTop: 100, flexDirection: 'row', alignSelf: 'center'}}>
                {count > 0 ?
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1.0)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />

                    :
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 1 ?
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1.0)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />

                    :
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 2 ?
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1.0)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />

                    :
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 3 ?
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 1.0)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />

                    :
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                
            
            </View>
            <View style={{marginTop: 100}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('1')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('2')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('3')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('4')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('5')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('6')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('7')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('8')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('9')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10}} onPress={() => handleKeyPress('0')}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>0</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
