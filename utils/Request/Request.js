import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StatusBar, Platform, RefreshControl } from 'react-native';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Styling, WidthRatio, HeightRatio, windowHeight } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';

export const Request = (props) => {
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
              
              <Text style={{color: 'white', fontSize: HeightRatio(15)}}>{getTerm('page_1', 'en')}</Text>
            </ScrollView>
          </SafeAreaView>
          <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('page_1', 'en')}`} />
    
          <View style={{ height: HeightRatio(40) }} />
        </LinearGradient>
      );
}