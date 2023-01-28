import React, { useEffect, useState, useRef } from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID, GAMES } from '../../utils/queries';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../../components/Navbar';
import { Styling } from '../../Styling';

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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: 60,
            width: windowWidth - 80,
            alignSelf: 'center',
            borderRadius: 50,
            flexDirection: 'row'
          }}
        >
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'bold',
                  // marginTop: 30,
                  // marginLeft: 10
                }}
                allowFontScaling={false}
              >
                {pos}
              </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#53f4a4',
                    width: 180
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  allowFontScaling={false}
                >
                  {username}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    width: 180
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
      <View style={{marginBottom: 10}}></View>
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
      <View style={{backgroundColor: 'black', height: '100%'}}>
        
        
        <View
          style={{
            alignSelf: 'center',
            // marginTop: WidthRatio(30)

          }}
        >
          <View style={{alignSelf: 'center', flexDirection: 'column', padding: 10, borderRadius: 50, width: 350, marginTop: 80}}>
            <Text style={{color: 'yellow', fontSize: 40, fontWeight: 'bold', alignSelf: 'center'}}>HIGH SCORES</Text>
            {/* <Text style={{color: 'white', fontSize: HeightRatio(20), alignSelf: 'center'}}>Last 30 Days</Text> */}
          </View>
          <SafeAreaView style={Styling.flatlistContainer}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <View style={{marginBottom: 70}}></View>
          <Navbar nav={navigation} position={'relative'} from={'leader'} />

          </SafeAreaView>
        </View>
        
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
