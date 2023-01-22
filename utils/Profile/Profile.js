import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StatusBar, Platform, RefreshControl } from 'react-native';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';

export const Profile = (props) => {
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
              <View style={{alignSelf: 'center'}}>
                <Text style={{
                  color: 'yellow', 
                  fontSize: HeightRatio(50), 
                  alignSelf: 'center',
                  fontWight: 'bold',
                  padding: HeightRatio(20) 
                }}>
                  Profile - Under Construction
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
          <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('profile', props.lang, 'title')}`} language={props.lang} />
    
          <View style={{ height: HeightRatio(40) }} />
        </LinearGradient>
      );
}