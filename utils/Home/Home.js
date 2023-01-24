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

export const Home = (props) => {
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
                <View style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  padding: HeightRatio(50),
                  borderRadius: HeightRatio(50),
                  width: windowWidth * 0.8,
                  margin: WidthRatio(10),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}>

                  <Text style={{
                    color: 'white',
                    fontSize: HeightRatio(50),
                    fontWeight: 'bold',
                    width: windowWidth * 0.7,
                    margin: WidthRatio(10)
                  }}>
                    Collect letters to spell the word at the top of the screen, avoid obstacles and enemies. Complete all 5 levels to advance to the next stage. Game over after colliding with 3 objects.
                  </Text>
                </View>
                <View style={{ height: HeightRatio(200) }}></View>

              </View>
            </ScrollView>
          </SafeAreaView>

          <View style={{ alignSelf: 'center', flexDirection: 'column', margin: WidthRatio(5) }}>
            <TouchableOpacity onPress={() => console.log("UP")}>
              <Image
                source={require('../../assets/home_up_arrow.png')}
                style={{ width: WidthRatio(50), height: WidthRatio(50) }} />
            </TouchableOpacity>

            <View style={{ width: WidthRatio(50), height: WidthRatio(50) }} />

            <TouchableOpacity onPress={() => console.log("DOWN")}>
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