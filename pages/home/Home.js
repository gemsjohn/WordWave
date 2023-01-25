import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faCheck, faLocationPin, faEnvelope, faLock, faGear, faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../../components/Navbar';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';

export const HomeScreen = ({ navigation }) => {
  const [userID, setUserID] = useState('');
  const [authState, setAuthState] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = [
    { value: 'red', gradient: ['#4f000b', '#ff595e'], image: require('../../assets/dalle_1.png'), id: 0 },
    { value: 'orange', gradient: ['#b21e35', '#faa307'], image: require('../../assets/dalle_4.png'), id: 1 },
    { value: 'green', gradient: ['#132a13', '#83e377'], image: require('../../assets/dalle_2.png'), id: 2 },
    { value: 'blue', gradient: ['#00171f', '#0466c8'], image: require('../../assets/dalle_3.png'), id: 3 },
    { value: 'purple', gradient: ['#240046', '#c77dff'], image: require('../../assets/dalle_5.png'), id: 4 },
    { value: '#0b132b', gradient: ['#0b132b', '#3a506b'], image: require('../../assets/dalle_7.png'), id: 5 },
  ];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 3) {
      setCount(0);
    }
  }, [count])


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

  const selectColor = async (color) => {
    // console.log(color)
    // setSelectedColor(color);
    try {
      const jsonValue = JSON.stringify(color)
      await AsyncStorage.setItem('selectedColor', jsonValue);
      setSelectedColor(color)
    } catch (e) {
      console.error(e)
    }
  };

  const getSelectedColor = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selectedColor')
      if (jsonValue != null) {
        let color = JSON.parse(jsonValue)
        setSelectedColor(color)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const DisplayGradient = (props) => {
    return (
      <>
        <Image source={props.image} style={{ ...Styling.background, opacity: 0.4 }} />
        <LinearGradient
          colors={props.gradient}
          style={{ ...Styling.background, opacity: 0.5 }}
        />
      </>
    )
  }




  // const selectedLevel = getSelectedLevel();
  // console.log(selectedLevel); // Outputs 'Easy'
  let buttonArray = [];
  let demoText = ["", "E", "", "", "", "", "Q", "", "", "", "P", "U", "T", "T", "Y", "", "I", "", "", "", "", "P", "", "", "", "", "", "", ""]
  const DemoGrid = () => {
    for (let i = 0; i < 25; i++) {
      buttonArray[i] =
        <View key={i}>
          {i == 11 ?
            <LinearGradient
              // Button Linear Gradient
              colors={['#ffba08', '#faa307']}
              style={Styling.gridBlock}
            >
              <View
                accessible={true}
                accessibilityLabel="Example grid."
              >
                <Text
                  style={Styling.letters}
                  allowFontScaling={false}
                  accessible={true}
                  accessibilityLabel="Revealed letter."
                >
                  {demoText[i]}
                </Text>
              </View>
            </LinearGradient>
            :
            <LinearGradient
              // Button Linear Gradient
              colors={['#f8f9fa', '#ced4da']}
              style={Styling.gridBlock}
            >
              <View
                accessible={true}
                accessibilityLabel="Example grid."
              >
                <Text
                  style={Styling.letters}
                  allowFontScaling={false}
                  accessible={true}
                  accessibilityLabel="Example block."
                >
                  {demoText[i]}
                </Text>
              </View>
            </LinearGradient>
          }
        </View>
    }

    return buttonArray;
  }

  useEffect(() => {
    CheckAuthState();
    CurrentUser();
  }, [])

  useEffect(() => {
    getSelectedColor();
  }, [selectedColor])




  return (
    <>
      <View style={Styling.container}>

        <View>
          <ImageBackground
            source={require('../../assets/home_background.png')}
            resizeMode="cover"
            style={{
              justifyContent: 'center',
              height: windowHeight
            }}>
            <StatusBar
              animated={true}
              backgroundColor="#80ffdb"
              barStyle={'dark-content'}
              showHideTransition={'none'}
              hidden={false} />

            {/* BODY */}
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>

              <SafeAreaView style={Styling.container}>
                <ScrollView style={Styling.scrollView}>

                  <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                    {count == 0 &&
                      <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        padding: HeightRatio(10),
                        borderRadius: HeightRatio(20),
                        width: windowWidth * 0.8,
                        // margin: WidthRatio(10),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(2)
                        }}>
                          Objective
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: HeightRatio(20),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(5)
                        }}>
                          Collect letters to spell the word at the top of the screen,
                          avoid obstacles and enemies. Complete all 5 levels to advance
                          to the next stage. Game over after colliding with 3 objects.
                        </Text>
                      </View>
                    }
                    {count == 1 &&
                      <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        padding: HeightRatio(50),
                        borderRadius: HeightRatio(50),
                        width: windowWidth * 0.8,
                        margin: WidthRatio(10),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(2)
                        }}>
                          Characters
                        </Text>
                        {/* <Text style={{
                        color: 'white',
                        fontSize: HeightRatio(50),
                        fontWeight: 'bold',
                        width: windowWidth * 0.7,
                        margin: WidthRatio(10)
                      }}>
                        Details
                      </Text> */}
                        <View style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          // alignSelf: 'center'
                        }}>
                          {/* CHARACTER: You */}
                          <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: HeightRatio(10),
                            padding: HeightRatio(10),
                            margin: HeightRatio(5)
                          }}>
                            <Image
                              source={require('../../assets/Char_1.png')}
                              style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>You</Text>
                          </View>

                          {/* CHARACTER: Asteroid */}
                          <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: HeightRatio(10),
                            padding: HeightRatio(10),
                            margin: HeightRatio(5)
                          }}>
                            <Image
                              source={require('../../assets/projectile_asteroid_2.png')}
                              style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Asteroid</Text>
                          </View>

                          {/* CHARACTER: Red UFO */}
                          <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: HeightRatio(10),
                            padding: HeightRatio(10),
                            margin: HeightRatio(5)
                          }}>
                            <Image
                              source={require('../../assets/projectile_red_ufo.png')}
                              style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Red UFO</Text>
                          </View>

                          {/* CHARACTER: Twin */}
                          <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: HeightRatio(10),
                            padding: HeightRatio(10),
                            margin: HeightRatio(5)
                          }}>
                            <Image
                              source={require('../../assets/projectile_enemy_4.png')}
                              style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Twin</Text>
                          </View>

                          {/* CHARACTER: Opacity Bot */}
                          <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: HeightRatio(10),
                            padding: HeightRatio(10),
                            margin: HeightRatio(5)
                          }}>
                            <Image
                              source={require('../../assets/projectile_enemy_3.png')}
                              style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Opacity Bot</Text>
                          </View>
                        </View>
                      </View>
                    }
                    {count == 2 &&
                      <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        padding: HeightRatio(50),
                        borderRadius: HeightRatio(50),
                        width: windowWidth * 0.8,
                        margin: WidthRatio(10),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(2)
                        }}>
                          Stages
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(10)
                        }}>
                          Details
                        </Text>
                      </View>
                    }
                    {count == 3 &&
                      <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        padding: HeightRatio(50),
                        borderRadius: HeightRatio(50),
                        width: windowWidth * 0.8,
                        margin: WidthRatio(10),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(2)
                        }}>
                          Extras
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: HeightRatio(50),
                          fontWeight: 'bold',
                          width: windowWidth * 0.7,
                          margin: WidthRatio(10)
                        }}>
                          Details
                        </Text>
                      </View>
                    }

                    <View style={{ height: HeightRatio(200) }}></View>

                  </View>
                </ScrollView>
              </SafeAreaView>

              <View style={{ alignSelf: 'center', flexDirection: 'column', margin: WidthRatio(5) }}>
                <TouchableOpacity onPress={() => { console.log("UP"); setCount(prev => prev - 1); }}>
                  <Image
                    source={require('../../assets/home_up_arrow.png')}
                    style={{ width: WidthRatio(50), height: WidthRatio(50) }} />
                </TouchableOpacity>

                <View style={{ width: WidthRatio(50), height: WidthRatio(50) }} />

                <TouchableOpacity onPress={() => { console.log("DOWN"); setCount(prev => prev + 1); }}>
                  <Image
                    source={require('../../assets/home_down_arrow.png')}
                    style={{ width: WidthRatio(50), height: WidthRatio(50) }} />
                </TouchableOpacity>
              </View>

            </View>
          </ImageBackground>
        </View>
        <Navbar nav={navigation} auth={authState} position={'absolute'} from={'home'} />
      </View>
      <StatusBar
        barStyle="default"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
    </>
  );
}

