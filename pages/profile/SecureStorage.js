import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import { Styling } from '../../Styling';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function deleteKey(key) {
  console.log("** DELETE **")
  console.log(key)
  await SecureStore.deleteItemAsync(key);
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
  const [keyPress, setKeyPress] = useState('');
  const [keyArray, setKeyArray] = useState([]);
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [displayKeycode, setDisplayKeycode] = useState(false)
  const [displaySetCode, setDisplaySetCode] = useState(false)
  const [combinedStringState, setCombinedStringState] = useState('')

  const handleKeyPress = (value) => {
    setKeyPress(keyPress + value);
    setKeyArray(current => [...current, value])
    setCount(prev => prev + 1)
  };

  const clearKeyCode = () => {
    setKeyPress('');
    setKeyArray([])
    setCount(0)
  }

  const setKeyCode = () => {
    if (count > 3) {
      let combinedString = keyArray.join('');
      save('cosmicKey', `${combinedString}`);
      setCombinedStringState(combinedString)
      setKeyPress('');
      setKeyArray([])
      setCount(0)
      setDisplayKeycode(false)
      setDisplaySetCode(true)
      setTimeout(() => {
        setDisplaySetCode(false)
      }, 5000);
    } else {
      setWarning(true)
      setTimeout(() => {
        setWarning(false)
      setCombinedStringState('')
      }, 3000);
    }

  }

  useEffect(() => {
    userID.current = mainState.current.userID;
  }, [])

  useEffect(() => {
    console.log(count)
    if (count > 3) {
      console.log(keyArray)

    }
  }, [count])

  return (
    <>
      
      <View style={{ ...Styling.container, marginTop: 20, backgroundColor: 'black', borderRadius: 40 }}>
        <TouchableOpacity
          onPress={() => setDisplayKeycode(current => !current)}>
          <Text style={{ color: 'white', fontSize: 25, alignSelf: 'center', margin: 20 }}>
            Set a Keycode for easy login!
          </Text>
        </TouchableOpacity>
        {displaySetCode &&
        <Text style={{ color: '#ffff00', fontSize: 25, alignSelf: 'center', margin: 20 }}>
          {combinedStringState}
        </Text>
        }
        <>
        {displayKeycode &&
        <>
          <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
            {count > 0 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: 45,
                width: 45,
                margin: 10
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}>
                  {keyArray[0]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: 45,
                width: 45,
                margin: 10
              }} />
            }
            {count > 1 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: 45,
                width: 45,
                margin: 10
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}>
                  {keyArray[1]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: 45,
                width: 45,
                margin: 10
              }} />
            }
            {count > 2 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: 45,
                width: 45,
                margin: 10
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}>
                  {keyArray[2]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: 45,
                width: 45,
                margin: 10
              }} />
            }
            {count > 3 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: 45,
                width: 45,
                margin: 10
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}>
                  {keyArray[3]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: 45,
                width: 45,
                margin: 10
              }} />
            }



          </View>
          
          {warning &&
            <Text style={{ color: 'red', fontSize: 25, alignSelf: 'center', marginTop: 20 }}>
              Must be 4 #'s!
            </Text>
          }

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('1')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('2')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('3')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('4')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('5')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('6')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('7')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('8')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('9')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                style={{ backgroundColor: '#f61b04', height: 70, width: 70, borderRadius: 50, margin: 10 }}
                onPress={() => clearKeyCode()}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 70, width: 70, borderRadius: 50, margin: 10 }} onPress={() => handleKeyPress('0')}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: '#3dda53', height: 70, width: 70, borderRadius: 50, margin: 10 }}
                onPress={() => setKeyCode()}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => deleteKey('cosmicKey')}
              style={{backgroundColor: 'red'}}>
                <Text style={{color: 'black'}}>
                  DELETE KEY
                </Text>
              </TouchableOpacity>
          </View>
          </>
        }
        </>
      </View>
    </>

  );
}