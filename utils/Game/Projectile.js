import React, { useState, useRef, useEffect, useLayoutEffect, useContext, useMemo } from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Styling, WidthRatio, HeightRatio, windowHeight, windowWidth } from '../../Styling';
import { Navbar } from '../../components/Navbar';
import { getTerm } from '../../Localization';
import { shuffle } from 'lodash';
import { isLetterBlockColliding, isObstacleColliding_0, isObstacleColliding_1, isObstacleColliding_large, isSpecialColliding_0, isSpecialColliding_1, isSpecialColliding_2, isSpecialColliding_3, isUpgradeToSpecial_0_Colliding } from './CollisionHandler';
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
  TouchableOpacityBase,
  Easing
} from 'react-native';




export const Projectile = () => {
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
  const crashes = useRef(null);
  const prevCrashes = useRef(0);
  const hideCrashesUntilUpdate = useRef(false);
  const skullPlaceholder = useRef(3)
  const skullMoneyPlaceholder = useRef(2)

  const score = useRef(0);
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
  const obstacleOpacity_opacity_bot = useRef(new Animated.Value(0)).current;
  const obstacle_opacity_bot = useRef(null)
  let timeoutObstacle_opacity_bot_ID;

  // [OBSTACLE ANIMATION TWINS] - - - - - 
  const hasUpdatedObstacle_twins = useRef(false);
  const obstaclePosition_twins = useRef(new Animated.ValueXY({ x: 1000, y: -HeightRatio(100) })).current;
  const obstacleOpacity_twins = useRef(new Animated.Value(0)).current;
  const obstacle_twins = useRef(null)
  let timeoutObstacle_twins_ID;

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
  const boxInterpolation_twins_a = obstacleOpacity_twins.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.0]
  });
  const boxInterpolation_twins_b = obstacleOpacity_twins.interpolate({
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
    setContinuousEndGameCall(false)
    clearTimeout(timeoutCallGenerateID);
    if (localPrevCrashes > 0) {
      crashes.current = localPrevCrashes;
    } 
    else {
      crashes.current = null;
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
      // console.log("[STATUS - hasGameBeenStarted]  :: " + hasGameBeenStarted)
      // console.log("[STATUS - isGameInProgress.current]  :: " + isGameInProgress.current)

      if (!hasGameBeenStarted) {
        if (isGameInProgress.current) {
          console.log("#4 About to run animations.")
          if (level.current >= 0) {
            letterAnimation();
            runObstacleAnimation_large();
            // runObstacleAnimation_right_angle_0();
            // runObstacleAnimation_right_angle_1();
            // runObstacleAnimation_opacity_bot();
            // runObstacleAnimation_twins();


            runUpgradeToSpecial_0();

          }
          if (level.current >= 1) {
            runObstacleAnimation_0();
            // runUpgradeToSpecial_0();
          }
          if (level.current >= 2) {
            runObstacleAnimation_1();
          }

          setHasGameBeenStarted(true)
          setDisplayPlaybutton(false)
        }
      }
    }
  }, [wordPlusSeven.current])


  const letterAnimation = () => {
    if (isGameInProgress.current) {
      hasUpdatedLetterBlock.current = false;
      setLetter(wordPlusSeven.current[count._value]);
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      letterPosition.setValue({ x: WidthRatio(400), y: localYPos_0 })
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
    if (isGameInProgress.current) {
      hasUpdatedObstacle_0.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_0.setValue({ x: WidthRatio(400), y: localYPos_0 });
      obstacleRotation_0.setValue(0);

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
        Animated.timing(obstacleRotation_0, {
          toValue: 5000,
          duration: 5000,
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
      return;
    }
  };

  const runObstacleAnimation_1 = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_1.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_1.setValue({ x: WidthRatio(400), y: localYPos_0 });
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
          toValue: 5000,
          duration: 5000,
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

      obstaclePosition_large.setValue({ x: WidthRatio(400), y: localYPos_0 });
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
        // Animated.timing(obstacleRotation_large, {
        //   toValue: 5000,
        //   duration: 5000,
        //   useNativeDriver: true
        // })

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

      obstaclePosition_opacity_bot.setValue({ x: WidthRatio(400), y: localYPos_0 });
      obstacleOpacity_opacity_bot.setValue(0);

      obstacle_opacity_bot.current = Animated.parallel([


        Animated.sequence([
          Animated.timing(obstaclePosition_opacity_bot.x, {
            toValue: WidthRatio(400),
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_opacity_bot.y, {
            toValue: localYPos_1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_opacity_bot.x, {
            toValue: WidthRatio(200),
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_opacity_bot.y, {
            toValue: localYPos_0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(obstaclePosition_opacity_bot.x, {
            toValue: -WidthRatio(40),
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
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

  const runObstacleAnimation_twins = () => {
    if (isGameInProgress.current) {
      hasUpdatedObstacle_twins.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      obstaclePosition_twins.setValue({ x: WidthRatio(400), y: localYPos_0 });
      // obstacleRotation_twins.setValue(0);

      obstacle_twins.current = Animated.parallel([
        Animated.timing(obstaclePosition_twins.x, {
          toValue: -WidthRatio(40),
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(obstaclePosition_twins.y, {
          toValue: localYPos_1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(obstacleOpacity_twins, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins, {
            toValue: 0.5,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
          Animated.timing(obstacleOpacity_twins, {
            toValue: 0.5,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
            loop: true,
            delay: 0,
          }),
        ])

      ]);

      obstacle_twins.current.start(() => {
        if (timeoutObstacle_twins_ID) {
          clearTimeout(timeoutObstacle_twins_ID);
        }
        timeoutObstacle_twins_ID = setTimeout(() => {
          runObstacleAnimation_twins();
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

      upgradeToSpecial_0_Position.setValue({ x: WidthRatio(400), y: localYPos_0 });

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
    } 
    console.log(similarElements)
    if (similarElements.length > prevSimilarElements){
      score.current += 100;
    }
    setPrevSimilarElements(similarElements.length)
    setPrevWrongElements(wrongElements.length)

    if (!continuousEndGameCall) {
      if (letterPocket.length > 0 && similarElements.length === uniqueLetters.length) {
        // youWin(crashes.current)
        console.log("CURRENT LEVEL:   " + level.current)
        console.log("CURRENT CRASHES:   " + crashes.current)

        endGame({ 
          continue: true, 
          local: "a", crashes: 
          crashes.current, 
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
    if (crashes.current >= 3) {
      setTimeout(() => {
        endGame({ continue: false, local: "b", crashes: null, score: 0, level: 0 });
      }, 200);

    }
  }, [crashes.current])

  const getBackgroundColor = (input) => {
    let uniqueLetterPocket = Array.from(new Set(letterPocket));
    if (uniqueLetterPocket.includes(input)) {
      return 'rgba(67, 188, 205, 0.65)';
    } else {
      return 'rgba(255, 255, 255, 0.65)';
    }
  }

  const endGame = (input) => {
    hideCrashesUntilUpdate.current = true;
    setContinuousEndGameCall(true)
    isGameInProgress.current = false;
    if (input.local != "c") {
      if (level.current >= 0) {
        animation.current.stop();
        obstacle_large.current.stop();
        upgradeToSpecial_0.current.stop();
      }
      if (level.current >= 1) { obstacle_0.current.stop(); }
      // if (level.current >= 2) { obstacle_1.current.stop(); }
    }

    // [CLEAR/RESET] :: WORD, LETTERS, OBSTACLES, GAME LOGIC
    // - Letters
    setLetter('');
    setLetterPocket([]);
    setDisplayLetters([]);
    letterPosition.setValue({ x: 1000, y: 0 });
    // -Word
    setRandomWord('');
    wordPlusSeven.current = [];
    // - Obstacles
    obstaclePosition_0.setValue({ x: 1000, y: 0 })
    obstaclePosition_1.setValue({ x: 1000, y: 0 })
    obstaclePosition_large.setValue({ x: 1000, y: 0 })
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
      setHasGameBeenStarted(false);
      let localLevel = input.level + 1;
      level.current = localLevel;
      timeoutCallGenerateID = setTimeout(() => {

        
        
        Generate(input.crashes)
      }, 500)

    } else {

      if (input.local == "b") {
        setTimeout(() => {
          setHasGameBeenStarted(false);
          setGameOverModalVisible(true)
          setSharedState({ upgradeToSpecial_0: false })

        }, 100);
      } else if (input.local == "c") {
        setHasGameBeenStarted(false);
        setSharedState({ upgradeToSpecial_0: false })
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
              :
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
        {/* <Animated.View
          style={[Styling.projectile_obstacle_block, {
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
            style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
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
        </Animated.View> */}

        {/* Opacity Bot */}
        {/* - - - - - - - - - - */}
        {/* <Animated.View
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
                { translateX: obstaclePosition_opacity_bot.x }, 
                { translateY: obstaclePosition_opacity_bot.y._value + WidthRatio(24) }
                // { rotate: boxInterpolation_opacity_bot } 
              ],
              opacity: boxInterpolation_opacity_bot,
              
            },
            ]}
          >
            <Image 
              source={require('../../assets/projectile_enemy_3.png')} 
              style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
          </Animated.View> */}
        {/* - - - - - - - - - - */}

        {/* Twins */}
        {/* - - - - - - - - - - */}
        {/* - - - - - - - - - - */}
        {/* <Animated.View
            style={[Styling.projectile_obstacle_block, {
              transform: [
                { translateX: obstaclePosition_twins.x }, 
                { translateY: obstaclePosition_twins.y }
                // { rotate: boxInterpolation_twins } 
              ],
              opacity: boxInterpolation_twins_a,
              
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
                { translateX: obstaclePosition_twins.x }, 
                { translateY: obstaclePosition_twins.y._value + WidthRatio(24) }
                // { rotate: boxInterpolation_twins } 
              ],
              opacity: boxInterpolation_twins_b,
            },
            ]}
          >
            <Image 
              source={require('../../assets/projectile_enemy_3.png')} 
              style={{ height: WidthRatio(24), width: WidthRatio(24) }} />
          </Animated.View> */}
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


        {/* <View style={{borderWidth: 3, borderColor: 'red', height: windowHeight, position: 'absolute', left: windowWidth/2}} /> */}
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
            setGameOverModalVisible(!gameOverModalVisible);
            isGameInProgress.current = false;
          }}
        >
          <View style={Styling.modal_centered_view}>
            <View style={Styling.modal_view}>
              <Text style={Styling.modal_text}>Game Over</Text>
              <View style={{ margin: HeightRatio(20) }}>
                <Text style={Styling.modal_text_style}>Score</Text>
                <Text style={Styling.modal_text_style}>Level</Text>
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