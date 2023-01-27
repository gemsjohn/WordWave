import React, { useEffect, useState, useContext, useRef } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faCheck, faLocationPin, faEnvelope, faLock, faGear, faX } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { CommonActions } from '@react-navigation/native';
import { Navbar } from '../../components/Navbar';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import { MainStateContext } from '../../App';
import * as SecureStore from 'expo-secure-store';

const resetActionAuth = CommonActions.reset({
  index: 1,
  routes: [{ name: 'Auth', params: {} }]
});

export const HomeScreen = ({ navigation }) => {
  const { mainState, setMainState } = useContext(MainStateContext);

  const [count, setCount] = useState(0);
  const authState = useRef(false);
  const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
  const [displayUsername, setDisplayUsername] = useState(false);

  const userID = useRef(null);


  const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userID.current }
  });


  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result && authState) {
      setDisplayUsername(true)
    } else if (!result && !authState.current) {
      setDisplaySignUpModal(true)
      setDisplayUsername(false)
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

  return (
    <>
      <View style={Styling.container}>
        <StatusBar
          barStyle="default"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View>
          <ImageBackground
            source={require('../../assets/home_background.png')}
            resizeMode="cover"
            style={{
              justifyContent: 'center',
              height: '100%'
            }}>

            {/* BODY */}
            {/* <View style={{ alignSelf: 'center', flexDirection: 'column' }}> */}

              <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 32 }}>
                <ScrollView style={{}}>
                  {displayUsername &&
                    <>
                    <View style={{ marginTop: 50, flexDirection:'column' }}>
                      <Text style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                      }}>
                        {userByID?.user.username}
                      </Text>
                      <Text style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        alignSelf: 'center'

                      }}>
                        Tokens Remaining: {userByID?.user.tokens}
                      </Text>
                    </View>
                    <View style={Styling.profileDivisionLine}></View>
                    </>
                  }

                  <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
                    {count == 0 &&
                      <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        padding: 10,
                        borderRadius: 20,
                        width: 400,
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: 40,
                          fontWeight: 'bold',
                          width: 400,
                          margin: 4
                        }}>
                          Objective
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                          width: 350,
                          margin: 10
                        }}>
                          Collect letters to spell the word at the top of the screen,
                          avoid obstacles and enemies. Complete all 5 levels to advance
                          to the next stage. Game over after colliding with 3 objects.
                        </Text>
                      </View>
                    }
                    {count == 1 &&
                      <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        padding: 10,
                        borderRadius: 20,
                        width: 400,
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: 40,
                          fontWeight: 'bold',
                          width: 400,
                          margin: 4
                        }}>
                          Characters
                        </Text>
                        <View style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
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
                              style={{ height: 150, width: 150 }} />
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
                              style={{ height: 150, width: 150 }} />
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
                              style={{ height: 150, width: 150 }} />
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
                              style={{ height: 150, width: 150 }} />
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
                              style={{ height: 150, width: 150 }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Opacity Bot</Text>
                          </View>
                        </View>
                      </View>
                    }
                    {count == 2 &&
                      <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        padding: 10,
                        borderRadius: 20,
                        width: 400,
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: 40,
                          fontWeight: 'bold',
                          width: 400,
                          margin: 4
                        }}>
                          Stages
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                          width: 350,
                          margin: 10
                        }}>
                          Details
                        </Text>
                      </View>
                    }
                    {count == 3 &&
                      <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        padding: 10,
                        borderRadius: 20,
                        width: 400,
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <Text style={{
                          color: '#fcd01f',
                          fontSize: 40,
                          fontWeight: 'bold',
                          width: 400,
                          margin: 4
                        }}>
                          Extras
                        </Text>
                        <Text style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                          width: 350,
                          margin: 10
                        }}>
                          Details
                        </Text>
                      </View>
                    }

                    <View style={{ height: 200 }}></View>

                  </View>
                </ScrollView>
              </SafeAreaView>

              <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 70 }}>
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

            {/* </View> */}
          </ImageBackground>
        </View>
        <Navbar nav={navigation} position={'absolute'} from={'home'} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={displaySignUpModal}
        onRequestClose={() => {
          setDisplaySignUpModal(!displaySignUpModal);
        }}
      >
        <View style={Styling.modal_centered_view}>
          <View style={Styling.modal_view}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                Enhance your gaming experience and put your skills on display by
                signing up or logging in and climbing to the top of the leaderboard!
                As an added bonus, you'll also receive 5 free tokens,
                providing you with the chance to keep playing even if you hit a setback.
              </Text>

              <TouchableOpacity
                onPress={() => navigation.dispatch(resetActionAuth)}
                style={{ ...Styling.modalWordButton, marginTop: 10 }}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#aacc00', '#80b918']}
                  style={Styling.modalWordButton}
                >
                  <Text
                    style={{ ...Styling.modalWordButtonText, fontSize: 20, }}
                    allowFontScaling={false}
                  >
                    Sign Up or Login
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDisplaySignUpModal(!displaySignUpModal)}>
                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



    </>
  );
}

