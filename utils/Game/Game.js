import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  Image,
  ActivityIndicator,
  Animated,
  PanResponder,
  UIManager,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Game = (props) => {
  // Setup
  const [loadingComplete, setLoadingComplete] = useState(false)
  let newY;
  let newX;
  let charHeight = 38;
  let charWidth = 62;


  setTimeout(() => {
    setLoadingComplete(true)
  }, 1000)


  const CharacterAndJoystick = () => {

    const objectPosition = useRef({ x: 0, y: 0 });
    let yInit = [];
    let xInit = [];

    const [posY, setPosY] = useState(0);
    const [posX, setPosX] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const dx = new Animated.Value(0);
    const dy = new Animated.Value(0);

    dx.setValue(
      pan.x.interpolate({
        // inputRange: [-Infinity, 0, Infinity],
        // outputRange: [0, 0, pan.x],
        inputRange: [0, 1],
        outputRange: [0, 100],
      })
    );
    dy.setValue(
      pan.y.interpolate({
        // inputRange: [-Infinity, 0, Infinity],
        // outputRange: [0, 0, pan.y],
        inputRange: [0, 1],
        outputRange: [0, 100],
      })
    );


    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {

          yInit.push(gestureState.moveY);
          xInit.push(gestureState.moveX);
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x.value,
            y: pan.y._value
          });
        },
        onPanResponderMove: (e, gestureState) => {
          newY = gestureState.moveY - yInit[0];
          newX = gestureState.moveX - xInit[0];

          if (newY <= 0) {
            newY = 0;
          } else if (newY >= (windowHeight * 0.78)) {
            newY = (windowHeight * 0.78);
          }

          if (newX <= -(windowWidth * 0.162)) {
            newX = -(windowWidth * 0.162);
          } else if (newX >= 0) {
            newX = 0;
          }

          // Update the object's position in state
          objectPosition.current = { x: newX, y: newY };
          setPosY(Math.trunc(objectPosition.current.y));
          setPosX(Math.trunc(objectPosition.current.x))

          Animated.event(
            [
              null,
              {
                dx,
                dy
              },
            ],
            { useNativeDriver: false }
          )(e, gestureState);
        },
        onPanResponderRelease: (e, gestureState) => {
          pan.flattenOffset();
        }
      })
    ).current;


    return (
      <View style={Styling.joystick_container}>
        {/* <HandleScore score={score._value} /> */}
        <View style={Styling.joystick_inner_container}>
          <Animated.View
            style={{
              // transform: [{ translateX: 480 }, { translateY: posY }]
              transform: [{ translateX: posX + 480 }, { translateY: posY + 10 }]


            }}
            {...panResponder.panHandlers}
          >
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: posY, left: -windowWidth }} /> */}
            <View style={{ right: windowWidth - 250, top: 0, flexDirection: 'row' }} >
              <Image source={require('../../assets/Char_0.png')} style={{ height: charHeight, width: charWidth, }} />
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 4, height: 23, width: 29, borderRadius: 10, left: -95, top: 16 }}>
                <Text style={{ color: '#ccff33', fontSize: 10 }}>{posY}</Text>
              </View>
            </View>
            <View style={Styling.joystick_knob} />

          </Animated.View>

        </View>
        <Projectile charY={posY + 10} charX={posX + 480} charHeight={charHeight} charWidth={charWidth} />
      </View>
    );
  }


  const Projectile = (props) => {
    // Letter
    // const letterRef = useRef(null);
    const [letter, setLetter] = useState('');
    const [letterPocket, setLetterPocket] = useState([]);
    const [displayLetters, setDisplayLetters] = useState([])
    const count = new Animated.Value(0);

    // Letter Array
    const [randomWord, setRandomWord] = useState('')
    // const [wordPlusSeven, setWordPlusSeven] = useState([]);
    const wordPlusSeven = useRef([])

    // Letter Position
    const animation = useRef(null)
    const position = useRef(new Animated.Value(1000)).current;
    const [yPos, setYPos] = useState(0);

    // Obstacle Position
    const obstacle_0 = useRef(null)
    const obstaclePosition_0 = useRef(new Animated.Value(1000)).current;
    const [obstacleYPos_0, setObstacleYPos_0] = useState(0)

   // Collision Detection Variables
   let localCharXPos = useRef(props.charX - Math.trunc(windowWidth * 0.272));
   let localCharYPos = useRef(props.charY - Math.trunc(windowHeight * 0.022));

    // Game Logic
    let yCalibrated = 25;
    const crashes = useRef(0);
    const prevCrashes = useRef(0);
    const isGameInProgress = useRef(false);
    
    const score = useRef(0);
    const hasUpdatedLetterBlock = useRef(false);
    const hasUpdatedObstacle_0 = useRef(false);

    // In Test
    const [prevWrongElements, setPrevWrongElements]= useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasGameBeenStarted, setHasGameBeenStarted] = useState(false)
    let timeoutId_a;
    let timeoutId_b;

    useLayoutEffect(() => {
      console.log("#0 useLayoutEffect")
      isGameInProgress.current = false;
      localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
      localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);
    }, [])

    const Generate = (prevC) => {
      console.log("#1: Start Generate")
      clearTimeout(timeoutId_b);
      if (prevC > 0) {
        crashes.current = prevC;
      } else {
        crashes.current = 0;
      }
      
      const data = require('./output.json');
      const index = Math.floor(Math.random() * data.length);
      const word = data[index].word;
      const letters = word.split('');

      const randomLetters = [];
      for (let i = 0; i < 7; i++) {
        const letterCode = Math.floor(Math.random() * 26) + 65;
        const letter = String.fromCharCode(letterCode);
        let lowerCaseLetter = letter.toLowerCase();
        randomLetters.push(lowerCaseLetter);
      }

      let combined = letters.concat(randomLetters);
      let uniqueCombined = [...new Set(combined)];
      let scambledCombined = shuffle(uniqueCombined);
      console.log(scambledCombined)

      
      setRandomWord(word);
      setDisplayLetters(letters)

      wordPlusSeven.current = scambledCombined; // Must be last
      console.log("#2 Finish Generate")
    }

    useEffect(() => {
      
      if (wordPlusSeven.current.length > 0) {
        console.log("#3 Word Plus 7 useEffect")
        isGameInProgress.current = true;
        // setHasContinuousGameBeenInitiated(false);
        console.log("[STATUS - hasGameBeenStarted]  :: " + hasGameBeenStarted)
        console.log("[STATUS - isGameInProgress.current]  :: " + isGameInProgress.current)

        if (!hasGameBeenStarted) {
          if (isGameInProgress.current) {
            console.log("#4 About to run animations.")
            runAnimation();
            runObstacleAnimation_0();
            setHasGameBeenStarted(true)
          }
        }
      }
  }, [wordPlusSeven.current])


    const runAnimation = () => {
      console.log("#5a Run Animation")
      if (isGameInProgress.current) {
        console.log("#5b Letters Array: " + wordPlusSeven.current)
        hasUpdatedLetterBlock.current = false;
        setYPos(Math.floor(Math.random() * 310));
        setLetter(wordPlusSeven.current[count._value]);
        position.setValue(1000);
        animation.current = Animated.timing(position, {
          toValue: -80,
          duration: 4000,
          useNativeDriver: true,
        })
        console.log("#5c Post Animated.timing")
        animation.current.start(() => {
          console.log("#5d Animation.Current.Start")
          if (count._value >= wordPlusSeven.current.length - 1) {
            count.setValue(0)
          } else {
            count.setValue(count._value + 1)
          }

          animation.current.stop((value) => {
            position.setValue(value)
            
          })
          
          timeoutId_a = setTimeout(() => {
            console.log("#5e Run Animation Cycle")
            runAnimation();
          }, 500)
        });
      } else {
        clearTimeout(timeoutId_a);
        return;
      }
      
    };


  let timeoutId;

  const runObstacleAnimation_0 = () => {
    console.log("#6a Run Obstacle Animation")
    if (isGameInProgress.current) {
      hasUpdatedObstacle_0.current = false;
      setObstacleYPos_0(Math.floor(Math.random() * 310));
      obstaclePosition_0.setValue(1000);
      obstacle_0.current = Animated.timing(obstaclePosition_0, {
        toValue: -80,
        duration: 2500,
        useNativeDriver: true,
      })
      console.log("#6b Post Animated.timing")
      obstacle_0.current.start(() => {
        console.log("#6c Obstacle_0.Current.Start")
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          console.log("#6d Run Obstacle Animation Cycle")
          runObstacleAnimation_0();
        }, 200)
      });
    } else {
      return;
    }
  };



    const isLetterBlockColliding = (obj1, obj2) => {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      );
    }

    const isObstacleColliding_0 = (obj1, obj2) => {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      );
    }

    localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
    localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);
    // console.log({x: localCharXPos, y: localCharYPos});
    // console.log(windowHeight)
     

    const [obj1, setObj1] = useState({
      x: localCharXPos.current,
      y: localCharYPos.current,
      width: props.charWidth,
      height: props.charHeight
    });

    useEffect(() => {
      setObj1({
        x: localCharXPos.current,
        y: localCharYPos.current,
        width: props.charWidth,
        height: props.charHeight
      });
    }, [localCharXPos.current, localCharYPos.current, props.charWidth, props.charHeight]);

    useLayoutEffect(() => {
      console.log(obj1)
      const wordBlockListener = position.addListener((value) => {
        let obj2 = { x: value.value, y: yPos, width: 50, height: 50 }

        if (isLetterBlockColliding(obj1, obj2)) {
          if (!hasUpdatedLetterBlock.current) {
            setLetterPocket(prevItems => [...prevItems, letter])
            hasUpdatedLetterBlock.current = true;
          }
        }
      });

      const obstacleListener_0 = obstaclePosition_0.addListener((value) => {
        let obj2 = { x: value.value, y: obstacleYPos_0, width: 50, height: 50 }

        if (isObstacleColliding_0(obj1, obj2)) {
          if (!hasUpdatedObstacle_0.current) {
            crashes.current += 1;
            hasUpdatedObstacle_0.current = true;
          }
          obstacle_0.current.reset()
        }
      });

      return () => {
        position.removeListener(wordBlockListener);
        obstaclePosition_0.removeListener(obstacleListener_0)
      }
    }, [obj1]);



    useEffect(() => {
      let uniqueLetterPocket = Array.from(new Set(letterPocket));
      let letters = randomWord.split('');
      let uniqueLetters = Array.from(new Set(letters));

      const similarElements = uniqueLetterPocket.filter((element) => letters.includes(element));
      const wrongElements = letterPocket.filter((element) => !letters.includes(element));
      if (wrongElements.length > prevWrongElements) {
        crashes.current += 1;
      }
      setPrevWrongElements(wrongElements.length)

      if (letterPocket.length > 0 && similarElements.length === uniqueLetters.length) {
        // youWin(crashes.current)
        endGame({continue: true, crashes: crashes.current});
      }
      if (letterPocket.length > 0) {
        animation.current.reset()
      }
      
    }, [letterPocket])

    useEffect(() => {
      if (crashes.current >= 3) {
        endGame({continue: false, crashes: 0});
      }
    }, [crashes.current])

    const getBackgroundColor = (input) => {
      let uniqueLetterPocket = Array.from(new Set(letterPocket));
      if (uniqueLetterPocket.includes(input)) {
        return '#43bccd';
      } else {
        return '#ffffff';
      }
    }

    const endGame = (input) => {
      console.log("COMPLETE")
      console.log(input)
      // Stop Game
      isGameInProgress.current = false;
      animation.current.stop();
      obstacle_0.current.stop();
      
      // Clear Letters
      // letterRef.current = null;
      setLetter('');
      setLetterPocket([]);
      setDisplayLetters([]);
      count.setValue(0)

      // Clear Word
      setRandomWord('');
      wordPlusSeven.current = [];

      // Clear Letter Position
      position.setValue(1000);
      setYPos(0)

      // Clear Obstacle's
      
      obstaclePosition_0.setValue(1000)
      setObstacleYPos_0(0)

      // Clear Game Logic
      crashes.current = 0;
      prevCrashes.current = 0
      // score.current = 0;
      hasUpdatedLetterBlock.current = false;
      hasUpdatedObstacle_0.current = false;

      

      if (input.continue) {
        setHasGameBeenStarted(false);
        score.current += 1;
        timeoutId_b = setTimeout(() => {
          Generate(input.crashes)
        }, 500)
        
      } else {
        setTimeout(() => {
          setHasGameBeenStarted(false);
          setModalVisible(true)
        }, 100);
      }
      
      
    }


    

    return (
      <View>
        <>

          <TouchableOpacity
            onPress={() => { Generate() }}
            style={{ position: 'absolute', left: windowWidth / 2 - 25, top: -5 }}
          >
            <Image
              source={require('../../assets/button_play.png')}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>

            {score.current > 0 ?
              <View style={{ position: 'absolute', bottom: - windowHeight + 100, left: windowWidth / 2 - 50 }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 40 }}>Score: {score.current}</Text>
              </View>
              :
              <View style={{ position: 'absolute', bottom: - windowHeight + 100, left: windowWidth / 2 - 50 }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 40 }}>Score: 0</Text>
              </View>
            }

            {/* Letter Blocks */}
            <Animated.View
              style={[
                Styling.projectile_word_block,
                {
                  // transform: [{ translateX: position }, { translateY: yPos + yCalibrated }],
                  transform: [
                    { translateX: position },
                    { translateY: yPos }
                  ],

                },
              ]}
            >
              <Text style={Styling.projectile_letter}>
                {letter.toUpperCase()}
              </Text>
            </Animated.View>

            {/* Obstacles */}
            <Animated.View
              style={[
                Styling.projectile_obstacle_block,
                {
                  transform: [{ translateX: obstaclePosition_0 }, { translateY: obstacleYPos_0 }],
                },
              ]}
            >
              <Image source={require('../../assets/enemy_0.png')} style={{ height: 50, width: 50 }} />
            </Animated.View>


            {displayLetters.map((l, i) => (
              <View style={{
                width: 40, position: 'absolute', top: windowHeight - 60, left: (10 + (i * 45)),
                height: 40,
                borderRadius: 10,
                backgroundColor: getBackgroundColor(l),
                justifyContent: 'center',
                alignItems: 'center'
              }}
                key={i}
              >
                <Text style={Styling.projectile_random_word_letter}>{l.toUpperCase()}</Text>
              </View>
            ))}
            {crashes.current > 0 ?
              <>
                {Array.from(Array(crashes.current).keys()).map((n, i) => (
                  <View style={{
                    width: 40, position: 'absolute', top: windowHeight - 60, left: (windowWidth / 2 + 200 + (i * 50)),
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                    key={i}
                  >
                    <Image source={require('../../assets/skull_0.png')} style={{ height: 50, width: 50 }} />
                  </View>
                ))}
              </>
              :
              <>
                {Array.from(Array(prevCrashes.current).keys()).map((n, i) => (
                  <View style={{
                    width: 50, position: 'absolute', top: -40, left: (550 + (i * 50)),
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                    key={i}
                  >
                    <Image source={require('../../assets/skull_0.png')} style={{ height: 50, width: 50 }} />
                  </View>
                ))}
              </>
            }

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          isGameInProgress.current = false;
        }}
      >
        <View style={Styling.centeredView}>
          <View style={Styling.modalView}>
            <Text style={Styling.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[Styling.button, Styling.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={Styling.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        </>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        showHideTransition={'none'}
        hidden={true} />
      {/* BODY */}
      <View style={{}}>
        <Image
          source={require('../../assets/background_3.png')}
          style={{ position: 'absolute', zIndex: -10, left: -10, top: -200 }}
        />
        {loadingComplete ?
          <>
            {/* GUIDE LINES START */}
            {/* CROSS */}
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: windowHeight / 2 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: windowWidth / 2 }} /> */}

            {/* Char Left to Right */}
            {/* <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 40 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 252 }} /> */}

            {/* Char Top to Bottom */}
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 10 }} />
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 412 }} /> */}

            {/* Zone Box */}
            <View style={{ 
              // backgroundColor: 'rgba(0, 0, 0, 0.25)', 
              width: 1, 
              height: (364 + charHeight), 
              width: 212, 
              position: 'absolute', 
              zIndex: -5, 
              left: 40, 
              top: 10,
              borderRadius: 8,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(0, 255, 255, 0.50)' 
            }} />
             <View style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              width: 1, 
              height: windowHeight, 
              width: 212, 
              position: 'absolute', 
              zIndex: -5, 
              left: 40, 
            }} />



            {/* GUIDE LINES START */}
            <CharacterAndJoystick />
          </>
          :
          <View style={{ width: windowWidth, height: windowHeight }}>
            <ActivityIndicator size="large" color="#00ff00" style={{ position: 'absolute', top: windowHeight / 2 - 20, left: windowWidth / 2 - 20 }} />
          </View>
        }
      </View>
      <Navbar nav={props.nav} position={'absolute'} from={`${getTerm('game', props.lang, 'title')}`} language={props.lang} />

      {/* <View style={{ height: HeightRatio(40) }} /> */}
    </>
  );
}