import React, { useEffect, useState, useRef } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID, GAMES } from '../../utils/queries';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../../components/Navbar';
import { HeightRatio, Styling, WidthRatio } from '../../Styling';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LeaderScreen = ({ navigation }) => {

  const { data: leaderboard, refetch } = useQuery(GAMES);
  // console.log(leaderboard)

  const DATA = leaderboard?.games;
  // console.log(DATA)


  const Item = ({ username, score, pos }) => (
    <>
      <View key={pos}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            height: HeightRatio(120),
            width: WidthRatio(160),
            flexDirection: 'row', 
            justifyContent: 'space-evenly',
            alignSelf: 'center'
          }}
        >
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: HeightRatio(40),
                  fontWeight: 'bold',
                }}
                allowFontScaling={false}
              >
                {pos}
              </Text>
              <Text
                style={{
                  fontSize: HeightRatio(40),
                  fontWeight: 'bold',
                  color: '#53f4a4',
                  width: WidthRatio(70)
                }}
                numberOfLines={1}
                ellipsizeMode='tail'
                allowFontScaling={false}
              >
                {username}
              </Text>
              <Text
                style={{
                  fontSize: HeightRatio(40),
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'right',
                  width: WidthRatio(70)
                }}
                numberOfLines={1}
                ellipsizeMode='tail'
                allowFontScaling={false}
              >
                {score}
              </Text>
            </View>

          </View>
        </View>
        {/* <View style={Styling.profileDivisionLine}></View> */}
      </View>
      <View style={{ marginBottom: 10 }}></View>
    </>
  );

  const renderItem = ({ item }) => (
    <Item username={item.username} score={item.score} pos={item.position} />
  );

  useEffect(() => {
    refetch();
  }, [])

  return (
    <>
      <View style={{ backgroundColor: 'black', height: '100%' }}>
        {/* <ImageBackground
          source={require('../../assets/background_leaderboard.png')}
          resizeMode="cover"
          style={{
            justifyContent: 'center',
            height: '100%'
          }}> */}

          <View
            style={{
              alignSelf: 'center',
              // marginTop: WidthRatio(30)

            }}
          >
            <View style={{ 
              alignSelf: 'center', 
              flexDirection: 'column', 
              padding: HeightRatio(20), 
              borderRadius: HeightRatio(100), 
              width: WidthRatio(160), 
              marginTop: HeightRatio(160) 
            }}>
              <Text 
                style={{ 
                  color: 'yellow', 
                  fontSize: HeightRatio(80), 
                  fontWeight: 'bold', 
                  alignSelf: 'center' 
                }}
                allowFontScaling={false}
              >HIGH SCORES</Text>
            </View>
            <SafeAreaView style={Styling.flatlistContainer}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
              <View style={{ marginBottom: 70 }}></View>
              <Navbar nav={navigation} position={'relative'} from={'leader'} />

            </SafeAreaView>
          </View>
        {/* </ImageBackground> */}

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
