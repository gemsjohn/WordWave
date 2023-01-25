import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faCheck, faLocationPin, faEnvelope, faLock, faGear, faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../../components/Navbar';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';

const resetActionHome = CommonActions.reset({
    index: 1,
    routes: [{ name: 'Home', params: {} }]
});

export const KeyScreen = ({ navigation }) => {
    const [key, setKey] = useState(null);
    const [keyPress, setKeyPress] = useState('');
    const [count, setCount] = useState(0);

    const handleKeyPress = (value) => {
        console.log(value);
        setKeyPress(keyPress + value);
        setCount(prev => prev + 1)
    };

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            setKey(result)
        } else {
            navigation.dispatch(resetActionHome);
        }
      }
    
      useEffect(() => {
        getValueFor('cosmicKey')
      }, [])
      
    return (
        <View style={Styling.container}>
            <View style={{marginTop: 300, flexDirection: 'row', alignSelf: 'center'}}>
                {count > 0 && 
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 1 && 
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 2 && 
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        height: 25, 
                        width: 25, 
                        margin: 10}} />
                }
                {count > 3 && 
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
