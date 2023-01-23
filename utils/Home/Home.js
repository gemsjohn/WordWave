import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StatusBar, Platform, RefreshControl, Image } from 'react-native';
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
      <StatusBar
        animated={true}
        backgroundColor="#80ffdb"
        barStyle={'dark-content'}
        showHideTransition={'none'}
        hidden={false} />

      {/* BODY */}
      <SafeAreaView style={Styling.container}>
        <ScrollView style={Styling.scrollView}>
          <View style={{ alignSelf: 'center', flexDirection: 'column' }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{
                color: 'yellow', 
                fontSize: HeightRatio(50), 
                alignSelf: 'center',
                fontWight: 'bold',
                padding: HeightRatio(20) 
              }}>
                Home - Under Construction
              </Text>
            </View>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              padding: HeightRatio(50),
              borderRadius: HeightRatio(20),
              width: windowWidth*0.8,
              margin: HeightRatio(10)
            }}>
              <View style={{
                backgroundColor: 'blue', 
                width: WidthRatio(70), 
                borderRadius: HeightRatio(40),
                
              }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: HeightRatio(30), 
                  fontSize: HeightRatio(40),
                  alignSelf: 'center',
                  padding: HeightRatio(20) 
                }}>
                  How to Play
                </Text>
              </View>
              <Text style={{ 
                color: 'white', 
                fontSize: HeightRatio(35), 
                margin: HeightRatio(20) 
              }}>
                Collect letters to spell the word at the top of the screen, avoid obstacles and enemies. Complete all 5 levels to advance to the next stage. Game over after colliding with 3 objects.
              </Text>
            </View>
            

            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              padding: HeightRatio(50),
              borderRadius: HeightRatio(20),
              width: windowWidth*0.8,
              margin: HeightRatio(10)
            }}>
              <View style={{
                backgroundColor: 'blue', 
                width: WidthRatio(70), 
                borderRadius: HeightRatio(40)}}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: HeightRatio(30), 
                  fontSize: HeightRatio(40),
                  alignSelf: 'center',
                  padding: HeightRatio(20) 
                }}>
                  Character
                </Text>
              </View>
              <Image
                source={require('../../assets/Example_1.png')}
                style={{ height: HeightRatio(300), width: HeightRatio(300) }} />
            </View>
            

            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              padding: HeightRatio(50),
              borderRadius: HeightRatio(20),
              width: windowWidth*0.8,
              margin: HeightRatio(10)
            }}>
              <View style={{
                backgroundColor: 'blue', 
                width: WidthRatio(70), 
                borderRadius: HeightRatio(40)}}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: HeightRatio(30), 
                  fontSize: HeightRatio(40),
                  alignSelf: 'center',
                  padding: HeightRatio(20) 
                }}>
                  Things to Avoid
                </Text>
              </View>
              <Image
                source={require('../../assets/Example_0.png')}
                style={{ height: HeightRatio(300), width: HeightRatio(300) }} />
              {/* Enemy Cards */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >

                <Image
                  source={require('../../assets/enemy_card_asteroid.png')}
                  style={{ height: HeightRatio(175), width: HeightRatio(175) }} />
                <Image
                  source={require('../../assets/enemy_card_red_ufo.png')}
                  style={{ height: HeightRatio(175), width: HeightRatio(175) }} />
                <Image
                  source={require('../../assets/enemy_card_opacity_bot.png')}
                  style={{ height: HeightRatio(175), width: HeightRatio(175) }} />
                <Image
                  source={require('../../assets/enemy_card_twins.png')}
                  style={{ height: HeightRatio(175), width: HeightRatio(175) }} />
              </View>
            </View>
            <View style={{height: HeightRatio(200)}}></View>



            {/* STAGE 1 - 3 */}
            {/* <Image
              source={require('../../assets/Example_2.png')}
              style={{ height: HeightRatio(300), width: HeightRatio(300) }} />
            <Image
              source={require('../../assets/Example_3.png')}
              style={{ height: HeightRatio(300), width: HeightRatio(300) }} />
            <Image
              source={require('../../assets/Example_4.png')}
              style={{ height: HeightRatio(300), width: HeightRatio(300) }} /> */}

          </View>
        </ScrollView>
      </SafeAreaView>

      <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('home', props.lang, 'title')}`} language={props.lang} />

      <View style={{ height: HeightRatio(40) }} />
    </LinearGradient>
  );
}