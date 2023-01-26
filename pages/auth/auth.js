import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { LOGIN_USER, ADD_USER, REQUEST_RESET, RESET_PASSWORD } from '../../utils/mutations';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Dimensions, Button, Linking, ImageBackground, FlatList, PixelRatio, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSolid, faUser, faPlus, faUpLong, faMagnifyingGlass, faCheck, faLocationPin, faEnvelope, faLock, faGear, faX } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../../components/Navbar';
import { Loading } from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { MainStateContext } from '../../App';
import { Styling, windowWidth, windowHeight, HeightRatio, WidthRatio } from '../../Styling';
import * as SecureStore from 'expo-secure-store';

const resetActionProfile = CommonActions.reset({
  index: 1,
  routes: [{ name: 'Profile', params: {} }]
});

async function save(key, value) {
  console.log(key)
  console.log(value)
  await SecureStore.setItemAsync(key, value);
}

export const Auth = ({ navigation }) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    // const [authState, setAuthState] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [displayLoginFailureAlert, setDisplayLoginFailureAlert] = useState(false)
  
  
    // Sign Up: Email
    const [promptEmailInput, setPromptEmailInput] = useState("");
  
    // Sign Up: Username
    const [promptUsernameInput, setPromptUsernameInput] = useState("");
  
    // Sign Up: Password
    const [promptPasswordInput, setPromptPasswordInput] = useState("");
  
    // Username and Password
    const [promptInput_0, setPromptInput_0] = useState("");
    const [promptInput_1, setPromptInput_1] = useState("");

  
    // Forgot Password
    const [displayForgotPasswordContent, setDisplayForgotPasswordContent] = useState(false);
    const [promptResetEmail, setPromptResetEmail] = useState('');
    const [resetRequestStatus, setResetRequestStatus] = useState('');
    const [displayForgotPasswordForm, setDisplayForgotPasswordForm] = useState(false);
    const [promptResetUsername, setPromptResetUsername] = useState('');
    const [promptResetPassword_0, setPromptResetPassword_0] = useState('');
    const [promptResetPassword_1, setPromptResetPassword_1] = useState('');
    const [promptResetToken, setPromptResetToken] = useState('');
    const [displayResetSuccessModal, setDisplayResetSuccessModal] = useState(false);
  
  
    // Apollo 
    const [login, { error }] = useMutation(LOGIN_USER);
    const [addUser] = useMutation(ADD_USER);
    const [requestReset] = useMutation(REQUEST_RESET);
    const [resetPassword] = useMutation(RESET_PASSWORD);

    // Server
    const [isTokenValid, setIsTokenValid] = useState(null);

    const [cosmicKeyBoolean, setCosmicKeyBoolean] = useState(false);

    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        setCosmicKeyBoolean(true)
        
      } else {
        setCosmicKeyBoolean(false)

      }
    }

    useEffect(() => {
      getValueFor('cosmicKey')
    }, [])

    

    const checkToken = async (value) => {
      try {
        const response = await fetch('https://cosmicbackend.herokuapp.com/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `${value}`
          }
        });
        if (response.ok) {
          // Token is still valid
          console.log("AUTH - Token is still valid")

          setIsTokenValid(true)
          navigation.dispatch(resetActionProfile)
          return true;
        } else {
          // Token is no longer valid
          console.log("AUTH - Token is no longer valid")
          setIsTokenValid(false)
          return false;
        }
      } catch (error) {
        console.error(error);
      }
  }
  
    const handleLogin = async () => {
  
      try {
        const { data } = await login({
          variables: {
            username: promptInput_0,
            password: promptInput_1
          },
        });
  
        if (data.login.token) {
          console.log("Login Success")
          const decoded = jwtDecode(data.login.token)
          setDisplayLoading(false);

          setMainState({
            bearerToken: `Bearer ${data.login.token}`,
            userID: `${decoded?.data._id}`,
            authState: true
          })

          if (cosmicKeyBoolean) {
            console.log("ADDED: bearer, userID, auth")
            save('bearerToken', `Bearer ${data.login.token}`);
            save('userID', `${decoded?.data._id}`);
            save('authState', 'true');
          }

          checkToken(`Bearer ${data.login.token}`)
        }
      } catch (e) {
        console.log("Login Error")
        setDisplayLoading(false);
        console.error(e);
        setDisplayLoginFailureAlert(true)

        setMainState({
          bearerToken: null,
          userID: null,
          authState: false
        })

        save('bearerToken', null);
        save('userID', null);
        save('authState', 'false');
      }
    }
  
  
    const handleFormSubmit = async () => {
      try {
        const { data } = await addUser({
          variables: {
            username: promptUsernameInput,
            email: promptEmailInput,
            password: promptPasswordInput,
            role: 'User',
            profilepicture: '',
          }
        });

        if (data.addUser.token) {
          const decoded = jwtDecode(data.addUser.token)

          setDisplayLoading(false);
          setPromptEmailInput("")
          setPromptUsernameInput("")
          setPromptPasswordInput("")

          setMainState({
            bearerToken: `Bearer ${data.addUser.token}`,
            userID: `${decoded?.data._id}`,
            authState: true
          })

          checkToken(`Bearer ${data.addUser.token}`)
        }
      } catch (e) {
        setDisplayLoading(false);
        console.error(e);
        Alert.alert(
          "Sign Up Failed",
          `${e}`,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );

        setMainState({
          bearerToken: null,
          userID: null,
          authState: false
        })

      }
    };
  
    const handleRequestReset = async () => {
      console.log(promptResetEmail)
      try {
        await requestReset({
          variables: {
            email: promptResetEmail
          },
        });
        setResetRequestStatus("Check your email for a Reset Token!")
      } catch (e) {
        console.error(e);
        setResetRequestStatus("No user found with that email.")
      }
  
    };
  
    const handleResetPassword = async () => {
      if (promptResetEmail != '' && promptResetPassword_0 != '' && promptResetPassword_1 != '' && promptResetToken != '' && promptResetPassword_0 == promptResetPassword_1) {
        console.log("handleResetPassword")
        try {
          await resetPassword({
            variables: {
              email: promptResetEmail,
              password: promptResetPassword_0,
              confirmPassword: promptResetPassword_1,
              resetToken: promptResetToken
            }
          })
          console.log("Ok all set, try to log in.")
          setDisplayResetSuccessModal(true);
          setPromptResetEmail('');
          setResetRequestStatus('');
          setDisplayForgotPasswordForm(false);
          setPromptResetPassword_0('');
          setPromptResetPassword_1('');
        } catch (e) {
          console.error(e)
          console.log("Token expired or incorrect");
        }
      }
    }

  
    return (
      <>
      <View style={Styling.container}>
  
        <SafeAreaView style={{ height: '90%', marginBottom: 32, marginTop: 32 }}>
  
          <ScrollView style={{}} keyboardShouldPersistTaps={'always'} keyboardDismissMode="on-drag">
            
            {!isTokenValid &&
              <>
                {newUser ?
                  <>
                    <Text
                      style={{ color: 'white', alignSelf: 'center', fontSize: 50, marginTop: 20, fontWeight: 'bold' }}
                      allowFontScaling={false}
                    >
                      Sign Up
                    </Text>
                    <>
                      {/* [[[CHECK BOXES]]] */}
                      <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 20 }}>
                        {promptEmailInput ?
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faCheck}
                              style={{ color: '#70e000', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Email</Text>
                          </View>
                          :
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faEnvelope}
                              style={{ color: 'white', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Email</Text>
                          </View>
                        }
                        {promptUsernameInput ?
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faCheck}
                              style={{ color: '#70e000', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Username</Text>
                          </View>
                          :
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faUser}
                              style={{ color: 'white', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Username</Text>
                          </View>
                        }
                        {promptPasswordInput ?
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faCheck}
                              style={{ color: '#70e000', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Password</Text>
                          </View>
                          :
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 10,
                              marginRight: 10
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSolid, faLock}
                              style={{ color: 'white', margin: 7, alignSelf: 'center' }}
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Password</Text>
                          </View>
                        }
                      </View>
                    </>
  
                    <TextInput
                      type="text"
                      name="email"
                      placeholder="Email"
                      placeholderTextColor="white"
                      value={promptEmailInput}
                      onChangeText={setPromptEmailInput}
                      style={Styling.textInputStyle}
                      disableFullscreenUI={true}
                    />
                    <TextInput
                      type="text"
                      name="username"
                      placeholder="Username"
                      placeholderTextColor="white"
                      value={promptUsernameInput}
                      onChangeText={setPromptUsernameInput}
                      style={Styling.textInputStyle}
                      disableFullscreenUI={true}
                    />
                    <TextInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      placeholderTextColor="white"
                      value={promptPasswordInput}
                      onChangeText={setPromptPasswordInput}
                      secureTextEntry={true}
                      style={Styling.textInputStyle}
                      disableFullscreenUI={true}
                    />
  
                    {
                      promptEmailInput != "" &&
                        promptUsernameInput != "" &&
                        promptPasswordInput != "" ?
                        <TouchableOpacity
                          onPress={() => {
                            handleFormSubmit()
                            setDisplayLoading(true);
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: '#70e000',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              padding: 20,
                              borderRadius: 40,
                              alignSelf: 'center',
                              margin: 10,
                              width: 350
                            }}
  
                          >
                            <Text
                              style={{ color: '#001219', fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}
                              allowFontScaling={false}
                            >
                              SIGN UP
                            </Text>
                          </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                          onPress={() => { }}
                          disabled={true}
                        >
                          <View
                            style={{
                              backgroundColor: '#70e000',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              padding: 20,
                              borderRadius: 40,
                              alignSelf: 'center',
                              margin: 10,
                              width: 350
                            }}
                          >
                            <Text
                              style={{ color: '#001219', fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}
                              allowFontScaling={false}
                            >
                              SIGN UP
                            </Text>
                          </View>
                        </TouchableOpacity>
                    }
                    <Text
                      style={{ color: 'white', alignSelf: 'center', fontSize: 30, margin: 20, fontWeight: 'bold' }}
                      allowFontScaling={false}
                    >
                      Have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setPromptEmailInput("")
                        setPromptUsernameInput("")
                        setPromptPasswordInput("")
                        setNewUser(false)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'blue',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          padding: 20,
                          borderRadius: 40,
                          alignSelf: 'center',
                          margin: 10,
                          width: 350
                        }}
                      >
                        <Text
                          style={{ color: 'white', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}
                          allowFontScaling={false}
                        >
                          Login</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                  :
                  <>
                    {displayLoading ?
                      <Loading />
                      :
                      <>
                        <Text
                          style={{ color: 'white', alignSelf: 'center', fontSize: 50, margin: 20, fontWeight: 'bold' }}
                          allowFontScaling={false}
                        >
                          Login
                        </Text>
                        <TextInput
                          type="text"
                          name="username"
                          placeholder="Username"
                          placeholderTextColor="white"
                          value={promptInput_0}
                          onChangeText={setPromptInput_0}
                          style={Styling.textInputStyle}
                          disableFullscreenUI={true}
                        />
                        <TextInput
                          type="password"
                          name="password"
                          placeholder="Password"
                          placeholderTextColor="white"
                          value={promptInput_1}
                          onChangeText={setPromptInput_1}
                          secureTextEntry={true}
                          style={Styling.textInputStyle}
                          disableFullscreenUI={true}
                        />
                        {displayLoginFailureAlert &&
                          <View style={{ alignSelf: 'center' }}>
                            <Text
                              style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}
                              allowFontScaling={false}
                            >
                              Incorrect Credentials
                            </Text>
                          </View>
                        }
                        {promptInput_0 != "" &&
                          promptInput_1 != "" ?
                          <TouchableOpacity onPress={() => { handleLogin(); setDisplayLoading(true); }}>
                            <View
                              style={{
                                backgroundColor: '#70e000',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                padding: 20,
                                borderRadius: 40,
                                alignSelf: 'center',
                                margin: 10,
                                width: 350
                              }}
                            >
                              <Text
                                style={{ color: '#001219', fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}
                                allowFontScaling={false}
                              >
                                LOGIN
                              </Text>
                            </View>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={() => { }}
                            disabled={true}
                          >
                            <View
  
                              style={{
                                backgroundColor: '#70e000',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                padding: 20,
                                borderRadius: 40,
                                alignSelf: 'center',
                                margin: 10,
                                width: 350
                              }}
                            >
                              <Text
                                style={{ color: '#001219', fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}
                                allowFontScaling={false}
                              >
                                LOGIN
                              </Text>
                            </View>
                          </TouchableOpacity>
                        }
  
                        <View style={Styling.modalDivisionLine}></View>

                        <TouchableOpacity 
                          onPress={() => setDisplayForgotPasswordContent(current => !current)}>
                          <View>
                            <Text
                              style={{ color: '#80ffdb', alignSelf: 'center', fontSize: 30, margin: 10, fontWeight: 'bold' }}
                              allowFontScaling={false}
                            >
                              Forgot Password?
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {displayForgotPasswordContent &&
                          <View
                            style={{
                              alignSelf: 'center',
                              margin: 10,
                              width: 350
                            }}
                          >
                            <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
  
                              <TextInput
                                type="text"
                                name="resetemail"
                                placeholder="Email"
                                placeholderTextColor='white'
                                value={promptResetEmail}
                                onChangeText={setPromptResetEmail}
                                allowFontScaling={false}
                                style={Styling.textInputStyle}
                                disableFullscreenUI={true}
                              />
                              {/* [[[SUBMIT BUTTON]]] */}
                              
                              <TouchableOpacity onPress={() => handleRequestReset()}>
                                <View
                                  style={{
                                    backgroundColor: '#70e000',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    padding: 10,
                                    borderRadius: 40,
                                    alignSelf: 'center',
                                    margin: 10,
                                    width: '90%'
                                  }}
                                >
                                  <Text
                                    style={{ color: 'black', alignSelf: 'center', fontSize: 30, margin: 10, fontWeight: 'bold' }}
                                    allowFontScaling={false}
                                  >Submit</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                            {resetRequestStatus != '' &&
                              <View style={{}}>
                                <Text
                                  style={{ color: 'white', alignSelf: 'center', fontSize: 30, margin: 10, fontWeight: 'bold' }}
                                  allowFontScaling={false}
                                >{resetRequestStatus}</Text>
                              </View>
                            }
  
                            <TouchableOpacity onPress={() => setDisplayForgotPasswordForm(true)}>
                              <View
                                style={{
                                  backgroundColor: '#ffbe0b',
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  padding: 5,
                                  borderRadius: 40,
                                  alignSelf: 'center',
                                  margin: 10,
                                  width: 350
                                }}
                              >
                                <Text
                                  style={{ color: 'black', alignSelf: 'center', fontSize: 30, margin: 10, fontWeight: 'bold' }}
                                  allowFontScaling={false}
                                >Have a reset token?</Text>
                              </View>
                            </TouchableOpacity>
                            {displayForgotPasswordForm &&
                              <>
                                <TextInput
                                  type="text"
                                  name="resetoken"
                                  placeholder="Reset Token"
                                  placeholderTextColor="white"
                                  value={promptResetToken}
                                  onChangeText={setPromptResetToken}
                                  style={Styling.textInputStyle}
                                  disableFullscreenUI={true}
                                />
                                <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10 }}>
                                  <TextInput
                                    type="password"
                                    name="resetpassword_0"
                                    placeholder="New Password"
                                    placeholderTextColor='white'
                                    value={promptResetPassword_0}
                                    onChangeText={setPromptResetPassword_0}
                                    secureTextEntry={true}
                                    allowFontScaling={false}
                                    style={Styling.textInputStyle}
                                    disableFullscreenUI={true}
                                  />
                                </View>
  
                                <View style={{ flexDirection: 'column', alignSelf: 'center', margin: 10 }}>
                                  <TextInput
                                    type="password"
                                    name="resetpassword_1"
                                    placeholder='Confirm Password'
                                    placeholderTextColor='white'
                                    value={promptResetPassword_1}
                                    onChangeText={setPromptResetPassword_1}
                                    secureTextEntry={true}
                                    allowFontScaling={false}
                                    style={Styling.textInputStyle}
                                    disableFullscreenUI={true}
                                  />
                                  {promptResetPassword_0 == promptResetPassword_1 && promptResetPassword_0 != '' && promptResetPassword_1 != '' &&
                                    <View style={{alignSelf: 'center'}}>
                                      <Text style={{color: 'white', fontSize: HeightRatio(25)}}
                                      allowFontScaling={false}>
                                        Passwords match!
                                      </Text>
                                    </View>
                                  }
                                  {promptResetPassword_0 != promptResetPassword_1 && promptResetPassword_0 != '' && promptResetPassword_1 != '' &&
                                    <View style={{alignSelf: 'center'}}>
                                      <Text style={{color: 'white', fontSize: HeightRatio(25) }}
                                      allowFontScaling={false}>
                                        Passwords do not match!
                                      </Text>
                                    </View>
                                  }
                                  {/* [[[SUBMIT BUTTON]]] */}
                                  <TouchableOpacity onPress={() => handleResetPassword()}>
                                    <View
                                      style={{
                                        backgroundColor: '#70e000',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        padding: 10,
                                        borderRadius: 40,
                                        alignSelf: 'center',
                                        margin: 10,
                                        width: 350
                                      }}
                                    >
                                      <Text
                                        style={{ color: 'black', alignSelf: 'center', fontSize: 30, margin: 10, fontWeight: 'bold' }}
                                        allowFontScaling={false}
                                      >Submit</Text>
                                    </View>
                                  </TouchableOpacity>
  
                                </View>
                              </>
  
                            }
  
                            <View>
                              <Modal
                                animationType="slide"
                                transparent={true}
                                visible={displayResetSuccessModal}
                                onRequestClose={() => {
                                  Alert.alert("Modal has been closed.");
                                  setDisplayResetSuccessModal(!displayResetSuccessModal);
                                }}
                              >
                                <View style={Styling.centeredView}>
                                  <View style={Styling.modalView}>
                                    {/* TOP ROW */}
                                    <View
                                      style={{
                                        backgroundColor: 'rgba(255, 0, 0, 1)',
                                        alignSelf: 'center',
                                        borderRadius: 8,
                                        position: 'absolute',
                                        zIndex: 10,
                                        top: 0,
                                        right: 0
                                      }}
                                    >
                                      <TouchableOpacity
                                        onPress={() => { setDisplayResetSuccessModal(!displayResetSuccessModal); setDisplayForgotPasswordContent(false); }}
                                        style={{
                                          borderRadius: 10,
                                          height: 50,
                                          width: 50
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faSolid, faX}
                                          style={{
                                            color: 'black',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            marginTop: 17
                                          }}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                    {/* MIDDLE ROW */}
                                    <Text style={Styling.modalText}>Reset successful, try to Login!</Text>
                                    <TouchableOpacity
                                      style={[Styling.button, Styling.buttonClose]}
                                      onPress={() => { setDisplayResetSuccessModal(!displayResetSuccessModal); setDisplayForgotPasswordContent(false); }}
                                    >
                                      <Text style={Styling.textStyle}>Cool</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </Modal>
                            </View>
                          </View>
                        }
  
                          <View style={Styling.modalDivisionLine}></View>

                        
                        <Text
                          style={{ color: 'white', alignSelf: 'center', fontSize: 30, margin: 20, fontWeight: 'bold' }}
                          // allowFontScaling={false}
                        >
                          Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => { setNewUser(true) }}>
                          <View
                            style={{
                              backgroundColor: 'blue',
                              display: 'flex',
                              // justifyContent: 'flex-start',
                              padding: 20,
                              borderRadius: 40,
                              alignSelf: 'center',
                              margin: 10,
                              width: 400
                            }}
                          >
                            <Text
                              style={{ color: 'white', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}
                              // allowFontScaling={false}
                            >
                              Sign Up
                            </Text>
                          </View>
                        </TouchableOpacity>
  
                      </>
                    }
                  </>
                }
  
              </>
            }
            <View style={{ marginBottom: 400 }}></View>
          </ScrollView>
        </SafeAreaView>
        <Navbar nav={navigation} auth={isTokenValid} position={'absolute'} from={'auth'} />
        </View>
        {/* <TouchableOpacity
              style={{ 
                position: 'absolute',
                zIndex: 15,
                top: HeightRatio(50),
                left: HeightRatio(50),
                height: HeightRatio(150),
                width: HeightRatio(150),
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 50

              }}
              onPress={() => {
                naivgation.dispatch(resetActionHome);
              }}
        >
          <Text style={{color: 'white', alignSelf: 'center', marginTop: HeightRatio(60)}}>HOME</Text>
        </TouchableOpacity> */}
        <StatusBar
          barStyle="default"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
      </>
    )
  }