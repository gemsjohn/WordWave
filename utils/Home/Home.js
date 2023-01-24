import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { useEffect, useRef, useState } from 'react/cjs/react.development';

export const Home = (props) => {
  // const count = useRef(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 3) {
      setCount(0);
    }
  }, [count])
  return (
    <LinearGradient
      colors={['#1b262c', '#070707']}
      style={{ opacity: 1, width: '100%', alignSelf: 'center', height: '100%' }}
      start={[0.0, 0.0]} end={[0.75, 0.5]}
    >
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
                        Objective
                      </Text>
                      <Text style={{
                        color: 'white',
                        fontSize: HeightRatio(50),
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
                            style={{height: HeightRatio(100), width: HeightRatio(100)}}/>
                          <Text style={{color: 'white', alignSelf: 'center'}}>You</Text>
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
                            style={{height: HeightRatio(100), width: HeightRatio(100)}}/>
                          <Text style={{color: 'white', alignSelf: 'center'}}>Asteroid</Text>
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
                            style={{height: HeightRatio(100), width: HeightRatio(100)}}/>
                          <Text style={{color: 'white', alignSelf: 'center'}}>Red UFO</Text>
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
                            style={{height: HeightRatio(100), width: HeightRatio(100)}}/>
                          <Text style={{color: 'white', alignSelf: 'center'}}>Twin</Text>
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
                            style={{height: HeightRatio(100), width: HeightRatio(100)}}/>
                          <Text style={{color: 'white', alignSelf: 'center'}}>Opacity Bot</Text>
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
            <TouchableOpacity onPress={() => {console.log("UP"); setCount(prev => prev - 1);}}>
              <Image
                source={require('../../assets/home_up_arrow.png')}
                style={{ width: WidthRatio(50), height: WidthRatio(50) }} />
            </TouchableOpacity>

            <View style={{ width: WidthRatio(50), height: WidthRatio(50) }} />

            <TouchableOpacity onPress={() => {console.log("DOWN"); setCount(prev => prev + 1);}}>
              <Image
                source={require('../../assets/home_down_arrow.png')}
                style={{ width: WidthRatio(50), height: WidthRatio(50) }} />
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
      <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('home', props.lang, 'title')}`} language={props.lang} />

      <View style={{ height: HeightRatio(40) }} />
    </LinearGradient>
  );
}