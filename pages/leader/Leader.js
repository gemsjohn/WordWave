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
            height: 100,
            width: 350,
            alignSelf: 'center',
            borderRadius: 50,
            flexDirection: 'row'
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 30,
                marginLeft: 10
              }}
              allowFontScaling={false}
            >
              {pos}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: 20 }}>
            <View style={{ flexDirection: 'column', width: 240 }}>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start', margin: windowWidth * 0.01 }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#efea5a'
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  allowFontScaling={false}
                >
                  {username}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: 240,
              }}
  
            >
              <View style={{ flexDirection: 'row', margin: windowWidth * 0.01 }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'flex-end',
                    marginLeft: 10,
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  allowFontScaling={false}
                >
                  {score}
                </Text>
                <Text
                  style={{ fontSize: windowWidth * 0.05, fontWeight: 'bold', color: '#83e377', alignSelf: 'flex-end', marginLeft: 4 }}
                  allowFontScaling={false}
                >
                  points
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styling.profileDivisionLine}></View>
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
          <View style={{alignSelf: 'center', flexDirection: 'column', backgroundColor: '(rgba(255, 255, 255, 0.1)', padding: 10, borderRadius: 50, width: 350, marginTop: 80}}>
            <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold', alignSelf: 'center'}}>Leaderboard</Text>
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
