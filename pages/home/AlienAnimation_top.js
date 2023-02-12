import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CommonActions } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { HeightRatio, Styling, WidthRatio } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import * as SecureStore from 'expo-secure-store';
import { MainStateContext } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Image,
    RefreshControl,
    Animated
} from 'react-native';
import {
    faSolid,
    faFlagCheckered,
    faSliders,
} from '@fortawesome/free-solid-svg-icons'
import { Tokens } from './Tokens';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AlienEffect_top = () => {

    const alienPosition = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d0 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d1 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d2 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d3 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d4 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d5 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d6 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current
    const alienPosition_d7 = useRef(new Animated.ValueXY({ x: HeightRatio(0), y: 0 })).current

    let localYPos_0 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_1 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_2 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_3 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_4 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_5 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_6 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_7 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_8 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_9 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_10 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_11 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_12 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_13 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_14 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_15 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);
    let localYPos_16 = Math.floor(Math.random() * (HeightRatio(900) - HeightRatio(30))) + HeightRatio(100);





    const animation = useRef(null);
    const animation_d0 = useRef(null);
    const animation_d1 = useRef(null);
    const animation_d2 = useRef(null);
    const animation_d3 = useRef(null);
    const animation_d4 = useRef(null);
    const animation_d5 = useRef(null);
    const animation_d6 = useRef(null);
    const animation_d7 = useRef(null);

    let timeoutAlien_ID;
    let timeoutAlien_ID_d0;
    let timeoutAlien_ID_d1;
    let timeoutAlien_ID_d2;
    let timeoutAlien_ID_d3;
    let timeoutAlien_ID_d4;
    let timeoutAlien_ID_d5;
    let timeoutAlien_ID_d6;
    let timeoutAlien_ID_d7;



    const AlienAnimation = () => {
        console.log("1A")
        alienPosition.setValue({ x: HeightRatio(1000), y: localYPos_0 })
        animation.current = Animated.parallel([
            Animated.timing(alienPosition.x, {
                toValue: HeightRatio(-300),
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition.y, {
                toValue: localYPos_0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]);

        animation.current.start(() => {
            animation.current.stop((value) => {
                alienPosition.setValue(value)

            })

            timeoutAlien_ID = setTimeout(() => {
                AlienAnimation();
            }, 500)
        });
    }

    const AlienAnimation_d0 = () => {
        console.log("1B")
        alienPosition_d0.setValue({ x: HeightRatio(1000), y: localYPos_1 })
        animation_d0.current = Animated.parallel([
            Animated.timing(alienPosition_d0.x, {
                toValue: HeightRatio(-300),
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d0.y, {
                toValue: localYPos_1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]);

        animation_d0.current.start(() => {
            animation_d0.current.stop((value) => {
                alienPosition_d0.setValue(value)

            })

            timeoutAlien_ID_d0 = setTimeout(() => {
                AlienAnimation_d0();
            }, 500)
        });
    }

    const AlienAnimation_d1 = () => {
        console.log("1C")
        alienPosition_d1.setValue({ x: HeightRatio(1000), y: localYPos_2 })


        animation_d1.current = Animated.parallel([
            Animated.timing(alienPosition_d1.x, {
                toValue: HeightRatio(-300),
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d1.y, {
                toValue: localYPos_2,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]);

        animation_d1.current.start(() => {
            animation_d1.current.stop((value) => {
                alienPosition_d1.setValue(value)

            })

            timeoutAlien_ID_d1 = setTimeout(() => {
                AlienAnimation_d1();
            }, 500)
        });
    }

    const AlienAnimation_d2 = () => {
        console.log("1D")
        alienPosition_d2.setValue({ x: HeightRatio(1000), y: localYPos_3 })


        animation_d2.current = Animated.parallel([
            Animated.timing(alienPosition_d2.x, {
                toValue: HeightRatio(-300),
                duration: 2500,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d2.y, {
                toValue: localYPos_3,
                duration: 2500,
                useNativeDriver: true,
            }),
        ]);

        animation_d2.current.start(() => {
            animation_d2.current.stop((value) => {
                alienPosition_d2.setValue(value)

            })

            timeoutAlien_ID_d2 = setTimeout(() => {
                AlienAnimation_d2();
            }, 500)
        });
    }

    const AlienAnimation_d3 = () => {
        console.log("1E")
        alienPosition_d3.setValue({ x: HeightRatio(1000), y: localYPos_4 })


        animation_d3.current = Animated.parallel([
            Animated.timing(alienPosition_d3.x, {
                toValue: HeightRatio(-300),
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d3.y, {
                toValue: localYPos_4,
                duration: 3000,
                useNativeDriver: true,
            }),
        ]);

        animation_d3.current.start(() => {
            animation_d3.current.stop((value) => {
                alienPosition_d3.setValue(value)

            })

            timeoutAlien_ID_d3 = setTimeout(() => {
                AlienAnimation_d3();
            }, 500)
        });
    }
    const AlienAnimation_d4 = () => {
        console.log("1F")
        alienPosition_d4.setValue({ x: HeightRatio(1000), y: localYPos_6 })


        animation_d4.current = Animated.parallel([
            Animated.timing(alienPosition_d4.x, {
                toValue: HeightRatio(-300),
                duration: 3500,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d4.y, {
                toValue: localYPos_6,
                duration: 3500,
                useNativeDriver: true,
            }),
        ]);

        animation_d4.current.start(() => {
            animation_d4.current.stop((value) => {
                alienPosition_d4.setValue(value)

            })

            timeoutAlien_ID_d4 = setTimeout(() => {
                AlienAnimation_d4();
            }, 500)
        });
    }

    const AlienAnimation_d5 = () => {
        console.log("1G")
        alienPosition_d5.setValue({ x: HeightRatio(1000), y: localYPos_8 })


        animation_d5.current = Animated.parallel([
            Animated.timing(alienPosition_d5.x, {
                toValue: HeightRatio(-300),
                duration: 4000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d5.y, {
                toValue: localYPos_8,
                duration: 4000,
                useNativeDriver: true,
            }),
        ]);

        animation_d5.current.start(() => {
            animation_d5.current.stop((value) => {
                alienPosition_d5.setValue(value)

            })

            timeoutAlien_ID_d5 = setTimeout(() => {
                AlienAnimation_d5();
            }, 500)
        });
    }

    const AlienAnimation_d6 = () => {
        console.log("1H")
        alienPosition_d6.setValue({ x: HeightRatio(1000), y: localYPos_10 })


        animation_d6.current = Animated.parallel([
            Animated.timing(alienPosition_d6.x, {
                toValue: HeightRatio(-300),
                duration: 4500,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d6.y, {
                toValue: localYPos_10,
                duration: 4500,
                useNativeDriver: true,
            }),
        ]);

        animation_d6.current.start(() => {
            animation_d6.current.stop((value) => {
                alienPosition_d6.setValue(value)

            })

            timeoutAlien_ID_d6 = setTimeout(() => {
                AlienAnimation_d6();
            }, 500)
        });
    }

    const AlienAnimation_d7 = () => {
        console.log("1I")
        alienPosition_d7.setValue({ x: HeightRatio(1000), y: localYPos_12 })


        animation_d7.current = Animated.parallel([
            Animated.timing(alienPosition_d7.x, {
                toValue: HeightRatio(-300),
                duration: 5000,
                useNativeDriver: true,
            }),
            Animated.timing(alienPosition_d7.y, {
                toValue: localYPos_12,
                duration: 5000,
                useNativeDriver: true,
            }),
        ]);

        animation_d7.current.start(() => {
            animation_d7.current.stop((value) => {
                alienPosition_d7.setValue(value)

            })

            timeoutAlien_ID_d7 = setTimeout(() => {
                AlienAnimation_d7();
            }, 500)
        });
    }

    useEffect(() => {
        AlienAnimation();
        setTimeout(() => {
            AlienAnimation_d0();
        }, 300)
        setTimeout(() => {
            AlienAnimation_d1();
        }, 600)
        setTimeout(() => {
            AlienAnimation_d2();
        }, 900)
        setTimeout(() => {
            AlienAnimation_d3();
        }, 1200)
        setTimeout(() => {
            AlienAnimation_d4();
        }, 1500)
        setTimeout(() => {
            AlienAnimation_d5();
        }, 1800)
        setTimeout(() => {
            AlienAnimation_d6();
        }, 2100)
        setTimeout(() => {
            AlienAnimation_d7();
        }, 2400)

        return () => {
            clearTimeout(timeoutAlien_ID);
            clearTimeout(timeoutAlien_ID_d0);
            clearTimeout(timeoutAlien_ID_d1);
            clearTimeout(timeoutAlien_ID_d2);
            clearTimeout(timeoutAlien_ID_d3);
            clearTimeout(timeoutAlien_ID_d4);
            clearTimeout(timeoutAlien_ID_d5);
            clearTimeout(timeoutAlien_ID_d6);
            clearTimeout(timeoutAlien_ID_d7);

            if (animation.current != null) {
                animation.current.stop();
            }

            if (animation_d0.current != null) {
                animation_d0.current.stop();
            }
            if (animation_d1.current != null) {
                animation_d1.current.stop();
            }
            if (animation_d2.current != null) {
                animation_d2.current.stop();
            }
            if (animation_d3.current != null) {
                animation_d3.current.stop();
            }
            if (animation_d4.current != null) {
                animation_d4.current.stop();
            }
            if (animation_d5.current != null) {
                animation_d5.current.stop();
            }
            if (animation_d6.current != null) {
                animation_d6.current.stop();
            }
            if (animation_d7.current != null) {
                animation_d7.current.stop();
            }

        };

    }, [])

    return (
        <>
            {/* ALIEN */}
            <Animated.View
                style={
                    [
                        {
                            transform: [
                                { translateX: alienPosition.x },
                                { translateY: alienPosition.y }
                            ],
                        },
                    ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d0.x },
                            { translateY: alienPosition_d0.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d1.x },
                            { translateY: alienPosition_d1.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d2.x },
                            { translateY: alienPosition_d2.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d3.x },
                            { translateY: alienPosition_d3.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d3.x },
                            { translateY: alienPosition_d3.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d4.x },
                            { translateY: alienPosition_d4.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d5.x },
                            { translateY: alienPosition_d5.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d6.x },
                            { translateY: alienPosition_d6.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: alienPosition_d7.x },
                            { translateY: alienPosition_d7.y }
                        ],
                    },
                ]}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    height: HeightRatio(15),
                    width: HeightRatio(15),
                    backgroundColor: 'white',
                    borderRadius: HeightRatio(100)
                }} />
            </Animated.View>
        </>
    );
}