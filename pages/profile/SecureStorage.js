import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import { Styling } from '../../Styling';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export const SecureStorage = () => {
  const { mainState, setMainState } = useContext(MainStateContext);

  const [key, onChangeKey] = useState('Your key here');
  const [value, onChangeValue] = useState('Your value here');
  const [prompKeyInput, setPromptKeyInput] = useState()
  const userID = useRef(null);

  // const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
  //   variables: { id: userID.current }
  // });

useEffect(() => {
    userID.current = mainState.current.userID;
}, [])

  return (
    <>
      <View style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 400,
        height: 350,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        alignSelf: 'center',
        borderRadius: 40,
        padding: 20
      }}>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center'
        }}>Save an item, and grab it later!</Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            alignSelf: 'center',
            borderRadius: 40,
            padding: 20,
            marginTop: 10
          }}
          onPress={() => {
            save('cosmicKey', `${prompKeyInput}`);
            // onChangeKey('Your key here');
            // onChangeValue('Your value here');
          }}>
          <Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center'
          }}>Save this key/value pair</Text>
        </TouchableOpacity>

        <TextInput
          type="password"
          name="key"
          placeholder="Enter your key"
          placeholderTextColor="white"
          value={prompKeyInput}
          onChangeText={setPromptKeyInput}
          style={Styling.textInputStyle}
          disableFullscreenUI={true}
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            alignSelf: 'center',
            borderRadius: 40,
            padding: 20,
            marginTop: 10
          }}
          onPress={() => {
            getValueFor('cosmicKey')
          }}>
          <Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center'
          }}>Get Key</Text>
        </TouchableOpacity>
      </View>
    </>

  );
}