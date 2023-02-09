import React, { useEffect, useRef, useState, useContext } from 'react';
import { Platform, Text, View, FlatList, Alert, TouchableOpacity, Modal, Image } from 'react-native';
import { MainStateContext } from '../../App';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TOKEN_COUNT } from '../../utils/mutations';

const APIKeys = {
    google: "goog_eSMeOTAOoztqfufyCjPFYWImOfa",
};


export const Tokens = (props) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    const [updateTokenCount] = useMutation(UPDATE_TOKEN_COUNT);

    // - State for all available package
    const [packages, setPackages] = useState([]);

    // - State for displaying an overlay view
    const [isPurchasing, setIsPurchasing] = useState(false);

    const transactionLength = useRef(null);
    const [updateComplete, setUpdateComplete] = useState(false);
    const [displayModal, setDisplayModal] = useState(mainState.current.tokens_display)
    const [isPuchaseSuccessful, setIsPurchaseSuccessful] = useState(mainState.current.tokens_isPurchaseSuccessful)

    useEffect(() => {
        const getPackages = async () => {
            await Purchases.configure({ apiKey: APIKeys.google, appUserID: props.userID });
            Purchases.setDebugLogsEnabled(true);
            try {

                const offerings = await Purchases.getOfferings();

                if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
                    // console.log(offerings.current.availablePackages[0].product.identifier)
                    setPackages(offerings.current.availablePackages);

                }
            } catch (e) {
                Alert.alert('Error getting offers', e.message);
            }
        };

        getPackages();
    }, []);

    const onSelection = async (input) => {
        setIsPurchasing(true);
        setIsPurchaseSuccessful(false);
        setMainState({
            tokens_isPurchaseSuccessful: false
        })

        const customerInfo = await Purchases.getCustomerInfo();
        transactionLength.current = customerInfo.nonSubscriptionTransactions.length;

        try {
            setDisplayModal(false)
            setMainState({
                tokens_display: false
            })
            const { purchaserInfo } = await Purchases.purchasePackage(input);
        } catch (e) {
            if (!e.userCancelled) {
                // Alert.alert('Error purchasing package', e.message);
            }
        } finally {
            checkCustomerInfo(input)
            setIsPurchasing(false);
        }
    };

    const checkCustomerInfo = async (input) => {
        const customerInfo = await Purchases.getCustomerInfo();
        console.log("* * * * * * * *")
        console.log(input)

        const intervalID = setInterval(() => {
            if (
                customerInfo.nonSubscriptionTransactions.length > transactionLength.current &&
                customerInfo.nonSubscriptionTransactions[customerInfo.nonSubscriptionTransactions.length - 1].productIdentifier == `${input.product.identifier}`
            ) {

                if (!updateComplete) {
                    setUpdateComplete(true)
                    console.log("UPDATE DB WITH: " + input.product.identifier)
                    console.log("#1: clear INTERVAL!")

                    const handleUpdateTokenCount = async () => {
                        if (input.identifier === 'tokens_25') {
                            await updateTokenCount({
                                variables: {
                                  remove: "false",
                                  add: "true",
                                  amount: "25",
                                  userid: props.userID
                                }
                            });
                        } else if (input.identifier === 'tokens_50') {
                            await updateTokenCount({
                                variables: {
                                  remove: "false",
                                  add: "true",
                                  amount: "50",
                                  userid: props.userID
                                }
                            });
                        } else if (input.identifier === 'tokens_100') {
                            await updateTokenCount({
                                variables: {
                                  remove: "false",
                                  add: "true",
                                  amount: "100",
                                  userid: props.userID
                                }
                            });
                        } else if (input.identifier === 'tokens_200') {
                            await updateTokenCount({
                                variables: {
                                  remove: "false",
                                  add: "true",
                                  amount: "200",
                                  userid: props.userID
                                }
                            });
                        }
                    }

                    handleUpdateTokenCount();
                    
                    


                    clearInterval(intervalID);
                    setIsPurchaseSuccessful(true);
                    setMainState({
                        tokens_isPurchaseSuccessful: true
                    })
                }



            } else {
                if (updateComplete) {
                    console.log("#2: clear INTERVAL!")
                    clearInterval(intervalID);
                    return;
                }
                console.log("NO UPDATE")

            }
        }, 5000)

        setTimeout(() => {
            console.log("#3: clear INTERVAL!")
            clearInterval(intervalID);
            setUpdateComplete(false)
        }, 300000);




    }

    const Item = ({ title, identifier, description, priceString, purchasePackage }) => (
        <TouchableOpacity
            onPress={() => onSelection(purchasePackage)}
        >

            <View
                style={{
                    backgroundColor: '#445c6d60',
                    width: HeightRatio(400),
                    borderTopLeftRadius: HeightRatio(20),
                    borderBottomLeftRadius: HeightRatio(20),
                    borderTopRightRadius: HeightRatio(20),
                    borderBottomRightRadius: HeightRatio(20),
                    flexDirection: 'row',
                    // borderWidth: 1, borderColor: 'white',
                    margin: HeightRatio(10)
                }}
            >
                {identifier == 'cosmic_tokens_25' &&
                    <>
                        <Image
                            source={require('../../assets/token_25.png')}
                            style={{
                                height: HeightRatio(150),
                                width: HeightRatio(150),
                                alignSelf: 'center'
                            }}
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(300) }}>Buy 25 Tokens</Text>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(100) }}>{priceString}</Text>
                        </View>
                    </>
                }

                {identifier == 'cosmic_tokens_50' &&
                    <>
                        <Image
                            source={require('../../assets/token_50.png')}
                            style={{
                                height: HeightRatio(150),
                                width: HeightRatio(150),
                                alignSelf: 'center'
                            }}
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(300) }}>Buy 50 Tokens</Text>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(100) }}>{priceString}</Text>
                        </View>
                    </>
                }

                {identifier == 'cosmic_tokens_100' &&
                    <>
                        <Image
                            source={require('../../assets/token_100.png')}
                            style={{
                                height: HeightRatio(150),
                                width: HeightRatio(150),
                                alignSelf: 'center'
                            }}
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(300) }}>Buy 100 Tokens</Text>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(100) }}>{priceString}</Text>
                        </View>
                    </>
                }

                {identifier == 'cosmic_tokens_200' &&
                    <>
                        <Image
                            source={require('../../assets/token_200.png')}
                            style={{
                                height: HeightRatio(150),
                                width: HeightRatio(150),
                                alignSelf: 'center'
                            }}
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(300) }}>Buy 200 Tokens</Text>
                            <Text style={{ color: 'white', fontSize: HeightRatio(40), width: HeightRatio(100) }}>{priceString}</Text>
                        </View>
                    </>
                }

            </View>

        </TouchableOpacity>
    );

    return (
        <>
        {displayModal &&
            <View
                style={{
                    zIndex: 100,
                    position: 'absolute',
                    top: HeightRatio(60),
                    left: HeightRatio(20),
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: HeightRatio(30), padding: HeightRatio(20),
                    borderWidth: 2,
                    borderColor: 'white'
                }}
            >
                <FlatList
                    data={packages}
                    renderItem={({ item }) =>
                        <View style={{ alignSelf: 'center' }}>
                            <Item
                                title={item.product.title}
                                identifier={item.product.identifier}
                                description={item.product.description}
                                priceString={item.product.priceString}
                                purchasePackage={item}
                            />
                        </View>
                    }
                    keyExtractor={(item) => item.identifier}
                />

            </View>
        }
            {isPuchaseSuccessful && 
                <View
                style={{
                    zIndex: 100,
                    position: 'absolute',
                    top: HeightRatio(60),
                    left: HeightRatio(20),
                    width: HeightRatio(600),
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: HeightRatio(30), padding: HeightRatio(20),
                    borderWidth: 2,
                    borderColor: 'white'
                }}
            >
                <Text style={{color: 'white', fontSize: HeightRatio(40), width: HeightRatio(500), margin: HeightRatio(10)}}>
                    Purchase successful. <Text style={{color: '#35faa9'}}>Refresh.</Text>
                </Text>

            </View>
            }

            {isPurchasing && <View />}
        </>
    );


}