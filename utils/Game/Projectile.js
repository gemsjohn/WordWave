import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isPowerColliding_0, isPowerColliding_1, isPowerColliding_2, isPowerColliding_3 } from './CollisionHandler';
import { MovementA, MovementB, MovementC, MovementD } from './ObstacleMovement';
import { SharedStateContext } from './Game';
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
  Alert,
  StyleSheet,
  TouchableOpacityBase
} from 'react-native';


export const Projectile = (props) => {
    // Letter
    // const letterRef = useRef(null);
    const [letter, setLetter] = useState('');
    const [letterPocket, setLetterPocket] = useState([]);
    const [displayLetters, setDisplayLetters] = useState([])
    const count = new Animated.Value(0);

    // Letter Array
    const [randomWord, setRandomWord] = useState('')
    const wordPlusSeven = useRef([])
    const [prevWrongElements, setPrevWrongElements] = useState(0);

    // Letter Position
    const animation = useRef(null)
    const position = useRef(new Animated.Value(1000)).current;
    const [yPos, setYPos] = useState(0);

    // Obstacle Position
    let timeoutId_0;
    let timeoutId_1;
    let timeoutId_large;


    const obstacle_0 = useRef(null)
    const hasUpdatedObstacle_0 = useRef(false);
    const obstaclePosition_0 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;

    const obstacle_1 = useRef(null)
    const hasUpdatedObstacle_1 = useRef(false);
    const obstaclePosition_1 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;

    const obstacle_large = useRef(null)
    const hasUpdatedObstacle_large = useRef(false);
    const obstaclePosition_large = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;

    // Collision Detection Variables
    let localCharXPos = useRef(props.charX - Math.trunc(windowWidth * 0.313));
    let localCharYPos = useRef(props.charY - Math.trunc(windowHeight * 0.022));

    // let localPowerup_0XPos = useRef(props.powerup_0.x);
    // let localPowerup_0YPos = useRef(props.powerup_0.y);
    // console.log(props.powerup_0)


    // Game Logic
    const crashes = useRef(0);
    const prevCrashes = useRef(0);
    const isGameInProgress = useRef(false);

    const score = useRef(0);
    const hasUpdatedLetterBlock = useRef(false);
    const [continuousEndGameCall, setContinuousEndGameCall] = useState(false)
    const [hasGameBeenStarted, setHasGameBeenStarted] = useState(false)
    const [displayPlaybutton, setDisplayPlaybutton] = useState(true)

    // Auxilliary
    let timeoutId_a;
    let timeoutId_b;
    const [modalVisible, setModalVisible] = useState(false);

    // In Test
    const { sharedState } = useContext(SharedStateContext);


    // useEffect(() => {
    //     if (sharedState.current) {
    //         console.log("Shared: ")
    //         console.log(sharedState.current)
    //     }
    //   }, [sharedState.current]);


    useLayoutEffect(() => {
      isGameInProgress.current = false;
      localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
      localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);

    //   localPowerup_0XPos.current = props.powerup_0.x;
    //   localPowerup_0YPos.current = props.powerup_0.y; 
    }, [])

    useEffect(() => {
      // This is the effect that should be cleaned up when the component is unmounted
      const timeoutId = setTimeout(() => {
        console.log("MOUNTED_INNER")
      }, 1000);

      // Return a function that cleans up the effect
      return () => {
        console.log("UNMOUNTED_INNER")
        endGame({ continue: false, local: "c", crashes: 0, score: 0 });
        clearTimeout(timeoutId);
      };
    }, []);

    const Generate = (prevC) => {
      console.log("#1: Start Generate")
      setContinuousEndGameCall(false)
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
            runObstacleAnimation_1();
            runObstacleAnimation_large();
            setHasGameBeenStarted(true)
            setDisplayPlaybutton(false)
          }
        }
      }
    }, [wordPlusSeven.current])


    const runAnimation = () => {
      console.log("#5a Run Animation")
      if (isGameInProgress.current) {
        // console.log("#5b Letters Array: " + wordPlusSeven.current)
        hasUpdatedLetterBlock.current = false;
        setYPos(Math.floor(Math.random() * 310))
        setLetter(wordPlusSeven.current[count._value]);
        position.setValue(1000);
        animation.current = Animated.timing(position, {
          toValue: -80,
          duration: 4000,
          useNativeDriver: true,
        })

        animation.current.start(() => {

          if (count._value >= wordPlusSeven.current.length - 1) {
            count.setValue(0)
          } else {
            count.setValue(count._value + 1)
          }

          animation.current.stop((value) => {
            position.setValue(value)

          })

          timeoutId_a = setTimeout(() => {
            console.log("#5b Re-run")
            runAnimation();
          }, 500)
        });
      } else {
        clearTimeout(timeoutId_a);
        return;
      }

    };


    const runObstacleAnimation_0 = () => {
      // console.log("#7a Run Obstacle Animation")
      if (isGameInProgress.current) {
        hasUpdatedObstacle_0.current = false;
        let localYPos_0 = Math.floor(Math.random() * windowHeight * 0.78);
        let localYPos_1 = Math.floor(Math.random() * windowHeight * 0.78);

        obstaclePosition_0.setValue({ x: 1000, y: localYPos_0 });

        obstacle_0.current = Animated.parallel([
          Animated.timing(obstaclePosition_0.x, {
            toValue: -80,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_0.y, {
            toValue: localYPos_1,
            duration: 3000,
            useNativeDriver: true,
          }),

        ]);

        obstacle_0.current.start(() => {
          if (timeoutId_0) {
            clearTimeout(timeoutId_0);
          }
          timeoutId_0 = setTimeout(() => {
            // console.log("#7b Re-run")
            runObstacleAnimation_0();
          }, 200)
        });
      } else {
        return;
      }
    };

    const runObstacleAnimation_1 = () => {
      console.log("#7a Run Obstacle Animation")
      if (isGameInProgress.current) {
        hasUpdatedObstacle_1.current = false;
        let localYPos_0 = Math.floor(Math.random() * windowHeight * 0.78);
        let localYPos_1 = Math.floor(Math.random() * windowHeight * 0.78);

        obstaclePosition_1.setValue({ x: 1000, y: localYPos_0 });

        obstacle_1.current = Animated.parallel([
          Animated.timing(obstaclePosition_1.x, {
            toValue: -80,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_1.y, {
            toValue: localYPos_1,
            duration: 2500,
            useNativeDriver: true,
          }),

        ]);

        obstacle_1.current.start(() => {
          if (timeoutId_1) {
            clearTimeout(timeoutId_1);
          }
          timeoutId_1 = setTimeout(() => {
            console.log("#7b Re-run")
            runObstacleAnimation_1();
          }, 200)
        });
      } else {
        return;
      }
    };

    const runObstacleAnimation_large = () => {
      console.log("#7a Run Obstacle Animation")
      if (isGameInProgress.current) {
        hasUpdatedObstacle_large.current = false;
        let localYPos_0 = Math.floor(Math.random() * windowHeight * 0.78);
        let localYPos_1 = Math.floor(Math.random() * windowHeight * 0.78);

        obstaclePosition_large.setValue({ x: 1000, y: localYPos_0 });

        obstacle_large.current = Animated.parallel([
          Animated.timing(obstaclePosition_large.x, {
            toValue: -80,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_large.y, {
            toValue: localYPos_1,
            duration: 5000,
            useNativeDriver: true,
          }),

        ]);

        obstacle_large.current.start(() => {
          if (timeoutId_large) {
            clearTimeout(timeoutId_large);
          }
          timeoutId_large = setTimeout(() => {
            console.log("#7b Re-run")
            runObstacleAnimation_large();
          }, 200)
        });
      } else {
        return;
      }
    };

    // CHARACTER Position
    localCharXPos.current = props.charX - Math.trunc(windowWidth * 0.313);
    localCharYPos.current = props.charY - Math.trunc(windowHeight * 0.022);

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
        const wordBlockListener = position.addListener((value) => {
          let obj2 = { x: value.value, y: yPos, width: 30, height: 30 }
  
          if (isLetterBlockColliding(obj1, obj2)) {
            if (!hasUpdatedLetterBlock.current) {
              setLetterPocket(prevItems => [...prevItems, letter])
              hasUpdatedLetterBlock.current = true;
            }
          }
        });
  
        // const obstacleListener_0 = obstaclePosition_0.addListener((value) => {
        //   let obj2 = { x: value.x, y: value.y, width: 0, height: 30 }
  
        //   if (isObstacleColliding_0(obj1, obj2)) {
        //     if (!hasUpdatedObstacle_0.current) {
        //       crashes.current += 1;
        //       hasUpdatedObstacle_0.current = true;
        //     }
        //     obstacle_0.current.reset()
        //   }
        // });
  
        // const obstacleListener_1 = obstaclePosition_1.addListener((value) => {
        //   let obj2 = { x: value.x, y: value.y, width: 30, height: 30 }
  
        //   if (isObstacleColliding_1(obj1, obj2)) {
        //     if (!hasUpdatedObstacle_1.current) {
        //       crashes.current += 1;
        //       hasUpdatedObstacle_1.current = true;
        //     }
        //     obstacle_1.current.reset()
        //   }
        // });
  
        const obstacleListener_large = obstaclePosition_large.addListener((value) => {
          let obj2 = { x: value.x, y: value.y, width: 80, height: 80 }
  
          if (isObstacleColliding_large(obj1, obj2)) {
            if (!hasUpdatedObstacle_large.current) {
              crashes.current += 1;
              hasUpdatedObstacle_large.current = true;
            }
            obstacle_large.current.reset()
          }
        });
  
        return () => {
          position.removeListener(wordBlockListener);
          // obstaclePosition_0.removeListener(obstacleListener_0)
          // obstaclePosition_1.removeListener(obstacleListener_1)
          obstaclePosition_large.removeListener(obstacleListener_large)
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

      if (!continuousEndGameCall) {
        if (letterPocket.length > 0 && similarElements.length === uniqueLetters.length) {
          // youWin(crashes.current)
          console.log("CURRENT SCORE:   " + score.current)
          endGame({ continue: true, local: "a", crashes: crashes.current, score: score.current });
        }
      }
      if (letterPocket.length > 0) {
        animation.current.reset()
      }

    }, [letterPocket])

    useEffect(() => {
      if (crashes.current >= 3) {
        setTimeout(() => {
          endGame({ continue: false, local: "b", crashes: 0, score: 0 });
        }, 200);

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
      setContinuousEndGameCall(true)
      // Stop Game
      isGameInProgress.current = false;
      if (input.local != "c") {
        animation.current.stop();
        obstacle_0.current.stop();
        obstacle_1.current.stop();
        obstacle_large.current.stop();

      }

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

      obstaclePosition_0.setValue({ x: 1000, y: 0 })
      // setObstacleYPos_0(0)

      obstaclePosition_1.setValue({ x: 1000, y: 0 })
      // setObstacleYPos_1(0)

      obstaclePosition_large.setValue({ x: 1000, y: 0 })


      // Clear Game Logic
      crashes.current = 0;
      prevCrashes.current = 0
      score.current = 0;
      hasUpdatedLetterBlock.current = false;
      hasUpdatedObstacle_0.current = false;
      hasUpdatedObstacle_1.current = false;
      hasUpdatedObstacle_large.current = false;




      if (input.continue) {
        setHasGameBeenStarted(false);
        let localScore = input.score + 1;
        console.log("LOCAL:   " + localScore)
        score.current = localScore;
        timeoutId_b = setTimeout(() => {
          Generate(input.crashes)
        }, 500)

      } else {

        if (input.local == "b") {
          setTimeout(() => {
            setHasGameBeenStarted(false);
            setModalVisible(true)
          }, 100);
        } else if (input.local == "c") {
          setHasGameBeenStarted(false);
        }
      }


    }


    return (
      <View>
        <>
          {displayPlaybutton ?
            <TouchableOpacity
              onPress={() => { Generate() }}
              style={{ position: 'absolute', left: windowWidth / 2 - 125, top: windowHeight / 2 - 125, zIndex: -5 }}
            >
              <Image
                source={require('../../assets/button_play.png')}
                style={{ height: 250, width: 250 }}
              />
            </TouchableOpacity>
            :
            <>
              {score.current > 0 ?
                <View style={{ position: 'absolute', top: windowHeight / 1.35, left: WidthRatio(0), zIndex: -7, padding: HeightRatio(20), borderRadius: HeightRatio(20) }}>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: HeightRatio(50), fontWeight: 'bold' }}>Score: {score.current}</Text>
                </View>
                :
                <View style={{ position: 'absolute', top: windowHeight / 1.35, left: WidthRatio(0), zIndex: -7, padding: HeightRatio(20), borderRadius: HeightRatio(20) }}>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: HeightRatio(50), fontWeight: 'bold' }}>Score: 0</Text>
                </View>
              }
            </>
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
            <Image source={require('../../assets/block_keyboard_key.png')} style={{ height: 50, width: 50 }} />

          </Animated.View>

          {/* Obstacles */}
          {/* <Animated.View
            style={[
              Styling.projectile_obstacle_block,
              {
                transform: [{ translateX: obstaclePosition_0.x }, { translateY: obstaclePosition_0.y }],
              },
            ]}
          >
            <Image source={require('../../assets/projectile_fire_ball_1.png')} style={{ height: 30, width: 30 }} />
          </Animated.View>

          <Animated.View
            style={[
              Styling.projectile_obstacle_block,
              {
                transform: [{ translateX: obstaclePosition_1.x }, { translateY: obstaclePosition_1.y }],
              },
            ]}
          >
            <Image source={require('../../assets/projectile_fire_ball.png')} style={{ height: 30, width: 30 }} />
          </Animated.View> */}

          <Animated.View
            style={[
              Styling.projectile_obstacle_block,
              {
                transform: [{ translateX: obstaclePosition_large.x }, { translateY: obstaclePosition_large.y }],
              },
            ]}
          >
            <Image source={require('../../assets/projectile_fire_ball.png')} style={{ height: 80, width: 80 }} />
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
            // visible={true}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
              isGameInProgress.current = false;
            }}
          >
            <View style={Styling.modal_centered_view}>
              <View style={Styling.modal_view}>
                <Text style={Styling.modal_text}>Game Over</Text>
                <View style={{ margin: HeightRatio(20) }}>
                  <Text style={Styling.modal_text_style}>Score</Text>
                  <Text style={Styling.modal_text_style}>Time</Text>
                  <Text style={Styling.modal_text_style}>Words</Text>
                </View>
                <TouchableOpacity
                  style={[Styling.modal_button]}
                  onPress={() => { setModalVisible(!modalVisible); setDisplayPlaybutton(true); }}
                >
                  <Text style={Styling.modal_text_style}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </>
      </View>
    );
  };