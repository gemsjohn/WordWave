import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import { HeightRatio, Styling } from '../../Styling';

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
      // setTimeout(() => {
      //   setDisplaySetCode(false)
      // }, 5000);
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
      {!displaySetCode ?
      <View style={{ marginTop: HeightRatio(20), borderRadius: 40 }}>
        <Text
          style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center', margin: HeightRatio(30) }}
          allowFontScaling={false}>
          Set a Keycode for easy login!
        </Text>
        {/* {displaySetCode &&
          <>
            <Text
              style={{ color: '#ffff00', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', margin: 10 }}
              allowFontScaling={false}>
              {combinedStringState}
            </Text>
            <Text
              style={{ color: '#ffff00', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', margin: 2 }}
              allowFontScaling={false}>
              Saved!
            </Text>
          </>
        } */}
        <>
          <View style={{ marginTop: HeightRatio(30), flexDirection: 'row', alignSelf: 'center' }}>
            {count > 0 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: HeightRatio(60),
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}
                  allowFontScaling={false}>
                  {keyArray[0]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }} />
            }
            {count > 1 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: HeightRatio(60),
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}
                  allowFontScaling={false}>
                  {keyArray[1]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }} />
            }
            {count > 2 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: HeightRatio(60),
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}
                  allowFontScaling={false}>
                  {keyArray[2]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }} />
            }
            {count > 3 ?
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: HeightRatio(60),
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}
                  allowFontScaling={false}>
                  {keyArray[3]}
                </Text>
              </View>

              :
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: HeightRatio(90),
                width: HeightRatio(90),
                margin: HeightRatio(20)
              }} />
            }



          </View>

          {warning &&
            <Text style={{ color: 'red', fontSize: HeightRatio(60), alignSelf: 'center', marginTop: 20 }}>
              Must be 4 #'s!
            </Text>
          }

          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('1')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('2')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('3')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >3</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('4')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('5')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('6')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >6</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('7')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('8')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('9')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >9</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                style={{ backgroundColor: 'red', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }}
                onPress={() => clearKeyCode()}>
                <Text style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(45) }}
                  allowFontScaling={false}
                >Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }} onPress={() => handleKeyPress('0')}>
                <Text
                  style={{ color: 'white', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(40) }}
                  allowFontScaling={false}
                >0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: 'green', height: HeightRatio(150), width: HeightRatio(150), borderRadius: HeightRatio(200), margin: HeightRatio(20) }}
                onPress={() => setKeyCode()}>
                <Text style={{ color: 'white', fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center', marginTop: HeightRatio(45) }}
                  allowFontScaling={false}
                >Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>
      :
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: HeightRatio(200), color: 'white'}}>
        &nbsp; Saved &nbsp;
        </Text>
      </View>
      }
    </>

  );
}