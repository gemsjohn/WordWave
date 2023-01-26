import React, { useEffect, useState, useContext, useRef } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faCheck, faLocationPin, faEnvelope, faLock, faGear, faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { Navbar } from '../../components/Navbar';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';

export const HomeScreen = ({ navigation }) => {
  const { mainState, setMainState } = useContext(MainStateContext);

  const [count, setCount] = useState(0);
  // const [authState, setAuthState] = useState(false);
  const authState = useRef(false);
  const [hasCosmicKey, setHasCosmicKey] = useState(false);
  const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
  const [displaySetUpCosmicKeyModal, setDisplaySetUpCosmicKeyModal] = useState(false);
  const [displayUsername, setDisplayUsername] = useState(false);

  const userID = useRef(null);


  const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
      variables: { id: userID.current }
  });


  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log("- - - -")
    console.log(authState.current)
    if (result && authState) {
      // setHasCosmicKey(true)
      console.log("DISPLAY USER NAME")
      setDisplayUsername(true)
    } else if (!result && authState.current) {
      // setHasCosmicKey(false)
      console.log("SET UP COSMIC KEY")
    } else if (!result && !authState.current) {
      console.log("SIGN UP MODAL")

    }
  }


  useEffect(() => {
    setTimeout(() => {
      authState.current = mainState.current.authState
      userID.current = mainState.current.userID;
      getValueFor('cosmicKey')
    }, 500)
    
  }, [])


  useEffect(() => {
    if (count > 3) {
      setCount(0);
    } else if (count < 0) {
      setCount(0)
    }
  }, [count])

//   setMainState({
//     bearerToken: `${localBearerToken}`,
//     userID: `${localUserID}`,
//     authState: updatedLocalAuthState,
//     initialKeyMoment: moment()                        
// })



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

            {/* BODY */}
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>

              <SafeAreaView style={Styling.container}>
                <ScrollView style={Styling.scrollView}>
                  {displayUsername &&
                    <View style={{margin: 10}}>
                      <Text style={{color: 'white', fontSize: 20}}>
                        Welcome back {userByID?.user.username}!
                      </Text>
                    </View>
                  }
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
        <Navbar nav={navigation} position={'absolute'} from={'home'} />
      </View>
      {/* <StatusBar
        barStyle="default"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
        networkActivityIndicatorVisible={true}
      /> */}

      {/* <StatusBar
              animated={true}
              backgroundColor="transparent"
              barStyle={'dark-content'}
              showHideTransition={'none'}
              hidden={false} /> */}
    </>
  );
}

