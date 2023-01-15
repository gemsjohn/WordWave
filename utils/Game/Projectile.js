import React, { useState, useRef, useEffect, useLayoutEffect, useContext, useMemo } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isSpecialColliding_0, isSpecialColliding_1, isSpecialColliding_2, isSpecialColliding_3 } from './CollisionHandler';
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


export const Projectile = () => {
  // [USE CONTEXT API] - - - - - 
  const { sharedState, setSharedState } = useContext(SharedStateContext);

  // [WORDS AND LETTERS] - - - - - 
  const [randomWord, setRandomWord] = useState('')
  const [prevWrongElements, setPrevWrongElements] = useState(0);
  const [letterPocket, setLetterPocket] = useState([]);
  const [displayLetters, setDisplayLetters] = useState([])
  
  // [GAME LOGIC] - - - - - 
  const isGameInProgress = useRef(false);
  const [continuousEndGameCall, setContinuousEndGameCall] = useState(false)
  const [hasGameBeenStarted, setHasGameBeenStarted] = useState(false)
  const [displayPlaybutton, setDisplayPlaybutton] = useState(true)
  const crashes = useRef(0);
  const prevCrashes = useRef(0);
  const score = useRef(0);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  let timeoutCallGenerateID;

  // [LETTER ANIMATION] - - - - - 
  const hasUpdatedLetterBlock = useRef(false);
  const [yPos, setYPos] = useState(0);
  const [letter, setLetter] = useState('');
  const position = useRef(new Animated.Value(1000)).current;
  const animation = useRef(null)
  const count = new Animated.Value(0);
  const wordPlusSeven = useRef([])
  let timeoutId_a;

  // [OBSTACLE ANIMATION 0] - - - - - 
  const hasUpdatedObstacle_0 = useRef(false);
  const obstaclePosition_0 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacle_0 = useRef(null)
  let timeoutId_0;

  // [OBSTACLE ANIMATION 1] - - - - - 
  const hasUpdatedObstacle_1 = useRef(false);
  const obstaclePosition_1 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacle_1 = useRef(null)
  let timeoutId_1;

  // [OBSTACLE ANIMATION LARGE] - - - - - 
  const hasUpdatedObstacle_large = useRef(false);
  const obstaclePosition_large = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacle_large = useRef(null)
  let timeoutId_large;

  // [TESTING]



  useLayoutEffect(() => {
    isGameInProgress.current = false;
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

  const Generate = (localPrevCrashes) => {
    console.log("#1: Start Generate")
    setContinuousEndGameCall(false)
    clearTimeout(timeoutCallGenerateID);
    if (localPrevCrashes > 0) {
      crashes.current = localPrevCrashes;
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
      console.log("[STATUS - hasGameBeenStarted]  :: " + hasGameBeenStarted)
      console.log("[STATUS - isGameInProgress.current]  :: " + isGameInProgress.current)

      if (!hasGameBeenStarted) {
        if (isGameInProgress.current) {
          console.log("#4 About to run animations.")
          if (score.current >= 0) {
            letterAnimation();
            runObstacleAnimation_large();
          }
          if (score.current >= 1) {
            runObstacleAnimation_0();
          }
          if (score.current >= 2) {
            runObstacleAnimation_1();
          }

          setHasGameBeenStarted(true)
          setDisplayPlaybutton(false)
        }
      }
    }
  }, [wordPlusSeven.current])


  const letterAnimation = () => {
    // console.log("#5a Run Animation")
    if (isGameInProgress.current) {
      // console.log("#5b Letters Array: " + wordPlusSeven.current)
      hasUpdatedLetterBlock.current = false;
      setYPos(Math.floor(Math.random() * HeightRatio(670)))
      setLetter(wordPlusSeven.current[count._value]);
      position.setValue(WidthRatio(400));
      animation.current = Animated.timing(position, {
        toValue: -WidthRatio(40),
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
          // console.log("#5b Re-run")
          letterAnimation();
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
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_0.setValue({ x: WidthRatio(400), y: localYPos_0 });

      obstacle_0.current = Animated.parallel([
        Animated.timing(obstaclePosition_0.x, {
          toValue: -WidthRatio(40),
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
    // console.log("#7a Run Obstacle Animation")
    if (isGameInProgress.current) {
      hasUpdatedObstacle_1.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_1.setValue({ x: WidthRatio(400), y: localYPos_0 });

      obstacle_1.current = Animated.parallel([
        Animated.timing(obstaclePosition_1.x, {
          toValue: -WidthRatio(40),
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
          // console.log("#7b Re-run")
          runObstacleAnimation_1();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_large = () => {
    // console.log("#7a Run Obstacle Animation")
    if (isGameInProgress.current) {
      hasUpdatedObstacle_large.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_large.setValue({ x: WidthRatio(400), y: localYPos_0 });

      obstacle_large.current = Animated.parallel([
        Animated.timing(obstaclePosition_large.x, {
          toValue: -WidthRatio(40),
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
          // console.log("#7b Re-run")
          runObstacleAnimation_large();
        }, 200)
      });
    } else {
      return;
    }
  };


  const [obj1, setObj1] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0
  });
  const [specialDefense_0, setSpecialDefense_0] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [specialDefense_1, setSpecialDefense_1] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [specialDefense_2, setSpecialDefense_2] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [specialDefense_3, setSpecialDefense_3] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  const prevRetainSpecialDefense_0x = useRef(specialDefense_0.x);
  const prevRetainSpecialDefense_1x = useRef(specialDefense_1.x);
  const prevRetainSpecialDefense_2x = useRef(specialDefense_2.x);
  const prevRetainSpecialDefense_3x = useRef(specialDefense_3.x);

  useEffect(() => {
    let localSpecialDefense_0x;
    let localSpecialDefense_1x;
    let localSpecialDefense_2x;
    let localSpecialDefense_3x;

    // This function will be called on every animation frame
    const update = () => {
      setObj1({
        x: sharedState.current.charX + WidthRatio(64) + sharedState.current.charWidth / 2,
        y: sharedState.current.charY - sharedState.current.charHeight / 1.2,
        width: sharedState.current.charWidth,
        height: sharedState.current.charHeight / 2,
        radius: sharedState.current.charHeight / 2,
      });

      // Special Defense 0 Update
      if (prevRetainSpecialDefense_0x.current === 0 && sharedState.current.specialActive_0) {
        setSpecialDefense_0({
          x: sharedState.current.specialSizeLocation_0.x,
          y: sharedState.current.specialSizeLocation_0.y,
          width: sharedState.current.specialSizeLocation_0.height,
          height: sharedState.current.specialSizeLocation_0.width
        });
        localSpecialDefense_0x = sharedState.current.specialSizeLocation_0.x;

      } else if (prevRetainSpecialDefense_0x.current != 0 && !sharedState.current.specialActive_0) {
        localSpecialDefense_0x = 0;
        setSpecialDefense_0({
          x: 0,
          y: HeightRatio(125),
          width: sharedState.current.charWidth,
          height: sharedState.current.charWidth
        });
      }
      prevRetainSpecialDefense_0x.current = localSpecialDefense_0x;

      // Special Defense 1 Update
      if (prevRetainSpecialDefense_1x.current === 0 && sharedState.current.specialActive_1) {
        setSpecialDefense_1({
          x: sharedState.current.specialSizeLocation_1.x,
          y: sharedState.current.specialSizeLocation_1.y,
          width: sharedState.current.specialSizeLocation_1.height,
          height: sharedState.current.specialSizeLocation_1.width
        });
        localSpecialDefense_1x = sharedState.current.specialSizeLocation_1.x;

      } else if (prevRetainSpecialDefense_1x.current != 0 && !sharedState.current.specialActive_1) {
        localSpecialDefense_1x = 0;
        setSpecialDefense_1({
          x: 0,
          y: HeightRatio(245),
          width: sharedState.current.charWidth,
          height: sharedState.current.charWidth
        });
      }
      prevRetainSpecialDefense_1x.current = localSpecialDefense_1x;

      // Special Defense 2 Update
      if (prevRetainSpecialDefense_2x.current === 0 && sharedState.current.specialActive_2) {
        setSpecialDefense_2({
          x: sharedState.current.specialSizeLocation_2.x,
          y: sharedState.current.specialSizeLocation_2.y,
          width: sharedState.current.specialSizeLocation_2.height,
          height: sharedState.current.specialSizeLocation_2.width
        });
        localSpecialDefense_2x = sharedState.current.specialSizeLocation_2.x;

      } else if (prevRetainSpecialDefense_2x.current != 0 && !sharedState.current.specialActive_2) {
        localSpecialDefense_2x = 0;
        setSpecialDefense_2({
          x: 0,
          y: HeightRatio(365),
          width: sharedState.current.charWidth,
          height: sharedState.current.charWidth
        });
      }
      prevRetainSpecialDefense_2x.current = localSpecialDefense_2x;

      // Special Defense 3 Update
      if (prevRetainSpecialDefense_3x.current === 0 && sharedState.current.specialActive_3) {
        setSpecialDefense_3({
          x: sharedState.current.specialSizeLocation_3.x,
          y: sharedState.current.specialSizeLocation_3.y,
          width: sharedState.current.specialSizeLocation_3.height,
          height: sharedState.current.specialSizeLocation_3.width
        });
        localSpecialDefense_3x = sharedState.current.specialSizeLocation_3.x;

      } else if (prevRetainSpecialDefense_3x.current != 0 && !sharedState.current.specialActive_3) {
        localSpecialDefense_3x = 0;
        setSpecialDefense_3({
          x: 0,
          y: HeightRatio(485),
          width: sharedState.current.charWidth,
          height: sharedState.current.charWidth
        });
      }
      prevRetainSpecialDefense_3x.current = localSpecialDefense_3x;

      requestAnimationFrame(update);
    };

    update();

    // Return a function that cleans up the effect
    return () => {
      // No need to do anything here
    };
  }, [])

  useLayoutEffect(() => {
    const wordBlockListener = position.addListener((value) => {
      let obj2 = { x: value.value, y: yPos - WidthRatio(12), width: WidthRatio(24), height: WidthRatio(24) }

      if (isLetterBlockColliding(obj1, obj2)) {
        if (!hasUpdatedLetterBlock.current) {
          setLetterPocket(prevItems => [...prevItems, letter])
          hasUpdatedLetterBlock.current = true;
        }
      }
    });

    // Obstacle 0
    const obstacleListener_0 = obstaclePosition_0.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(10), width: WidthRatio(10), radius: WidthRatio(5) }

      if (isObstacleColliding_0(obj1, obj2)) {
        if (!hasUpdatedObstacle_0.current) {
          crashes.current += 1;
          hasUpdatedObstacle_0.current = true;
        }
        obstacle_0.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_0.current) {
          hasUpdatedObstacle_0.current = true;
        }
        obstacle_0.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_0.current) {
          hasUpdatedObstacle_0.current = true;
        }
        obstacle_0.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_0.current) {
          hasUpdatedObstacle_0.current = true;
        }
        obstacle_0.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_0.current) {
          hasUpdatedObstacle_0.current = true;
        }
        obstacle_0.current.reset()
      }
    });

    // Obstacle 1
    const obstacleListener_1 = obstaclePosition_1.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(10), width: WidthRatio(10), radius: WidthRatio(5) }

      if (isObstacleColliding_1(obj1, obj2)) {
        if (!hasUpdatedObstacle_1.current) {
          crashes.current += 1;
          hasUpdatedObstacle_1.current = true;
        }
        obstacle_1.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_1.current) {
          hasUpdatedObstacle_1.current = true;
        }
        obstacle_1.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_1.current) {
          hasUpdatedObstacle_1.current = true;
        }
        obstacle_1.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_1.current) {
          hasUpdatedObstacle_1.current = true;
        }
        obstacle_1.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_1.current) {
          hasUpdatedObstacle_1.current = true;
        }
        obstacle_1.current.reset()
      }
    });

    // Obstacle Large
    const obstacleListener_large = obstaclePosition_large.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(12), height: WidthRatio(24), width: WidthRatio(24) }

      if (isObstacleColliding_large(obj1, obj2)) {
        if (!hasUpdatedObstacle_large.current) {
          crashes.current += 1;
          hasUpdatedObstacle_large.current = true;
        }
        obstacle_large.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_large.current) {
          hasUpdatedObstacle_large.current = true;
        }
        obstacle_large.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_large.current) {
          hasUpdatedObstacle_large.current = true;
        }
        obstacle_large.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_large.current) {
          hasUpdatedObstacle_large.current = true;
        }
        obstacle_large.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_large.current) {
          hasUpdatedObstacle_large.current = true;
        }
        obstacle_large.current.reset()
      }
    });

    return () => {
      position.removeListener(wordBlockListener);
      obstaclePosition_0.removeListener(obstacleListener_0)
      obstaclePosition_1.removeListener(obstacleListener_1)
      obstaclePosition_large.removeListener(obstacleListener_large)
    }
  }, [obj1, specialDefense_0, specialDefense_1, specialDefense_2, specialDefense_3]);

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
    // console.log("COMPLETE")
    // console.log(input)
    setContinuousEndGameCall(true)
    isGameInProgress.current = false;
    if (input.local != "c") {
      if (score.current >= 0) {
        animation.current.stop();
        obstacle_large.current.stop();
      }
      if (score.current >= 1) { obstacle_0.current.stop(); }
      if (score.current >= 2) { obstacle_1.current.stop(); }
    }

    // [CLEAR/RESET] :: WORD, LETTERS, OBSTACLES, GAME LOGIC
    // - Letters
    setLetter('');
    setLetterPocket([]);
    setDisplayLetters([]);
    position.setValue(1000);
    setYPos(0)
    // -Word
    setRandomWord('');
    wordPlusSeven.current = [];
    // - Obstacles
    obstaclePosition_0.setValue({ x: 1000, y: 0 })
    obstaclePosition_1.setValue({ x: 1000, y: 0 })
    obstaclePosition_large.setValue({ x: 1000, y: 0 })
    // - Game Logic
    count.setValue(0)
    crashes.current = 0;
    prevCrashes.current = 0
    score.current = 0;
    hasUpdatedLetterBlock.current = false;
    hasUpdatedObstacle_0.current = false;
    hasUpdatedObstacle_1.current = false;
    hasUpdatedObstacle_large.current = false;

    // [HANDLE GAME RESTART]
    if (input.continue) {
      setHasGameBeenStarted(false);
      let localScore = input.score + 1;
      score.current = localScore;
      timeoutCallGenerateID = setTimeout(() => {
        Generate(input.crashes)
      }, 500)

    } else {

      if (input.local == "b") {
        setTimeout(() => {
          setHasGameBeenStarted(false);
          setGameOverModalVisible(true)
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
            style={{ 
              position: 'absolute', 
              left: windowWidth / 2 - 125, 
              top: windowHeight / 2 - 125, 
              zIndex: -5 
            }}
          >
            <Image
              source={require('../../assets/button_play.png')}
              style={{ height: 250, width: 250 }}
            />
          </TouchableOpacity>
          :
          <>
            {score.current > 0 ?
              <View style={{ 
                position: 'absolute', 
                top: windowHeight / 1.35, 
                left: WidthRatio(0), 
                zIndex: -7, padding: 
                HeightRatio(20), 
                borderRadius: HeightRatio(20) 
              }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  fontSize: HeightRatio(50), 
                  fontWeight: 'bold' 
                }}>Score: {score.current}</Text>
              </View>
              :
              <View style={{ 
                position: 'absolute', 
                top: windowHeight / 1.35, 
                left: WidthRatio(0), 
                zIndex: -7, 
                padding: HeightRatio(20), 
                borderRadius: HeightRatio(20) 
              }}>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  fontSize: HeightRatio(50), 
                  fontWeight: 'bold' 
                }}>Score: 0</Text>
              </View>
            }
          </>
        }

        {/* Letter Blocks */}
        <Animated.View
          style={[
            Styling.projectile_word_block,
            {
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
          <Image 
            source={require('../../assets/block_keyboard_key.png')} 
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />

        </Animated.View>

        {/* Obstacles */}
        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [{ translateX: obstaclePosition_0.x }, { translateY: obstaclePosition_0.y }],
            },
          ]}
        >
          <Image 
            source={require('../../assets/projectile_fire_ball_1.png')} 
            style={{ height: WidthRatio(10), width: WidthRatio(10) }} />
        </Animated.View>

        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [{ translateX: obstaclePosition_1.x }, { translateY: obstaclePosition_1.y }],
            },
          ]}
        >
          <Image 
            source={require('../../assets/projectile_fire_ball.png')} 
            style={{ height: WidthRatio(10), width: WidthRatio(10) }} />
        </Animated.View>

        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [{ translateX: obstaclePosition_large.x }, { translateY: obstaclePosition_large.y }],
            },
          ]}
        >
          <Image 
            source={require('../../assets/projectile_fire_ball.png')} 
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>

        {/* CHARACTER GUIDELINES */}
        {/* <View style={{borderWidth: 3, borderColor: 'red', height: windowHeight, position: 'absolute', left: obj1.x}} />
          <View style={{borderWidth: 3, borderColor: 'red', width: windowWidth, position: 'absolute', top: obj1.y}} /> */}
        {/* <View style={{borderWidth: 5, borderColor: 'blue', height: WidthRatio(12), width: WidthRatio(24), position: 'absolute', top: obj1.y+WidthRatio(6), left: obj1.x-WidthRatio(12)}} /> */}
        {/* <View style={{borderWidth: 3, borderColor: 'red', width: windowWidth, position: 'absolute', top: yPos + WidthRatio(12.5)}} /> */}



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
          visible={gameOverModalVisible}
          onRequestClose={() => {
            setGameOverModalVisible(!gameOverModalVisible);
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
                onPress={() => { setGameOverModalVisible(!gameOverModalVisible); setDisplayPlaybutton(true); }}
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