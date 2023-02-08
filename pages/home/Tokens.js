import React, { useEffect, useRef, useState, useContext } from 'react';
import { Platform, Text, View, FlatList, Alert, TouchableOpacity, Modal, Image } from 'react-native';
import { MainStateContext } from '../../App';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { HeightRatio, windowHeight } from '../../Styling';

const APIKeys = {
    google: "goog_eSMeOTAOoztqfufyCjPFYWImOfa",
};


export const Tokens = (props) => {
    const { mainState, setMainState } = useContext(MainStateContext);
    // - State for all available package
    const [packages, setPackages] = useState([]);

    // - State for displaying an overlay view
    const [isPurchasing, setIsPurchasing] = useState(false);
    const transactionLength = useRef(null);
    const [updateComplete, setUpdateComplete] = useState(false);
    const [replaceContent, setReplaceContent] = useState(false)

    useEffect(() => {
        setReplaceContent(false)

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

        const customerInfo = await Purchases.getCustomerInfo();
        transactionLength.current = customerInfo.nonSubscriptionTransactions.length;

        try {
            const { purchaserInfo } = await Purchases.purchasePackage(input);



        } catch (e) {
            if (!e.userCancelled) {
                Alert.alert('Error purchasing package', e.message);
            }
        } finally {
            checkCustomerInfo(input)
            setIsPurchasing(false);
        }
    };

    const checkCustomerInfo = async (input) => {
        const customerInfo = await Purchases.getCustomerInfo();
        console.log("* * * * * * * *")

        const intervalID = setInterval(() => {
            if (
                customerInfo.nonSubscriptionTransactions.length > transactionLength.current &&
                customerInfo.nonSubscriptionTransactions[customerInfo.nonSubscriptionTransactions.length - 1].productIdentifier == `${input.product.identifier}`
            ) {

                if (!updateComplete) {
                    setUpdateComplete(true)
                    console.log("UPDATE DB WITH: " + input.product.identifier)
                    console.log("#1: clear INTERVAL!")
                    clearInterval(intervalID);
                    setReplaceContent(true)

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
        }, 60000);




    }

    const Item = ({ title, identifier, description, priceString, purchasePackage }) => (
        <TouchableOpacity
            onPress={() => onSelection(purchasePackage)}
        >

            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
            {replaceContent ?
                <View
                style={{
                zIndex: 100,
                position: 'absolute',
                top: HeightRatio(60),
                left: HeightRatio(20),
                width: '90%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: HeightRatio(30), padding: HeightRatio(20)
                }}
            >
                <Text style={{color: 'black', fontSize: HeightRatio(60), fontWeight: 'bold', width: HeightRatio(600)}}>
                    Purchase successful!
                </Text>

            </View>
                :
                
                <View
                    style={{
                    zIndex: 100,
                    position: 'absolute',
                    top: HeightRatio(60),
                    left: HeightRatio(20),
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: HeightRatio(30), padding: HeightRatio(20)
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

{ isPurchasing && <View /> }
        </>
    );


}