import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, View, TouchableOpacity, Text, TextInput, StyleSheet, Modal, PixelRatio } from "react-native";
import { Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSolid, faAddressCard, faEnvelope, faSackDollar, faStar, faX, faPenToSquare, faCopy } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { DemoAppInvoiceAndQuote } from './VerificationInvoiceAndQuote';
import * as Clipboard from 'expo-clipboard';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainStateContext } from '../../App';
import { SecureStorage } from './SecureStorage';
import { windowHeight, windowWidth, HeightRatio, WidthRatio, Styling } from '../../Styling';
import { 
    UPDATE_USER, 
    LOGIN_USER, 
    UPDATE_USER_PASSWORD, 
    DELETE_USER 
} from '../../utils/mutations';

export const UserDetails = (props) => {
    const { mainState, setMainState } = useContext(MainStateContext);

    const [updateUser] = useMutation(UPDATE_USER);
    const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD);
    const [deleteUser] = useMutation(DELETE_USER);

    const [showEditableFieldUsername, setShowEditableFieldUsername] = useState(false);
    const [showEditableFieldEmail, setShowEditableFieldEmail] = useState(false);
    const [showEditableFieldPassword, setShowEditableFieldPassword] = useState(false);
    const [showEditableFieldVerification, setShowEditableFieldVerification] = useState(false);
    const [showEditableFieldDelete, setShowEditableFieldDelete] = useState(false);

    const [promptUsernameInput, setPromptUsernameInput] = useState("")
    const [promptEmailInput, setPromptEmailInput] = useState("")
    const [promptPasswordInput1, setPromptPasswordInput1] = useState("")
    const [promptPasswordInput2, setPromptPasswordInput2] = useState("")
    const [promptVerificationInput, setPromptVerificationInput] = useState("")
    const [promptDeleteInput, setPromptDeleteInput] = useState("")

    const [deleteUserModal, setDeleteUserModal] = useState(false);

    let userDetailsArray = [];
    const userID = useRef(null);


    const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
        variables: { id: userID.current }
    });

    useEffect(() => {
        userID.current = mainState.current.userID;
    }, [])

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(userID.current);
    };

    const resetActionAuth = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Auth', params: {} }]
    });


    // [[[USER DETAILS]]]
    const EditableFields = [
        {
            title: 'Username',
            detail: userByID?.user.username,
            edit: showEditableFieldUsername,
            setedit: setShowEditableFieldUsername,
            prompt: promptUsernameInput,
            setprompt: setPromptUsernameInput
        },
        {
            title: 'Email',
            detail: userByID?.user.email,
            edit: showEditableFieldEmail,
            setedit: setShowEditableFieldEmail,
            prompt: promptEmailInput,
            setprompt: setPromptEmailInput
        },
        {
            title: 'Password',
            detail: '* * * * *',
            edit: showEditableFieldPassword,
            setedit: setShowEditableFieldPassword,
            prompt: promptPasswordInput1,
            setprompt: setPromptPasswordInput1
        },
        {
            title: 'Delete Account',
            detail: '',
            edit: showEditableFieldDelete,
            setedit: setShowEditableFieldDelete,
            prompt: promptDeleteInput,
            setprompt: setPromptDeleteInput
        }
    ]


    // [[[UPDATE USER BASED ON USER DETAIL SELECTED]]]
    const handleFormSubmit = async () => {
        if (showEditableFieldUsername) {
            try {
                await updateUser({
                    variables: {
                        profilepicture: userByID?.user.profilepicture,
                        verified: userByID?.user.verified,
                        username: promptUsernameInput,
                        email: userByID?.user.email,
                    }
                });
                refetch();
            }
            catch (e) { console.error(e); }
        } else if (showEditableFieldEmail) {
            try {
                await updateUser({
                    variables: {
                        profilepicture: userByID?.user.profilepicture,
                        verified: userByID?.user.verified,
                        username: userByID?.user.username,
                        email: promptEmailInput,
                    }
                });
                refetch();
            }
            catch (e) { console.error(e); }
        } else if (showEditableFieldPassword && promptPasswordInput1 == promptPasswordInput2) {
            try {
                await updateUserPassword({
                    variables: {
                        password: promptPasswordInput1
                    }
                });
                refetch();
            }
            catch (e) { console.error(e); }
        } else if (showEditableFieldDelete && promptDeleteInput != '') {
            setDeleteUserModal(true);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            await deleteUser({
                variables: { deleteUserId: promptDeleteInput }
            });
            setMainState({
                bearerToken: null,
                userID: null,
                authState: false
            })
            props.nav.dispatch(resetActionAuth)
        }
        catch (e) { console.error(e); }
    }

    // [[[PRODUCT USER DETAIL SECTIONS]]]
    for (let i = 0; i < EditableFields.length; i++) {
        userDetailsArray[i] =
            <View style={{ width: 450}} key={i}>
                <TouchableOpacity
                    onPress={() => {
                        setShowEditableFieldUsername(false);
                        setShowEditableFieldEmail(false);
                        setShowEditableFieldPassword(false);
                        setShowEditableFieldVerification(false);
                        setShowEditableFieldDelete(false);
                        EditableFields[i].setedit(current => !current);
                        setPromptUsernameInput("");
                        setPromptEmailInput("");
                        setPromptPasswordInput1("");
                        setPromptPasswordInput2("");
                        setPromptVerificationInput("");
                        setPromptDeleteInput("");
                    }}
                >
                    <View
                        style={{
                            border: 'solid',
                            borderColor: 'white',
                            borderTopWidth: 1,
                            borderLeftWidth: 1,
                            borderBottomWidth: 1,
                            // borderTopLeftRadius: 30,
                            borderBottomLeftRadius: HeightRatio(30),
                            padding: HeightRatio(15),
                            width: WidthRatio(160),
                            flexDirection: 'column',
                            margin: HeightRatio(20),
                            backgroundColor: `${EditableFields[i].edit ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}`,
                            // borderTopRightRadius: 10,
                            borderTopLeftRadius: HeightRatio(20),
                            alignSelf: 'center'
                        }}

                    >
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ color: 'white', marginRight: 10, fontSize: HeightRatio(50), fontWeight: 'bold', alignSelf: 'center' }}>{EditableFields[i].title}</Text>

                            <Text
                                style={{ color: '#fcd01f', alignSelf: 'center', fontSize: HeightRatio(25), fontWeight: 'bold', width: 150 }}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {EditableFields[i].detail}
                            </Text>

                            {EditableFields[i].edit ?
                                null
                                :
                                <View
                                    style={{
                                        position: 'absolute',
                                        zIndex: 10,
                                        alignSelf: 'center',
                                        left: WidthRatio(130),
                                        padding: 4,
                                        borderRadius: 4,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faSolid, faPenToSquare}
                                        style={{ color: '#00b2ca', justifyContent: 'flex-end', marginRight: 5 }}
                                        size={20}
                                    />
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: HeightRatio(30), alignSelf: 'flex-end' }} allowFontScaling={false}>
                                        EDIT
                                    </Text>
                                </View>
                            }
                        </View>
                        {EditableFields[i].edit ?
                            <>
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            {i != 2 &&
                                                <>
                                                    {i == 3 &&
                                                        <>
                                                            <TouchableOpacity onPress={() => copyToClipboard()} style={{ marginLeft: 10 }}>
                                                                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.3)', width: WidthRatio(150), borderRadius: 10, padding: 10, alignSelf: 'center' }}>
                                                                    <Text
                                                                        style={{ color: '#efea5a', fontSize: HeightRatio(40), fontWeight: 'bold', marginLeft: 20 }}
                                                                        allowFontScaling={false}
                                                                    >Copy ID {userByID?.user._id}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>
                                                    }
                                                    <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10 }}>

                                                        <TextInput
                                                            type="text"
                                                            name={EditableFields[i].title}
                                                            placeholder={i == 3 ? 'Paste ID' : EditableFields[i].title}
                                                            placeholderTextColor='white'
                                                            value={EditableFields[i].prompt}
                                                            onChangeText={EditableFields[i].setprompt}
                                                            multiline
                                                            numberOfLines={1}
                                                            allowFontScaling={false}
                                                            style={{
                                                                outline: 'none',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                justifyContent: 'flex-start',
                                                                padding: 20,
                                                                border: 'solid',
                                                                borderColor: 'white',
                                                                borderTopWidth: 1,
                                                                borderLeftWidth: 1,
                                                                borderBottomWidth: 1,
                                                                borderTopLeftRadius: HeightRatio(30),
                                                                borderBottomLeftRadius: HeightRatio(30),
                                                                alignSelf: 'center',
                                                                marginTop: 10,
                                                                marginBottom: 4,
                                                                width: WidthRatio(100)
                                                            }}
                                                        />
                                                        {/* [[[SUBMIT BUTTON]]] */}
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                handleFormSubmit();
                                                                setShowEditableFieldUsername(false);
                                                                setShowEditableFieldEmail(false);
                                                                setShowEditableFieldPassword(false);
                                                                setShowEditableFieldVerification(false);
                                                                setShowEditableFieldDelete(false);
                                                            }}
                                                            style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                // width: windowWidth - 30,
                                                                padding: 10,
                                                                // borderRadius: 10,
                                                                border: 'solid',
                                                                borderColor: 'white',
                                                                borderTopWidth: 1,
                                                                borderRightWidth: 1,
                                                                borderBottomWidth: 1,
                                                                borderTopRightRadius: 30,
                                                                borderBottomRightRadius: 30,
                                                                marginTop: 10,
                                                                marginBottom: 4,
                                                            }}
                                                        >
                                                            <Text style={{ color: '#ccff33', marginTop: 15, marginRight: 15 }} allowFontScaling={false}>SUBMIT</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>
                                            }


                                            {i == 2 &&
                                                <>
                                                    <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10 }}>
                                                        <TextInput
                                                            type="password"
                                                            name={EditableFields[i].title}
                                                            placeholder={'New ' + EditableFields[i].title}
                                                            placeholderTextColor='white'
                                                            value={promptPasswordInput1}
                                                            onChangeText={setPromptPasswordInput1}
                                                            secureTextEntry={true}
                                                            allowFontScaling={false}
                                                            style={{
                                                                outline: 'none',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                justifyContent: 'flex-start',
                                                                padding: 20,
                                                                border: 'solid',
                                                                borderColor: 'white',
                                                                borderWidth: 1,
                                                                borderRadius: HeightRatio(30),
                                                                alignSelf: 'center',
                                                                marginTop: 10,
                                                                marginBottom: 4,
                                                                width: WidthRatio(150)
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10 }}>
                                                        <TextInput
                                                            type="password"
                                                            name={EditableFields[i].title}
                                                            placeholder='Confirm Password'
                                                            placeholderTextColor='white'
                                                            value={promptPasswordInput2}
                                                            onChangeText={setPromptPasswordInput2}
                                                            secureTextEntry={true}
                                                            allowFontScaling={false}
                                                            style={{
                                                                outline: 'none',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                justifyContent: 'flex-start',
                                                                padding: 20,
                                                                border: 'solid',
                                                                borderColor: 'white',
                                                                borderTopWidth: 1,
                                                                borderLeftWidth: 1,
                                                                borderBottomWidth: 1,
                                                                borderTopLeftRadius: HeightRatio(30),
                                                                borderBottomLeftRadius: HeightRatio(30),
                                                                alignSelf: 'center',
                                                                marginTop: 10,
                                                                marginBottom: 4,
                                                                width: WidthRatio(100)
                                                            }}
                                                        />
                                                        {/* [[[SUBMIT BUTTON]]] */}
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                handleFormSubmit();
                                                                setShowEditableFieldUsername(false);
                                                                setShowEditableFieldEmail(false);
                                                                setShowEditableFieldPassword(false);
                                                                setShowEditableFieldVerification(false);
                                                                setShowEditableFieldDelete(false);
                                                            }}
                                                            style={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                                // width: windowWidth - 30,
                                                                padding: 10,
                                                                // borderRadius: 10,
                                                                border: 'solid',
                                                                borderColor: 'white',
                                                                borderTopWidth: 1,
                                                                borderRightWidth: 1,
                                                                borderBottomWidth: 1,
                                                                borderTopRightRadius: 30,
                                                                borderBottomRightRadius: 30,
                                                                marginTop: 10,
                                                                marginBottom: 4,
                                                            }}

                                                        >
                                                            <Text style={{ color: '#ccff33', marginTop: 15, marginRight: 15 }} allowFontScaling={false}>SUBMIT</Text>
                                                        </TouchableOpacity>

                                                    </View>

                                                </>
                                            }
                                            {promptPasswordInput1 != '' && promptPasswordInput2 != '' && promptPasswordInput1 == promptPasswordInput2 &&
                                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: HeightRatio(40) }}>
                                                        Passwords match!
                                                    </Text>
                                                </View>
                                            }
                                            {promptPasswordInput1 != '' && promptPasswordInput2 != '' && promptPasswordInput1 != promptPasswordInput2 &&
                                                <View style={{ flexDirection: 'row', alignSelf: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 10, borderRadius: 10 }}>
                                                    <Text style={{ color: 'red', fontSize: HeightRatio(40) }}>
                                                        Passwords do not match!
                                                    </Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </>
                            :
                            null
                        }
                        {!userByID?.user.verified &&
                            <>
                                {showEditableFieldVerification && i == 4 &&
                                    <View>
                                        <DemoAppInvoiceAndQuote currentuser={userByID?.user} />
                                    </View>
                                }
                            </>
                        }
                    </View>
                </TouchableOpacity>
            </View>



    }
    return (
        <View>
            {userDetailsArray}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteUserModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setDeleteUserModal(!deleteUserModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                                onPress={() => { setDeleteUserModal(!deleteUserModal) }}
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
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleDeleteAccount()}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#edf2f4",
        borderRadius: 10,
        borderWidth: 3,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: WidthRatio(300)
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#d90429'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#4361ee",
        borderRadius: 10,
        padding: 20
    },
    textStyle: {
        color: "white",
        fontSize: HeightRatio(25),
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black',
        fontSize: HeightRatio(30),
        fontWeight: 'bold'
    }
});