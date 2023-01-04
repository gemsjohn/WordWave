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
  TouchableOpacity
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
  let charHeight = 42;
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
              <Image source={require('../../assets/Char_0.png')} style={{ height: charHeight, width: charWidth }} />
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
    // Random Word
    const [randomWord, setRandomWord] = useState('')

    // Letter
    const letterRef = useRef(null);
    const [letter, setLetter] = useState('');
    const [letterPocket, setLetterPocket] = useState([]);
    const [displayLetters, setDisplayLetters] = useState([])
    const count = new Animated.Value(0);

    // Letter Array
    const [wordPlusSeven, setWordPlusSeven] = useState([]);

    // Letter Position
    const [letterInXRange, setLetterInXRange] = useState(false);
    const [letterInYRange, setLetterInYRange] = useState(false);
    const position = useRef(new Animated.Value(1000)).current;
    const [yPos, setYPos] = useState(0);

    // Obstacle Position
    const obstacle_0 = useRef(null)
    const obstaclePosition_0 = useRef(new Animated.Value(1000)).current;
    const [obstacleYPos_0, setObstacleYPos_0] = useState(0)
    const [obstacleInXRange_0, setObstacleInXRange_0] = useState(false);

    const obstacle_1 = useRef(null)
    const obstaclePosition_1 = useRef(new Animated.Value(1000)).current;
    const [obstacleYPos_1, setObstacleYPos_1] = useState(0)
    const [obstacleInXRange_1, setObstacleInXRange_1] = useState(false);

    // Game Logic
    let yCalibrated = 25;
    const crashes = useRef(0);
    const prevCrashes = useRef(0);
    const isGameInProgress = useRef(null)
    const animation = useRef(null)
    const score = useRef(0);

    // In Test
    const [displayRed, setDisplayRed] = useState(false)
    const [displayRed_1, setDisplayRed_1] = useState(false)
    const hasUpdatedLetterBlock = useRef(false);
    const hasUpdatedObstacle_0 = useRef(false);

    const Generate = () => {
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

      isGameInProgress.current = true;
      crashes.current = prevCrashes.current;
      setWordPlusSeven(scambledCombined)
      setRandomWord(word);
      setDisplayLetters(letters)
    }

    const runAnimation = () => {
      if (isGameInProgress.current === false) {
        return
      }
      hasUpdatedLetterBlock.current = false;
      setYPos(Math.floor(Math.random() * 310));
      setLetter(wordPlusSeven[count._value]);
      position.setValue(1000);
      animation.current = Animated.timing(position, {
        toValue: -80,
        duration: 4000,
        useNativeDriver: true,
      })
      if (isGameInProgress.current != false) {
        animation.current.start(() => {
          if (count._value >= wordPlusSeven.length - 1) {
            console.log("Restart wordPlusSeven")
            count.setValue(0)
          } else {
            count.setValue(count._value + 1)
          }

          setTimeout(() => {
            runAnimation();
          }, 200)


        });
      }
    };

    const runObstacleAnimation_0 = () => {
      if (isGameInProgress.current === false) {
        return
      }
      hasUpdatedObstacle_0.current = false;
      setObstacleYPos_0(Math.floor(Math.random() * 310));
      obstaclePosition_0.setValue(1000);
      obstacle_0.current = Animated.timing(obstaclePosition_0, {
        toValue: -80,
        duration: 2500,
        useNativeDriver: true,
      })
      if (isGameInProgress.current != false) {
        obstacle_0.current.start(() => {
          setTimeout(() => {
            runObstacleAnimation_0();
          }, 200)
        });
      }
    };

    const runObstacleAnimation_1 = () => {
      if (isGameInProgress.current === false) {
        return
      }

      setObstacleYPos_1(Math.floor(Math.random() * 310));
      obstaclePosition_1.setValue(1000);
      obstacle_1.current = Animated.timing(obstaclePosition_1, {
        toValue: -80,
        duration: 3000,
        useNativeDriver: true,
      })
      if (isGameInProgress.current != false) {
        obstacle_1.current.start(() => {
          setTimeout(() => {
            runObstacleAnimation_1();
          }, 200)
        });
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



    useEffect(() => {
      if (wordPlusSeven.length > 0) {
        runObstacleAnimation_0();
        runAnimation();
        // runObstacleAnimation_1();
      }
    }, [wordPlusSeven])


    let localCharXPos = props.charX - Math.trunc(windowWidth * 0.313);
    let localCharYPos = props.charY - Math.trunc(windowWidth * 0.011);

    const [obj1, setObj1] = useState({
      x: localCharXPos,
      y: localCharYPos,
      width: props.charWidth,
      height: props.charHeight
    });

    useEffect(() => {
      setObj1({
        x: localCharXPos,
        y: localCharYPos,
        width: props.charWidth,
        height: props.charHeight
      });
    }, [localCharXPos, localCharYPos, props.charWidth, props.charHeight]);

    useLayoutEffect(() => {
      const wordBlockListener = position.addListener((value) => {
        let obj2 = { x: value.value, y: yPos, width: 50, height: 50 }

        if (isLetterBlockColliding(obj1, obj2)) {
          setDisplayRed(true)
          if (!hasUpdatedLetterBlock.current) {
            setLetterPocket(prevItems => [...prevItems, letter])
            hasUpdatedLetterBlock.current = true;
          }
          
          animation.current.reset()
        } else {
          setDisplayRed(false)
        }
      });

      const obstacleListener_0 = obstaclePosition_0.addListener((value) => {
        let obj2 = { x: value.value, y: obstacleYPos_0, width: 50, height: 50 }

        if (isObstacleColliding_0(obj1, obj2)) {
          setDisplayRed_1(true)
          if (!hasUpdatedObstacle_0.current) {
            let setCrashNum = prevCrashes.current + crashes.current + 1;
            crashes.current = setCrashNum;
            hasUpdatedObstacle_0.current = true;
          }
          
          obstacle_0.current.reset()

          if (crashes.current >= 3) {
            endGame();
          }
        } else {
          setDisplayRed_1(false)
        }
      });

      return () => {
        position.removeListener(wordBlockListener);
        obstaclePosition_0.removeListener(obstacleListener_0)
      }
    }, [obj1]);


    // useEffect(() => {
    //     try {
    //       if (letterInXRange) {
    //         if (props.charY >= yPos - props.charHeight && props.charY <= yPos + 50) {
    //           setLetterPocket(prevItems => [...prevItems, letter])
    //           animation.current.reset()
    //         }
    //       }
    //     } catch {
    //       console.log("MISS")
    //     }
    // }, [letterInXRange])
    useEffect(() => {
      try {
        if (obstacleInXRange_0) {
          if (props.charY >= obstacleYPos_0 - props.charHeight && props.charY <= obstacleYPos_0 + 50) {
            console.log("TRUE!!!!!!!!!!!!!TRUE!!!!!!!!!!!!!!!!!TRUE")
            let setCrashNum = prevCrashes.current + crashes.current + 1;
            crashes.current = setCrashNum;
            obstacle_0.current.reset()
            if (crashes.current >= 3) {
              endGame();
            }
          }
        }
      } catch {
        console.log("MISS")
      }
    }, [obstacleInXRange_0])



    useEffect(() => {
      let uniqueLetterPocket = Array.from(new Set(letterPocket));
      let letters = randomWord.split('');
      let uniqueLetters = Array.from(new Set(letters));

      const similarElements = uniqueLetterPocket.filter((element) => letters.includes(element));
      const wrongElements = letterPocket.filter((element) => !letters.includes(element));

      // console.log("similarElements: " + similarElements)
      console.log("wrongElements: " + wrongElements)
      console.log("prev: " + prevCrashes.current)
      let setCrashNum = prevCrashes.current + wrongElements.length;
      crashes.current = setCrashNum;



      if (letterPocket.length > 0) {

        if (similarElements.length === uniqueLetters.length) {
          // console.log("YOU WIN")
          youWin(crashes.current)
        } else if (crashes.current >= 3) {
          // console.log("YOU LOOSE")
          endGame()
        }
      }

    }, [letterPocket])

    const getBackgroundColor = (input) => {
      let uniqueLetterPocket = Array.from(new Set(letterPocket));
      if (uniqueLetterPocket.includes(input)) {
        return '#43bccd';
      } else {
        return '#ffffff';
      }
    }

    const endGame = () => {
      console.log("stopped?")
      // Stop Game
      isGameInProgress.current = false
      animation.current.reset();
      // Clear Letters
      setLetter('');
      setLetterPocket([]);
      setDisplayLetters([]);
      // Clear Word
      setRandomWord('');
      setWordPlusSeven([]);
      // Clear Letter Position
      setLetterInXRange(false);
      position.setValue(1000);
      setYPos(0)
      // Clear Game Logic
      score.current = 0;
      // setCrashes(0)
      // setPrevCrashes(0)
      crashes.current = 0;
      prevCrashes.current = 0;

    }

    const youWin = (input) => {
      console.log("youWin")
      console.log("lives: " + input)
      // Stop Game
      isGameInProgress.current = false
      animation.current.reset();
      // Clear Letters
      setLetter('');
      setLetterPocket([]);
      setDisplayLetters([]);
      // Clear Word
      setRandomWord('');
      setWordPlusSeven([]);
      // Clear Letter Position
      setLetterInXRange(false);
      position.setValue(1000);
      setYPos(0)
      // Clear Game Logic
      crashes.current = 0;
      score.current = score.current + 1;

      setTimeout(() => {
        // setPrevCrashes(input)

        prevCrashes.current = input;
        // setCrashes(input);
        Generate();
      }, 200)

    }

    return (
      <View>
        <>

          {displayRed &&
            <View style={{ backgroundColor: 'blue', height: 30, width: 30, position: 'absolute', zIndex: -5, top: windowHeight / 2, left: windowWidth / 2 }} />
          }
          {displayRed_1 &&
            <View style={{ backgroundColor: 'red', height: 30, width: 30, position: 'absolute', zIndex: -5, top: windowHeight / 2, left: windowWidth / 2 }} />
          }

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

          {/* <TouchableOpacity onPress={() => {animation.stop(); isRunning.current = false;}} style={{ position: 'absolute', left: 450, top: -30 }}>
              <Image source={require('../../assets/pauseBTN.png')} style={{ height: 50, width: 50 }}></Image>
            </TouchableOpacity> */}

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
            <Text ref={letterRef} style={Styling.projectile_letter}>
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

          {/* <Animated.View
            style={[
              Styling.projectile_obstacle_block,
              {
                transform: [{ translateX: obstaclePosition_1 }, { translateY: obstacleYPos_1 + yCalibrated }],
              },
            ]}
          >
          </Animated.View> */}

          {/* <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', position: 'absolute', zIndex: -7, top: yPos, left: 12, height: 50, width: windowWidth}} >
            <Text style={{color: 'white'}}>{yPos}</Text>
          </View> */}

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
          source={require('../../assets/background_1.png')}
          style={{ position: 'absolute', zIndex: -10, left: -10, top: -200 }}
        />
        {loadingComplete ?
          <>
            {/* GUIDE LINES START */}
            {/* CROSS */}
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: windowHeight / 2 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: windowWidth / 2 }} />

            {/* Char Left to Right */}
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 40 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: 252 }} />

            {/* Char Top to Bottom */}
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 10 }} />
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: 412 }} />



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