import React, { useState, useRef, useEffect, useLayoutEffect, useContext, useMemo } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import { MovementA, MovementB, MovementC, MovementD } from './ObstacleMovement';
import { SharedStateContext } from './Game';
import { resetActionHome, resetActionGame, resetActionProfile } from '../ResetActions';
import {
  isLetterBlockColliding,
  isObstacleColliding_0,
  isObstacleColliding_1,
  isObstacleColliding_large,
  isObstacleColliding_right_angle_0,
  isObstacleColliding_right_angle_1,
  isObstacleColliding_twins_0,
  isObstacleColliding_twins_0_divgergence,
  isObstacleColliding_twins_1,
  isObstacleColliding_twins_1_divgergence,
  isObstacleColliding_opacity_bot,
  isObstacleColliding_opacity_bot_divergence,
  isSpecialColliding_0,
  isSpecialColliding_1,
  isSpecialColliding_2,
  isSpecialColliding_3,
  isSpecialColliding_a_0,
  isSpecialColliding_a_1,
  isSpecialColliding_a_2,
  isSpecialColliding_a_3,
  isUpgradeToSpecial_0_Colliding
} from './CollisionHandler';
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
  TouchableOpacityBase,
  Easing
} from 'react-native';




export const Stage_3_Projectile = (props) => {
  // [USE CONTEXT API] - - - - - 
  const { sharedState, setSharedState } = useContext(SharedStateContext);

  // [WORDS AND LETTERS] - - - - - 
  const [randomWord, setRandomWord] = useState('')
  const [prevWrongElements, setPrevWrongElements] = useState(0);
  const [prevSimilarElements, setPrevSimilarElements] = useState(0);
  const [letterPocket, setLetterPocket] = useState([]);
  const [displayLetters, setDisplayLetters] = useState([])
  const [letterPositionNum, setLetterPositionNum] = useState(0)

  // [GAME LOGIC] - - - - - 
  const isGameInProgress = useRef(false);
  const [continuousEndGameCall, setContinuousEndGameCall] = useState(false)
  const [hasGameBeenStarted, setHasGameBeenStarted] = useState(false)
  const [displayPlaybutton, setDisplayPlaybutton] = useState(true)
  const crashes = useRef(sharedState.current.currentCrashes);
  const flashOouchOnCrash = useRef(false);
  const prevCrashes = useRef(0);
  const hideCrashesUntilUpdate = useRef(false);
  const skullPlaceholder = useRef(3)
  const skullMoneyPlaceholder = useRef(2)

  const score = useRef(sharedState.current.currentScore);
  const scoreFlash_100 = useRef(false);
  const scoreFlash_1000 = useRef(false);
  const level = useRef(0);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  let timeoutCallGenerateID;

  // [LETTER ANIMATION] - - - - - 
  const hasUpdatedLetterBlock = useRef(false);
  const [letter, setLetter] = useState('');
  const letterPosition = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current
  const animation = useRef(null)
  const count = new Animated.Value(0);
  const wordPlusSeven = useRef([])
  let timeoutLetter_ID;

  // [OBSTACLE ANIMATION 0] - - - - - 
  const hasUpdatedObstacle_0 = useRef(false);
  const obstaclePosition_0 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacleRotation_0 = useRef(new Animated.Value(0)).current;
  const obstacle_0 = useRef(null)
  let timeoutObstacle_0_ID;

  // [OBSTACLE ANIMATION 1] - - - - - 
  const hasUpdatedObstacle_1 = useRef(false);
  const obstaclePosition_1 = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacleRotation_1 = useRef(new Animated.Value(0)).current;
  const obstacle_1 = useRef(null)
  let timeoutObstacle_1_ID;

  // [OBSTACLE ANIMATION LARGE] - - - - - 
  const hasUpdatedObstacle_large = useRef(false);
  const obstaclePosition_large = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const obstacleRotation_large = useRef(new Animated.Value(0)).current;
  const obstacle_large = useRef(null)
  let timeoutObstacle_Large_ID;

  // [OBSTACLE ANIMATION RIGHT ANGLE 0] - - - - - 
  const hasUpdatedObstacle_right_angle_0 = useRef(false);
  const obstaclePosition_right_angle_0 = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleRotation_right_angle_0 = useRef(new Animated.Value(0)).current;
  const obstacle_right_angle_0 = useRef(null)
  let timeoutObstacle_right_angle_0_ID;

  // [OBSTACLE ANIMATION RIGHT ANGLE 1] - - - - - 
  const hasUpdatedObstacle_right_angle_1 = useRef(false);
  const obstaclePosition_right_angle_1 = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleRotation_right_angle_1 = useRef(new Animated.Value(0)).current;
  const obstacle_right_angle_1 = useRef(null)
  let timeoutObstacle_right_angle_1_ID;

  // [OBSTACLE ANIMATION OPACITY BOT] - - - - - 
  const hasUpdatedObstacle_opacity_bot = useRef(false);
  const obstaclePosition_opacity_bot = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstaclePosition_opacity_bot_divergence = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleOpacity_opacity_bot = useRef(new Animated.Value(0)).current;
  const obstacle_opacity_bot = useRef(null)
  let timeoutObstacle_opacity_bot_ID;


  // [OBSTACLE ANIMATION TWINS 0] - - - - - 
  const hasUpdatedObstacle_twins_0 = useRef(false);
  const obstaclePosition_twins_0 = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstaclePosition_twins_0_divergence = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleOpacity_twins_0 = useRef(new Animated.Value(0)).current;
  const obstacle_twins_0 = useRef(null)
  let timeoutObstacle_twins_0_ID;

  // [OBSTACLE ANIMATION TWINS 1] - - - - - 
  const hasUpdatedObstacle_twins_1 = useRef(false);
  const obstaclePosition_twins_1 = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstaclePosition_twins_1_divergence = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleOpacity_twins_1 = useRef(new Animated.Value(0)).current;
  const obstacle_twins_1 = useRef(null)
  let timeoutObstacle_twins_1_ID;
  const flip = useRef(false);

  // [UPGRADE TO SPECIAL 0 ANIMATION] - - - - - 
  const hasUpdatedUpgradeToSpecial_0 = useRef(false);
  const upgradeToSpecial_0_Position = useRef(new Animated.ValueXY({ x: 1000, y: 0 })).current;
  const upgradeToSpecial_0 = useRef(null)
  let timeoutUpgradeToSpecial_0_ID;
  const retainUpgradeToSpecial_0 = useRef(false);

  // [TESTING]
  const boxInterpolation_0 = obstacleRotation_0.interpolate({
    inputRange: [0, 5000],
    outputRange: ['360deg', '0deg']
  });
  const boxInterpolation_1 = obstacleRotation_1.interpolate({
    inputRange: [0, 5000],
    outputRange: ['360deg', '0deg']
  });
  const boxInterpolation_opacity_bot = obstacleOpacity_opacity_bot.interpolate({
    inputRange: [0, 1],
    outputRange: [0.0, 1.0]
  });
  const boxInterpolation_twins_0_a = obstacleOpacity_twins_0.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.0]
  });
  const boxInterpolation_twins_0_b = obstacleOpacity_twins_0.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.5]
  });
  const boxInterpolation_twins_1_a = obstacleOpacity_twins_1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.0]
  });
  const boxInterpolation_twins_1_b = obstacleOpacity_twins_1.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.5]
  });




  useLayoutEffect(() => {
    isGameInProgress.current = false;
    setSharedState({ upgradeToSpecial_0: false })
    setSharedState({ deployUpgradeToSpecialAnimation: false })
  }, [])

  useEffect(() => {
    // This is the effect that should be cleaned up when the component is unmounted
    const timeoutId = setTimeout(() => {
      console.log("MOUNTED_INNER")
    }, 1000);

    // Return a function that cleans up the effect
    return () => {
      console.log("UNMOUNTED_INNER")
      endGame({ continue: false, local: "c", crashes: 0, score: 0, level: 0 });
      clearTimeout(timeoutId);
    };
  }, []);

  const Generate = (localPrevCrashes) => {
    console.log("GENERATE")
    console.log("crashes.current = " + crashes.current)
    setContinuousEndGameCall(false)
    clearTimeout(timeoutCallGenerateID);
    if (localPrevCrashes > 0) {
      crashes.current = localPrevCrashes;
    }
    else {
      crashes.current = null;
    }

    console.log("Just before level.current <= 0");
    if (level.current <= 0) {
      console.log("STAGE 2 / currentCrashes: " + sharedState.current.currentCrashes)
      crashes.current += sharedState.current.currentCrashes
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
    setLetterPositionNum(letters.length)



    let combined = letters.concat(randomLetters);
    let uniqueCombined = [...new Set(combined)];
    let scambledCombined = shuffle(uniqueCombined);

    setDisplayPlaybutton(false)

    if (level.current > 0) {
      score.current += 1000;
      scoreFlash_1000.current = true;
      setTimeout(() => {
        scoreFlash_1000.current = false;
      }, 1000)
    }

    setRandomWord(word);
    setDisplayLetters(letters)

    wordPlusSeven.current = scambledCombined; // Must be last

    console.log("#2 Finish Generate")
  }

  useEffect(() => {

    if (wordPlusSeven.current.length > 0) {
      console.log("#3 Word Plus 7 useEffect")
      hideCrashesUntilUpdate.current = false;
      isGameInProgress.current = true;

      // [GAME LEVEL CONTROL]
      if (!hasGameBeenStarted) {
        if (isGameInProgress.current) {
          console.log("#4 About to run animations.")
          console.log("LEVEL: " + level.current)

          setTimeout(() => {
            if (level.current >= 0) {
              letterAnimation();
              runObstacleAnimation_opacity_bot()

            }

            if (level.current >= 1) {
              runObstacleAnimation_1();
              runObstacleAnimation_0();
            }

            // if (level.current >= 1) {
            //   runObstacleAnimation_twins_0();
            // } 

            // if (level.current >= 2) {
            //   runObstacleAnimation_right_angle_0();
            // }

            // if (level.current >= 3) {
            //   runObstacleAnimation_right_angle_1();
            // }

            setHasGameBeenStarted(true)
          }, 1500)
        }
      }
    }
  }, [wordPlusSeven.current])


  const letterAnimation = () => {
    if (isGameInProgress.current) {
      hasUpdatedLetterBlock.current = false;
      setLetter(wordPlusSeven.current[count._value]);
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      letterPosition.setValue({ x: WidthRatio(370), y: localYPos_0 })
      animation.current = Animated.parallel([
        Animated.timing(letterPosition.x, {
          toValue: -WidthRatio(40),
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(letterPosition.y, {
          toValue: localYPos_0,
          duration: 5000,
          useNativeDriver: true,
        })
      ]);

      animation.current.start(() => {

        if (count._value >= wordPlusSeven.current.length - 1) {
          count.setValue(0)
        } else {
          count.setValue(count._value + 1)
        }

        animation.current.stop((value) => {
          letterPosition.setValue(value)

        })

        timeoutLetter_ID = setTimeout(() => {
          letterAnimation();
        }, 500)
      });
    } else {
      clearTimeout(timeoutLetter_ID);
      return;
    }

  };


  const runObstacleAnimation_0 = () => {
    if (isGameInProgress.current && !flip.current) {
      hasUpdatedObstacle_0.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_0.setValue({ x: WidthRatio(370), y: localYPos_0 });
      obstacleRotation_0.setValue(0);

      obstacle_0.current = Animated.parallel([
        Animated.timing(obstaclePosition_0.x, {
          toValue: -WidthRatio(40),
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_0.y, {
          toValue: localYPos_1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(obstacleRotation_0, {
          toValue: 2000,
          duration: 2000,
          useNativeDriver: true
        })

      ]);

      obstacle_0.current.start(() => {
        if (timeoutObstacle_0_ID) {
          clearTimeout(timeoutObstacle_0_ID);
        }
        timeoutObstacle_0_ID = setTimeout(() => {
          runObstacleAnimation_0();
        }, 200)
      });
    } else {
      runObstacleAnimation_twins_1();
      return;
    }
  };

  const runObstacleAnimation_1 = () => {
    if (isGameInProgress.current && !flip.current) {
      flip.current = !flip.current;
      hasUpdatedObstacle_1.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_1.setValue({ x: WidthRatio(370), y: localYPos_0 });
      obstacleRotation_1.setValue(0);

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
        Animated.timing(obstacleRotation_1, {
          toValue: 3000,
          duration: 2500,
          useNativeDriver: true
        })

      ]);

      obstacle_1.current.start(() => {
        if (timeoutObstacle_1_ID) {
          clearTimeout(timeoutObstacle_1_ID);
        }
        timeoutObstacle_1_ID = setTimeout(() => {
          runObstacleAnimation_1();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_large = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_large.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_large.setValue({ x: WidthRatio(370), y: localYPos_0 });
      // obstacleRotation_large.setValue(0);

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
        if (timeoutObstacle_Large_ID) {
          clearTimeout(timeoutObstacle_Large_ID);
        }
        timeoutObstacle_Large_ID = setTimeout(() => {
          runObstacleAnimation_large();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_right_angle_0 = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_right_angle_0.current = false;
      let localXPos_0 = Math.floor(Math.random() * (WidthRatio(300) - WidthRatio(200))) + WidthRatio(200);
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_right_angle_0.setValue({ x: localXPos_0, y: -HeightRatio(100) });
      obstacle_right_angle_0.current = Animated.sequence([
        Animated.spring(obstaclePosition_right_angle_0.y, {
          toValue: localYPos_0,
          useNativeDriver: true,
          speed: 8,
          bounciness: 8
        }),
        Animated.timing(obstaclePosition_right_angle_0.x, {
          toValue: -WidthRatio(40),
          duration: 1000,
          useNativeDriver: true,
        }),

      ]);

      obstacle_right_angle_0.current.start(() => {
        if (timeoutObstacle_right_angle_0_ID) {
          clearTimeout(timeoutObstacle_right_angle_0_ID);
        }
        timeoutObstacle_right_angle_0_ID = setTimeout(() => {
          runObstacleAnimation_right_angle_0();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_right_angle_1 = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_right_angle_1.current = false;
      let localXPos_0 = Math.floor(Math.random() * (WidthRatio(300) - WidthRatio(200))) + WidthRatio(200);
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_right_angle_1.setValue({ x: localXPos_0, y: -HeightRatio(100) });
      // obstacleRotation_right_angle_1.setValue(0);

      obstacle_right_angle_1.current = Animated.sequence([
        Animated.spring(obstaclePosition_right_angle_1.y, {
          toValue: localYPos_0,
          useNativeDriver: true,
          // friction: 3,
          // tension: 40,
          speed: 8,
          bounciness: 8
        }),
        Animated.timing(obstaclePosition_right_angle_1.x, {
          toValue: -WidthRatio(40),
          duration: 1000,
          useNativeDriver: true,
        }),

      ]);

      obstacle_right_angle_1.current.start(() => {
        if (timeoutObstacle_right_angle_1_ID) {
          clearTimeout(timeoutObstacle_right_angle_1_ID);
        }
        timeoutObstacle_right_angle_1_ID = setTimeout(() => {
          runObstacleAnimation_right_angle_1();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_opacity_bot = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_opacity_bot.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_2 = Math.floor(Math.random() * HeightRatio(670));

      let localXPos_0 = Math.floor(Math.random() * (WidthRatio(225) - WidthRatio(150) + 1) + WidthRatio(150));
      let localXPos_1 = Math.floor(Math.random() * (WidthRatio(225) - WidthRatio(150) + 1) + WidthRatio(150));

      obstaclePosition_opacity_bot.setValue({ x: WidthRatio(370), y: localYPos_0 });
      obstaclePosition_opacity_bot_divergence.setValue({ x: WidthRatio(370), y: localYPos_0 });

      obstacleOpacity_opacity_bot.setValue(0);

      obstacle_opacity_bot.current = Animated.parallel([


        Animated.sequence([
          Animated.parallel([
            Animated.timing(obstaclePosition_opacity_bot.y, {
              toValue: localYPos_1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(obstaclePosition_opacity_bot_divergence.y, {
              toValue: localYPos_2,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(obstaclePosition_opacity_bot.x, {
              toValue: localXPos_0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(obstaclePosition_opacity_bot_divergence.x, {
              toValue: localXPos_1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(obstaclePosition_opacity_bot.y, {
              toValue: localYPos_0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(obstaclePosition_opacity_bot_divergence.y, {
              toValue: localYPos_0 + WidthRatio(24),
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(obstaclePosition_opacity_bot.x, {
              toValue: -WidthRatio(40),
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(obstaclePosition_opacity_bot_divergence.x, {
              toValue: -WidthRatio(40),
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),


        ]),
        Animated.sequence([

          Animated.timing(obstacleOpacity_opacity_bot, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_opacity_bot, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_opacity_bot, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_opacity_bot, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
        ])


      ]);

      obstacle_opacity_bot.current.start(() => {
        if (timeoutObstacle_opacity_bot_ID) {
          clearTimeout(timeoutObstacle_opacity_bot_ID);
        }
        timeoutObstacle_opacity_bot_ID = setTimeout(() => {
          runObstacleAnimation_opacity_bot();
        }, 200)
      });
    } else {
      return;
    }
  };

  const runObstacleAnimation_twins_0 = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_twins_0.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * (HeightRatio(770) - HeightRatio(-100) + 1)) + HeightRatio(-100);
      let localYPos_2 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_3 = Math.floor(Math.random() * (HeightRatio(770) - HeightRatio(-100) + 1)) + HeightRatio(-100);

      obstaclePosition_twins_0.setValue({ x: WidthRatio(370), y: localYPos_0 });
      obstaclePosition_twins_0_divergence.setValue({ x: WidthRatio(370), y: localYPos_2 });

      // obstacleRotation_twins_0.setValue(0);

      obstacle_twins_0.current = Animated.parallel([
        Animated.timing(obstaclePosition_twins_0.x, {
          toValue: -WidthRatio(40),
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_0.y, {
          toValue: localYPos_1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_0_divergence.x, {
          toValue: -WidthRatio(40),
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_0_divergence.y, {
          toValue: localYPos_3,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(obstacleOpacity_twins_0, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_0, {
            toValue: 0.5,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_0, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_0, {
            toValue: 0.5,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
        ]),


      ]),


        obstacle_twins_0.current.start(() => {
          if (timeoutObstacle_twins_0_ID) {
            clearTimeout(timeoutObstacle_twins_0_ID);
          }
          timeoutObstacle_twins_0_ID = setTimeout(() => {
            runObstacleAnimation_twins_0();
          }, 200)
        });
    } else {
      return;
    }
  };

  const runObstacleAnimation_twins_1 = () => {
    if (isGameInProgress.current) {
      flip.current = !flip.current;
      hasUpdatedObstacle_twins_1.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * (HeightRatio(770) - HeightRatio(-100) + 1)) + HeightRatio(-100);
      let localYPos_2 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_3 = Math.floor(Math.random() * (HeightRatio(770) - HeightRatio(-100) + 1)) + HeightRatio(-100);

      obstaclePosition_twins_1.setValue({ x: WidthRatio(370), y: localYPos_0 });
      obstaclePosition_twins_1_divergence.setValue({ x: WidthRatio(370), y: localYPos_2 });

      // obstacleRotation_twins_1.setValue(0);

      obstacle_twins_1.current = Animated.parallel([
        Animated.timing(obstaclePosition_twins_1.x, {
          toValue: -WidthRatio(40),
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_1.y, {
          toValue: localYPos_1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_1_divergence.x, {
          toValue: -WidthRatio(40),
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins_1_divergence.y, {
          toValue: localYPos_3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(obstacleOpacity_twins_1, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_1, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_1, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins_1, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
        ]),


      ]),


        obstacle_twins_1.current.start(() => {
          if (timeoutObstacle_twins_1_ID) {
            clearTimeout(timeoutObstacle_twins_1_ID);
          }
          timeoutObstacle_twins_1_ID = setTimeout(() => {

            if (flip.current) {
              runObstacleAnimation_twins_1();
            } else {
              runObstacleAnimation_0();
              runObstacleAnimation_1();
            }

          }, 200)
        });
    } else {
      return;
    }
  };





  const runUpgradeToSpecial_0 = () => {
    if (isGameInProgress.current && !retainUpgradeToSpecial_0.current) {
      hasUpdatedUpgradeToSpecial_0.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      upgradeToSpecial_0_Position.setValue({ x: WidthRatio(370), y: localYPos_0 });

      upgradeToSpecial_0.current = Animated.parallel([
        Animated.timing(upgradeToSpecial_0_Position.x, {
          toValue: -WidthRatio(40),
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(upgradeToSpecial_0_Position.y, {
          toValue: localYPos_1,
          duration: 8000,
          useNativeDriver: true,
        }),

      ]);

      upgradeToSpecial_0.current.start(() => {
        if (timeoutUpgradeToSpecial_0_ID) {
          clearTimeout(timeoutUpgradeToSpecial_0_ID);
        }
        timeoutUpgradeToSpecial_0_ID = setTimeout(() => {
          runUpgradeToSpecial_0();
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
  const deployUpgradeToSpecialAnimation = useRef(null);

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

      if (deployUpgradeToSpecialAnimation.current != sharedState.current.deployUpgradeToSpecialAnimation) {
        deployUpgradeToSpecialAnimation.current = !deployUpgradeToSpecialAnimation.current
        // console.log("- - - - -  -")
        // console.log(sharedState.current.deployUpgradeToSpecialAnimation)
        if (sharedState.current.deployUpgradeToSpecialAnimation) {
          setSharedState({ upgradeToSpecial_0: false })
          retainUpgradeToSpecial_0.current = false;
          runUpgradeToSpecial_0();
        }
      }



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
    const wordBlockListener = letterPosition.addListener((value) => {
      let obj2 = { x: value.x, y: value.y - WidthRatio(12), width: WidthRatio(24), height: WidthRatio(24) }

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
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
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
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
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
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
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

    // Obstacle Right Angle 0
    const obstacleListener_right_angle_0 = obstaclePosition_right_angle_0.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_right_angle_0(obj1, obj2)) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          crashes.current += 1;
          hasUpdatedObstacle_right_angle_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_right_angle_0.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          hasUpdatedObstacle_right_angle_0.current = true;
        }
        obstacle_right_angle_0.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          hasUpdatedObstacle_right_angle_0.current = true;
        }
        obstacle_right_angle_0.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          hasUpdatedObstacle_right_angle_0.current = true;
        }
        obstacle_right_angle_0.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          hasUpdatedObstacle_right_angle_0.current = true;
        }
        obstacle_right_angle_0.current.reset()
      }
    });

    // Obstacle Right Angle 1
    const obstacleListener_right_angle_1 = obstaclePosition_right_angle_1.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_right_angle_1(obj1, obj2)) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          crashes.current += 1;
          hasUpdatedObstacle_right_angle_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_right_angle_1.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          hasUpdatedObstacle_right_angle_1.current = true;
        }
        obstacle_right_angle_1.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          hasUpdatedObstacle_right_angle_1.current = true;
        }
        obstacle_right_angle_1.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          hasUpdatedObstacle_right_angle_1.current = true;
        }
        obstacle_right_angle_1.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          hasUpdatedObstacle_right_angle_1.current = true;
        }
        obstacle_right_angle_1.current.reset()
      }
    });

    // Obstacle Right Twins 0
    const obstacleListener_twins_0 = obstaclePosition_twins_0.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }
      let obj3 = { x: value.x, y: value.y + WidthRatio(24), radius: WidthRatio(7.5), height: WidthRatio(24), width: WidthRatio(24) }

      if (isObstacleColliding_twins_0(obj1, obj2, obj3)) {
        if (!hasUpdatedObstacle_twins_0.current) {
          crashes.current += 1;
          hasUpdatedObstacle_twins_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }
    });
    // Obstacle Right Twins Divergence 0
    const obstacleListener_twins_0_divergence = obstaclePosition_twins_0_divergence.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_twins_0_divgergence(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_0.current) {
          crashes.current += 1;
          hasUpdatedObstacle_twins_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_a_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_a_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_a_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }

      if (isSpecialColliding_a_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_twins_0.current) {
          hasUpdatedObstacle_twins_0.current = true;
        }
        obstacle_twins_0.current.reset()
      }
    });

    // Obstacle Right Twins 1
    const obstacleListener_twins_1 = obstaclePosition_twins_1.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_twins_1(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_1.current) {
          crashes.current += 1;
          hasUpdatedObstacle_twins_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }
    });
    // Obstacle Right Twins 1 Divergence
    const obstacleListener_twins_1_divergence = obstaclePosition_twins_1_divergence.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(7.5), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_twins_1_divgergence(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_1.current) {
          crashes.current += 1;
          hasUpdatedObstacle_twins_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_a_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_a_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_a_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }

      if (isSpecialColliding_a_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_twins_1.current) {
          hasUpdatedObstacle_twins_1.current = true;
        }
        obstacle_twins_1.current.reset()
      }
    });

    // Obstacle Opacity Bot
    const obstacleListener_opacity_bot = obstaclePosition_opacity_bot.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(12), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_opacity_bot(obj1, obj2)) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          crashes.current += 1;
          hasUpdatedObstacle_opacity_bot.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }
    });

    // Obstacle Opacity Bot Divergence
    const obstacleListener_opacity_bot_divergence = obstaclePosition_opacity_bot_divergence.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, radius: WidthRatio(12), height: WidthRatio(15), width: WidthRatio(24) }

      if (isObstacleColliding_opacity_bot_divergence(obj1, obj2)) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          crashes.current += 1;
          hasUpdatedObstacle_opacity_bot.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_0(specialDefense_0, obj2) && specialDefense_0.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_1(specialDefense_1, obj2) && specialDefense_1.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_2(specialDefense_2, obj2) && specialDefense_2.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }

      if (isSpecialColliding_3(specialDefense_3, obj2) && specialDefense_3.x != 0) {
        if (!hasUpdatedObstacle_opacity_bot.current) {
          hasUpdatedObstacle_opacity_bot.current = true;
        }
        obstacle_opacity_bot.current.reset()
      }
    });

    const upgradeToSpecial_0Listener = upgradeToSpecial_0_Position.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, width: WidthRatio(24), height: WidthRatio(24) }

      if (isUpgradeToSpecial_0_Colliding(obj1, obj2)) {
        // console.log("UPGRADE COLLISION!!!!!!")
        if (!hasUpdatedUpgradeToSpecial_0.current) {
          retainUpgradeToSpecial_0.current = true;
          setSharedState({ upgradeToSpecial_0: true })
          hasUpdatedUpgradeToSpecial_0.current = true;
        }
        upgradeToSpecial_0.current.reset();
      }
    });

    return () => {
      letterPosition.removeListener(wordBlockListener);
      obstaclePosition_0.removeListener(obstacleListener_0);
      obstaclePosition_1.removeListener(obstacleListener_1);
      obstaclePosition_large.removeListener(obstacleListener_large);
      obstaclePosition_right_angle_0.removeListener(obstacleListener_right_angle_0);
      obstaclePosition_right_angle_1.removeListener(obstacleListener_right_angle_1)
      obstaclePosition_twins_0.removeListener(obstacleListener_twins_0);
      obstaclePosition_twins_0_divergence.removeListener(obstacleListener_twins_0_divergence)

      obstaclePosition_twins_1.removeListener(obstacleListener_twins_1);
      obstaclePosition_twins_1_divergence.removeListener(obstacleListener_twins_1_divergence)

      obstaclePosition_opacity_bot.removeListener(obstacleListener_opacity_bot);
      obstaclePosition_opacity_bot_divergence.removeListener(obstacleListener_opacity_bot_divergence);


      upgradeToSpecial_0_Position.removeListener(upgradeToSpecial_0Listener);
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
      flashOouchOnCrash.current = true;
      setTimeout(() => {
        flashOouchOnCrash.current = false;
      }, 500)
    }
    console.log(similarElements)
    if (similarElements.length > prevSimilarElements) {
      score.current += 100;
      scoreFlash_100.current = true;
    }
    setPrevSimilarElements(similarElements.length)
    setPrevWrongElements(wrongElements.length)
    setTimeout(() => {
      scoreFlash_100.current = false;
    }, 500)

    if (!continuousEndGameCall) {
      if (letterPocket.length > 0 && similarElements.length === uniqueLetters.length) {
        // youWin(crashes.current)
        console.log("CURRENT LEVEL:   " + level.current)
        console.log("CURRENT CRASHES:   " + crashes.current)

        endGame({
          continue: true,
          local: "a",
          crashes: crashes.current,
          score: score.current,
          level: level.current
        });
      }
    }
    if (letterPocket.length > 0) {
      animation.current.reset()
    }

  }, [letterPocket])

  useEffect(() => {
    setTimeout(() => {
      if (crashes.current >= 3 && !hideCrashesUntilUpdate.current) {
        endGame({ continue: false, local: "b", crashes: 0, score: 0, level: 0 });
      }
    }, 200);
  }, [crashes.current])

  const getBackgroundColor = (input) => {
    let uniqueLetterPocket = Array.from(new Set(letterPocket));
    if (uniqueLetterPocket.includes(input)) {
      return 'rgba(67, 188, 205, 0.65)';
    } else {
      return 'rgba(255, 255, 255, 0.65)';
    }
  }

  // [END GAME] 
  // input.local "a" represents a continuance of gameplay
  // input.local "b" represents a loss of game
  // input.local "c" represents the user navigating away from the game
  const endGame = (input) => {
    hideCrashesUntilUpdate.current = true;
    setContinuousEndGameCall(true)
    isGameInProgress.current = false;
    // if (input.local != "c") {
    if (level.current >= 0) {
      animation.current.stop();
      obstacle_opacity_bot.current.stop();
      letterPosition.setValue({ x: 1000, y: 0 })
      obstaclePosition_opacity_bot.setValue({ x: 1000, y: 0 })
      obstaclePosition_opacity_bot_divergence.setValue({ x: 1000, y: 0 })

      // if (obstacle_0.current != null) {
      //   obstacle_0.current.stop();

      //   obstaclePosition_0.setValue({ x: 1000, y: 0 })
      // }
      // if (obstacle_1.current != null) {
      //   obstacle_1.current.stop();

      //   obstaclePosition_1.setValue({ x: 1000, y: 0 })
      // }
    }


    if (level.current >= 1 && obstacle_0.current != null && obstacle_1.current != null) {
      obstacle_0.current.stop();
      obstacle_1.current.stop();

      obstaclePosition_0.setValue({ x: 1000, y: 0 })
      obstaclePosition_1.setValue({ x: 1000, y: 0 })
    }
    if (level.current >= 1 && obstacle_twins_1.current != null) {
      obstacle_twins_1.current.stop();

      obstaclePosition_twins_1.setValue({ x: 1000, y: 0 })
      obstaclePosition_twins_1_divergence.setValue({ x: 1000, y: 0 })

    }

    // if (level.current >= 2 && obstacle_right_angle_0.current != null) { 
    //   obstacle_right_angle_0.current.stop();

    //   obstaclePosition_right_angle_0.setValue({ x: 1000, y: 0 })
    // }

    // if (level.current >= 3 && obstacle_right_angle_1.current != null) { 
    //   obstacle_right_angle_1.current.stop();

    //   obstaclePosition_right_angle_1.setValue({ x: 1000, y: 0 })
    // }
    // }

    // [CLEAR/RESET] :: WORD, LETTERS, OBSTACLES, GAME LOGIC
    // - Letters
    setLetter('');
    setLetterPocket([]);
    setDisplayLetters([]);
    letterPosition.setValue({ x: 1000, y: 0 });
    // -Word
    setRandomWord('');
    wordPlusSeven.current = [];
    // - Game Logic
    count.setValue(0)
    // crashes.current = 0;
    // prevCrashes.current = 0
    level.current = 0;
    hasUpdatedLetterBlock.current = false;
    hasUpdatedObstacle_0.current = false;
    hasUpdatedObstacle_1.current = false;
    hasUpdatedObstacle_large.current = false;

    // [HANDLE GAME RESTART]
    if (input.continue) {
      console.log("- - - - - - ")
      console.log("GAME ---> Continue")
      console.log("- - - - - - ")

      setHasGameBeenStarted(false);
      let localLevel = input.level + 1;
      level.current = localLevel;
      setLetterPocket([]);
      setDisplayLetters([]);
      timeoutCallGenerateID = setTimeout(() => {



        Generate(input.crashes)
      }, 500)

    } else {

      if (input.local == "b" && crashes.current >= 3) {
        console.log("- - - - - - ")
        console.log("GAME ---> Over")
        console.log("- - - - - - ")
        setTimeout(() => {
          setHasGameBeenStarted(false);
          setGameOverModalVisible(true)
          setSharedState({ upgradeToSpecial_0: false })

        }, 100);
      } else if (input.local == "c") {
        console.log("- - - - - - ")
        console.log("GAME ---> Away")
        console.log("- - - - - - ")
        setHasGameBeenStarted(false);
        setSharedState({ upgradeToSpecial_0: false })
      }
    }
  }


  return (
    <View>
      <>
        {displayPlaybutton ?
          <>
            <TouchableOpacity
              onPress={() => { Generate() }}
              style={{
                position: 'absolute',
                zIndex: 15,
                left: windowWidth / 2 - HeightRatio(450),
                top: windowHeight / 2 - HeightRatio(450),
                zIndex: -5
              }}
            >
              <Image
                source={require('../../assets/stage_transition_3.png')}
                style={{ height: HeightRatio(900), width: HeightRatio(900) }}
              />
            </TouchableOpacity>
          </>
          :
          <>
            {score.current > 0 ?
              <>
                <View style={{
                  position: 'absolute',
                  top: windowHeight - HeightRatio(160),
                  left: WidthRatio(10),
                  zIndex: -7, padding:
                    HeightRatio(20),
                  borderRadius: HeightRatio(20)
                }}>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: HeightRatio(40),
                    fontWeight: 'bold'
                  }}>Score:</Text>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 1.0)',
                    fontSize: HeightRatio(70),
                    fontWeight: 'bold'
                  }}>{score.current}</Text>
                </View>
                {scoreFlash_100.current &&
                  <View style={{
                    position: 'absolute',
                    top: windowHeight / 2 - WidthRatio(30),
                    left: windowWidth / 2 - WidthRatio(30),
                    zIndex: -7,
                    padding: HeightRatio(20),
                    borderRadius: HeightRatio(20)
                  }} >
                    <Image
                      source={require('../../assets/reward_100_points.png')}
                      style={{ height: WidthRatio(60), width: WidthRatio(60) }} />
                  </View>
                }
                {scoreFlash_1000.current &&
                  <View style={{
                    position: 'absolute',
                    top: windowHeight / 2 - HeightRatio(300),
                    left: windowWidth / 2 - HeightRatio(300),
                    zIndex: -7,
                    padding: HeightRatio(20),
                    borderRadius: HeightRatio(20)
                  }} >
                    <Image
                      source={require('../../assets/reward_1000_points_0.png')}
                      style={{ height: HeightRatio(600), width: HeightRatio(600) }} />
                  </View>
                }
              </>
              :
              <>
                <View style={{
                  position: 'absolute',
                  top: windowHeight - HeightRatio(160),
                  left: WidthRatio(10),
                  zIndex: -7,
                  padding: HeightRatio(20),
                  borderRadius: HeightRatio(20)
                }}>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 1.0)',
                    fontSize: HeightRatio(40),
                    fontWeight: 'bold'
                  }}>Score:</Text>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 1.0)',
                    fontSize: HeightRatio(70),
                    fontWeight: 'bold'
                  }}>0</Text>
                </View>

              </>
            }
          </>
        }

        {/* Letter Blocks */}
        <Animated.View
          style={[
            Styling.projectile_word_block,
            {
              transform: [
                { translateX: letterPosition.x },
                { translateY: letterPosition.y }
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
              transform: [
                { translateX: obstaclePosition_0.x },
                { translateY: obstaclePosition_0.y },
                { rotate: boxInterpolation_0 }],
            },
          ]}
        >
          <Image
            source={require('../../assets/projectile_asteroid_2.png')}
            style={{ height: WidthRatio(10), width: WidthRatio(10) }} />
        </Animated.View>

        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [
                { translateX: obstaclePosition_1.x },
                { translateY: obstaclePosition_1.y },
                { rotate: boxInterpolation_1 }],
            },
          ]}
        >
          <Image
            source={require('../../assets/projectile_asteroid_2.png')}
            style={{ height: WidthRatio(10), width: WidthRatio(10) }} />
        </Animated.View>

        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_large.x },
              { translateY: obstaclePosition_large.y },
              // { rotate: boxInterpolation_large } 
            ],

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_2.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>

        {/* Right Angle 0 & 1 */}
        <Animated.View
          style={[Styling.projectile_obstacle_block,
          { width: WidthRatio(24), height: WidthRatio(24), },
          {
            transform: [
              { translateX: obstaclePosition_right_angle_0.x },
              { translateY: obstaclePosition_right_angle_0.y },
              // { rotate: boxInterpolation_large } 
            ],
          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_red_ufo.png')}
            style={{ height: WidthRatio(15), width: WidthRatio(24) }} />
        </Animated.View>
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_right_angle_1.x },
              { translateY: obstaclePosition_right_angle_1.y },
              // { rotate: boxInterpolation_large } 
            ],

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_red_ufo.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>

        {/* Opacity Bot */}
        {/* - - - - - - - - - - */}
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_opacity_bot.x },
              { translateY: obstaclePosition_opacity_bot.y }
              // { rotate: boxInterpolation_opacity_bot } 
            ],
            opacity: boxInterpolation_opacity_bot,

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_3.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_opacity_bot_divergence.x },
              { translateY: obstaclePosition_opacity_bot_divergence.y }
              // { rotate: boxInterpolation_opacity_bot } 
            ],
            opacity: boxInterpolation_opacity_bot,

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_3.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        {/* - - - - - - - - - - */}

        {/* Twins */}
        {/* - - - - - - - - - - */}
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_twins_0.x },
              { translateY: obstaclePosition_twins_0.y }
              // { rotate: boxInterpolation_twins_0 } 
            ],
            opacity: boxInterpolation_twins_0_a,

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_twins_0_divergence.x },
              { translateY: obstaclePosition_twins_0_divergence.y }
              // { rotate: boxInterpolation_twins_0 } 
            ],
            opacity: boxInterpolation_twins_0_b,
          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>

        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_twins_1.x },
              { translateY: obstaclePosition_twins_1.y }
              // { rotate: boxInterpolation_twins_1 } 
            ],
            opacity: boxInterpolation_twins_1_a,

          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        <Animated.View
          style={[Styling.projectile_obstacle_block, {
            transform: [
              { translateX: obstaclePosition_twins_1_divergence.x },
              { translateY: obstaclePosition_twins_1_divergence.y }
              // { rotate: boxInterpolation_twins_1 } 
            ],
            opacity: boxInterpolation_twins_1_b,
          },
          ]}
        >
          <Image
            source={require('../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        {/* - - - - - - - - - - */}


        {/* Upgrade To Special 0 */}
        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [{ translateX: upgradeToSpecial_0_Position.x }, { translateY: upgradeToSpecial_0_Position.y }],
            },
          ]}
        >
          <Image
            source={require('../../assets/upgrade_to_special_1.png')}  ///upgrade_to_special_0.png
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
        </Animated.View>
        {/* CHARACTER GUIDELINES */}
        {/* <View style={{borderWidth: 3, borderColor: 'red', height: windowHeight, position: 'absolute', left: obj1.x}} />
          <View style={{borderWidth: 3, borderColor: 'red', width: windowWidth, position: 'absolute', top: obj1.y}} /> */}
        {/* <View style={{borderWidth: 5, borderColor: 'blue', height: WidthRatio(12), width: WidthRatio(24), position: 'absolute', top: obj1.y+WidthRatio(6), left: obj1.x-WidthRatio(12)}} /> */}
        {/* <View style={{borderWidth: 3, borderColor: 'red', width: windowWidth, position: 'absolute', top: yPos + WidthRatio(12.5)}} /> */}


        <View style={{ borderWidth: 3, borderColor: 'red', height: windowHeight, position: 'absolute', left: WidthRatio(-10) }} />
        {displayLetters.map((l, i) => (
          <View style={{
            width: 60, position: 'absolute', top: 10, left: WidthRatio((50 - ((((letterPositionNum * 65) / windowWidth) * 100) / 2)) * 3.7) + ((i * 65)),
            height: 60,
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

        {crashes.current > 0 && !hideCrashesUntilUpdate.current &&
          <>
            {Array.from(Array(crashes.current).keys()).map((n, i) => (
              <View style={{
                width: 40, position: 'absolute', zIndex: 0, top: windowHeight - 50, left: (windowWidth / 2 + WidthRatio(60) + (i * 50)),
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
        }
        {flashOouchOnCrash.current && !hideCrashesUntilUpdate.current &&
          <View style={{
            position: 'absolute',
            top: windowHeight / 2 - WidthRatio(30),
            left: windowWidth / 2 - WidthRatio(30),
            zIndex: -7,
            padding: HeightRatio(20),
            borderRadius: HeightRatio(20)
          }} >
            <Image
              source={require('../../assets/warning_oouch.png')}
              style={{ height: WidthRatio(60), width: WidthRatio(60) }} />
          </View>
        }


        {/* SKULLS */}
        {Array.from(Array(skullPlaceholder.current).keys()).map((n, i) => (
          <View style={{
            width: 40, position: 'absolute', zIndex: -1, top: windowHeight - 50, left: (windowWidth / 2 + WidthRatio(60) + (i * 50)),
            height: 40,
            borderRadius: 10,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
          }}
            key={i}
          >
            <Image source={require('../../assets/skull_0.png')} style={{ height: 50, width: 50, opacity: 0.4 }} />
          </View>
        ))}

        {/* SKULL MONEY */}
        {Array.from(Array(skullMoneyPlaceholder.current).keys()).map((n, i) => (
          <View style={{
            width: 40, position: 'absolute', zIndex: -1, top: windowHeight - 50, left: (windowWidth / 2 + WidthRatio(70) + ((i + 3) * 50)),
            height: 40,
            borderRadius: 10,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
          }}
            key={i}
          >
            <Image source={require('../../assets/skull_money.png')} style={{ height: 50, width: 50, opacity: 0.4 }} />
          </View>
        ))}

        <Modal
          animationType="slide"
          transparent={true}
          visible={gameOverModalVisible}
          onRequestClose={() => {
            setSharedState({
              stage1: true,
              stage2: false,
              stage3: false,
              currentScore: 0,
              currentLevel: 0,
              currentCrashes: 0
            })
            setTimeout(() => {
              setGameOverModalVisible(!gameOverModalVisible);
              isGameInProgress.current = false;
            }, 500)
          }}
        >
          <View style={{ ...Styling.modal_centered_view }}>
            <TouchableOpacity
              style={{ top: HeightRatio(-40) }}
              onPress={() => { 
                props.nav.dispatch(resetActionHome);
              }}
            >
              <View style={{
                // margin: HeightRatio(20), 
                position: 'absolute',
                zIndex: 15,
                top: windowHeight / 2 - HeightRatio(30),
                left: windowWidth / 2 - WidthRatio(100)
              }}
              >
                <Text style={Styling.modal_text_style}>Score: {score.current}</Text>
                <Text style={Styling.modal_text_style}>Level:</Text>
                <Text style={Styling.modal_text_style}>Time:</Text>
                <Text style={Styling.modal_text_style}>Words:</Text>
              </View>
              <Image
                source={require('../../assets/game_over.png')}
                style={{ height: HeightRatio(1000), width: HeightRatio(940) }} />
            </TouchableOpacity>
          </View>
        </Modal>

      </>
    </View>
  );
};