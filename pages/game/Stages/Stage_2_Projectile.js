import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext
} from 'react';
import {
  Styling,
  WidthRatio,
  HeightRatio,
  windowHeight,
  windowWidth
} from '../../../Styling';
import { shuffle } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../../utils/queries';
import { UPDATE_MAX_SCORE_AND_STAGE, UPDATE_TOKEN_COUNT, ADD_SAVED_GAME } from '../../../utils/mutations';
import { MainStateContext } from '../../../App';
import {
  isLetterBlockColliding,
  isObstacleColliding_0,
  isObstacleColliding_1,
  isObstacleColliding_right_angle_0,
  isObstacleColliding_right_angle_1,
  isObstacleColliding_twins_0,
  isObstacleColliding_twins_0_divgergence,
  isObstacleColliding_twins_1,
  isObstacleColliding_twins_1_divgergence,
  isAuxilliaryGreenHealth_Colliding
} from '../CollisionHandler';
import {
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
  Easing
} from 'react-native';
import { CommonActions } from '@react-navigation/native';


const resetActionHome = CommonActions.reset({
  index: 1,
  routes: [{ name: 'Home', params: {} }]
});

export const Stage_2_Projectile = (props) => {
  // [USE CONTEXT API] - - - - - 
  const { mainState, setMainState } = useContext(MainStateContext);
  const userID = useRef(null);

  // APOLLO MUTATIONS
  const [updateMaxScoreAndStage] = useMutation(UPDATE_MAX_SCORE_AND_STAGE);
  const [updateTokenCount] = useMutation(UPDATE_TOKEN_COUNT);
  const [addSavedGame] = useMutation(ADD_SAVED_GAME);

  // [WORDS AND LETTERS] - - - - - 
  const [randomWord, setRandomWord] = useState('')
  const [prevWrongElements, setPrevWrongElements] = useState(0);
  const [prevSimilarElements, setPrevSimilarElements] = useState(0);
  const [letterPocket, setLetterPocket] = useState(mainState.current.currentLetterPocket);
  const [displayLetters, setDisplayLetters] = useState(mainState.current.currentDisplayLetters)
  const [letterPositionNum, setLetterPositionNum] = useState(0)

  // [GAME LOGIC] - - - - - 
  const isGameInProgress = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);
  const updatedPostResume = useRef(null)
  const [resumeSelected, setResumeSelected] = useState(false)
  const [continuousEndGameCall, setContinuousEndGameCall] = useState(false)
  const [hasGameBeenStarted, setHasGameBeenStarted] = useState(false)
  const [displayPlaybutton, setDisplayPlaybutton] = useState(false)
  const crashes = useRef(mainState.current.currentCrashes);
  const flashOouchOnCrash = useRef(false);
  const prevCrashes = useRef(0);
  const hideCrashesUntilUpdate = useRef(false);
  const skullPlaceholder = useRef(3)
  const skullMoneyPlaceholder = useRef(2)
  const [tokenWarning, setTokenWarning] = useState(false);
  const score = useRef(mainState.current.currentScore);
  const [recordedScore, setRecordedScore] = useState(0);
  const scoreFlash_100 = useRef(false);
  const scoreFlash_1000 = useRef(false);
  const level = useRef(mainState.current.currentLevel);
  const [recordedLevel, setRecordedLevel] = useState(0);
  const [displayGameOverText, setDisplayGameOverText] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [displayPauseText, setDisplayPauseText] = useState(false)
  const [openGate, setOpenGate] = useState(false);
  let timeoutCallGenerateID;

  // [LETTER ANIMATION] - - - - - 
  const hasUpdatedLetterBlock = useRef(false);
  const [letter, setLetter] = useState('');
  const letterPosition = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: 0 })).current
  const animation = useRef(null)
  const count = new Animated.Value(mainState.current.currentLetter_countValue);
  const countRef = useRef(mainState.current.currentLetter_countValue);
  const wordPlusSeven = useRef(mainState.current.currentWordPlusSeven)
  let timeoutLetter_ID;

  // [OBSTACLE ANIMATION 0] - - - - - 
  const hasUpdatedObstacle_0 = useRef(false);
  const obstaclePosition_0 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: 0 })).current;
  const obstacleRotation_0 = useRef(new Animated.Value(0)).current;
  const obstacle_0 = useRef(null)
  let timeoutObstacle_0_ID;

  // [OBSTACLE ANIMATION 1] - - - - - 
  const hasUpdatedObstacle_1 = useRef(false);
  const obstaclePosition_1 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: 0 })).current;
  const obstacleRotation_1 = useRef(new Animated.Value(0)).current;
  const obstacle_1 = useRef(null)
  let timeoutObstacle_1_ID;

  // [OBSTACLE ANIMATION RIGHT ANGLE 0] - - - - - 
  const hasUpdatedObstacle_right_angle_0 = useRef(false);
  const obstaclePosition_right_angle_0 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstacleRotation_right_angle_0 = useRef(new Animated.Value(0)).current;
  const obstacle_right_angle_0 = useRef(null)
  let timeoutObstacle_right_angle_0_ID;

  // [OBSTACLE ANIMATION RIGHT ANGLE 1] - - - - - 
  const hasUpdatedObstacle_right_angle_1 = useRef(false);
  const obstaclePosition_right_angle_1 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstacleRotation_right_angle_1 = useRef(new Animated.Value(0)).current;
  const obstacle_right_angle_1 = useRef(null)
  let timeoutObstacle_right_angle_1_ID;

  // [OBSTACLE ANIMATION TWINS 0] - - - - - 
  const hasUpdatedObstacle_twins_0 = useRef(false);
  const obstaclePosition_twins_0 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstaclePosition_twins_0_divergence = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstacleOpacity_twins_0 = useRef(new Animated.Value(0)).current;
  const obstacle_twins_0 = useRef(null)
  let timeoutObstacle_twins_0_ID;

  // [OBSTACLE ANIMATION TWINS 1] - - - - - 
  const hasUpdatedObstacle_twins_1 = useRef(false);
  const obstaclePosition_twins_1 = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstaclePosition_twins_1_divergence = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: -HeightRatio(100) })).current;
  const obstacleOpacity_twins_1 = useRef(new Animated.Value(0)).current;
  const obstacle_twins_1 = useRef(null)
  let timeoutObstacle_twins_1_ID;
  const flip = useRef(false);

  // [AUXILLIARY GREEN HEALTH ANIMATION] - - - - - 
  const hasUpdatedAuxilliaryGreenHealth = useRef(false);
  const auxilliaryGreenHealth_Position = useRef(new Animated.ValueXY({ x: WidthRatio(370), y: 0 })).current;
  const auxilliaryGreenHealth = useRef(null)
  let timeoutAuxilliaryGreenHealth_ID;
  const retainAuxilliaryGreenHealth = useRef(false);
  const deployedGreenHealthOnGenerate = useRef(false);

  // [TESTING]
  const boxInterpolation_0 = obstacleRotation_0.interpolate({
    inputRange: [0, 5000],
    outputRange: ['360deg', '0deg']
  });
  const boxInterpolation_1 = obstacleRotation_1.interpolate({
    inputRange: [0, 5000],
    outputRange: ['360deg', '0deg']
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


  const { data: userByID, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userID.current }
  });

  useLayoutEffect(() => {
    isGameInProgress.current = false;
    setMainState({ 
      upgradeToSpecial_0: false, 
      deployUpgradeToSpecialAnimation: false, 
      gameOverScreen: false 
    })

    userID.current = mainState.current.userID;
  }, [])

  useEffect(() => {
    // This is the effect that should be cleaned up when the component is unmounted
    const timeoutId = setTimeout(() => {
      console.log("MOUNTED_INNER")
      setDisplayPlaybutton(true)
    }, 1000);

    // Return a function that cleans up the effect
    return () => {
      console.log("UNMOUNTED_INNER")
      endGame({
        continue: false,
        local: "c",
        crashes: 0,
        score: 0,
        level: 0,
      });
      clearTimeout(timeoutId);
    };
  }, []);

  const Generate = (localPrevCrashes) => {
    console.log("Stage, #1 Generate")
    if (!mainState.current.fromSavedGame) {
      console.log("Stage, #2 This is ")

    setOpenGate(true)
    setContinuousEndGameCall(false)
    clearTimeout(timeoutCallGenerateID);
    if (localPrevCrashes > 0) {
      crashes.current = localPrevCrashes;
    }
    else {
      crashes.current = 0;
    }

    const data = require('../output.json');
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
      score.current = score.current + 1000;
      scoreFlash_1000.current = true;
      setTimeout(() => {
        scoreFlash_1000.current = false;
      }, 1000)
    }

    setRandomWord(word);
    setDisplayLetters(letters)

    wordPlusSeven.current = scambledCombined; // Must be last

  } else {
    console.log("Stage, #2 fromSavedGame: true")

    setContinuousEndGameCall(false)

    setMainState({
      fromSavedGame: false
    })

    const randomLetters = [];
    for (let i = 0; i < 7; i++) {
      const letterCode = Math.floor(Math.random() * 26) + 65;
      const letter = String.fromCharCode(letterCode);
      let lowerCaseLetter = letter.toLowerCase();
      randomLetters.push(lowerCaseLetter);
    }
    setLetterPositionNum(displayLetters.length)

    let combined = displayLetters.concat(randomLetters);
    let uniqueCombined = [...new Set(combined)];
    let scambledCombined = shuffle(uniqueCombined);

    setDisplayPlaybutton(false)

    setRandomWord(displayLetters.join(""));
    setDisplayLetters(displayLetters)

    let savedWord = displayLetters.join("");
    let letters = savedWord.split('');


    const wrongElements = letterPocket.filter((element) => !letters.includes(element));
    setPrevWrongElements(wrongElements.length)
    
    let uniqueLetterPocket = Array.from(new Set(letterPocket));
    const similarElements = uniqueLetterPocket.filter((element) => letters.includes(element));
    setPrevSimilarElements(similarElements.length)

    wordPlusSeven.current = scambledCombined; // Must be last
    setOpenGate(true)
  }
  }

  useEffect(() => {

    if (wordPlusSeven.current.length > 0 && openGate) {
      console.log("Stage, #3 wordPlusSeven & openGate")
      hideCrashesUntilUpdate.current = false;
      isGameInProgress.current = true;

      // [GAME LEVEL CONTROL]
      if (!hasGameBeenStarted) {
        if (isGameInProgress.current) {
          setMainState({
            isGameInProgress: isGameInProgress.current
          })

          updatedPostResume.current = true;
          pauseTimeout.current = false;

          setTimeout(() => {
            if (mainState.current.currentCrashes >= 2 || crashes.current >= 2 && auxilliaryGreenHealth.current == null) {
              deployedGreenHealthOnGenerate.current = true;
              runAuxilliaryGreenHealth();
            }

            if (level.current >= 0) {
              letterAnimation();
              runObstacleAnimation_twins_1();

            }

            if (level.current >= 1) {
              runObstacleAnimation_twins_0();
            }

            if (level.current >= 2) {
              runObstacleAnimation_right_angle_0();
            }

            if (level.current >= 3) {
              runObstacleAnimation_right_angle_1();
            }

            setHasGameBeenStarted(true)
          }, 1500)
        }
      }
    }
  }, [wordPlusSeven.current, openGate])


  const letterAnimation = () => {
    if (isGameInProgress.current) {
      hasUpdatedLetterBlock.current = false;
      countRef.current = count._value;
      if (mainState.current.currentLetter_countValue != null && !updatedPostResume.current) {
        count.setValue(mainState.current.currentLetter_countValue);
        updatedPostResume.current = true;
      }

      setLetter(wordPlusSeven.current[count._value]);
      // let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_0 = Math.floor(Math.random() * (HeightRatio(670) - HeightRatio(30))) + HeightRatio(30);
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

  const runAuxilliaryGreenHealth = () => {
    if (isGameInProgress.current && !retainAuxilliaryGreenHealth.current) {
      hasUpdatedAuxilliaryGreenHealth.current = false;
      let localYPos_0 = Math.floor(Math.random() * HeightRatio(670));
      let localYPos_1 = Math.floor(Math.random() * HeightRatio(670));

      auxilliaryGreenHealth_Position.setValue({ x: WidthRatio(370), y: localYPos_0 });

      auxilliaryGreenHealth.current = Animated.parallel([
        Animated.timing(auxilliaryGreenHealth_Position.x, {
          toValue: -WidthRatio(40),
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(auxilliaryGreenHealth_Position.y, {
          toValue: localYPos_1,
          duration: 8000,
          useNativeDriver: true,
        }),

      ]);

      auxilliaryGreenHealth.current.start(() => {
        if (timeoutAuxilliaryGreenHealth_ID) {
          clearTimeout(timeoutAuxilliaryGreenHealth_ID);
        }
        timeoutAuxilliaryGreenHealth_ID = setTimeout(() => {
          runAuxilliaryGreenHealth();
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
    // radius: 0
  });

  useEffect(() => {

    // This function will be called on every animation frame
    const update = () => {
      setObj1({
        x: mainState.current.charX + WidthRatio(64) + mainState.current.charWidth / 2,
        y: mainState.current.charY - mainState.current.charHeight / 1.2,
        width: mainState.current.charWidth,
        height: mainState.current.charHeight,
        // radius: mainState.current.charHeight / 2,
      });

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
          score.current = score.current - 25;
          hasUpdatedObstacle_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
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
          score.current = score.current - 25;
          hasUpdatedObstacle_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_1.current.reset()
      }

    });

    // Obstacle Right Angle 0
    const obstacleListener_right_angle_0 = obstaclePosition_right_angle_0.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(14), width: WidthRatio(24) }

      if (isObstacleColliding_right_angle_0(obj1, obj2)) {
        if (!hasUpdatedObstacle_right_angle_0.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_right_angle_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_right_angle_0.current.reset()
      }

    });

    // Obstacle Right Angle 1
    const obstacleListener_right_angle_1 = obstaclePosition_right_angle_1.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(14), width: WidthRatio(24) }

      if (isObstacleColliding_right_angle_1(obj1, obj2)) {
        if (!hasUpdatedObstacle_right_angle_1.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_right_angle_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_right_angle_1.current.reset()
      }

    });

    // Obstacle Right Twins 0
    const obstacleListener_twins_0 = obstaclePosition_twins_0.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(24), width: WidthRatio(18) }

      if (isObstacleColliding_twins_0(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_0.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_twins_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_0.current.reset()
      }

    });
    // Obstacle Right Twins Divergence 0
    const obstacleListener_twins_0_divergence = obstaclePosition_twins_0_divergence.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(24), width: WidthRatio(18) }

      if (isObstacleColliding_twins_0_divgergence(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_0.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_twins_0.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_0.current.reset()
      }

    });

    // Obstacle Right Twins 1
    const obstacleListener_twins_1 = obstaclePosition_twins_1.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(24), width: WidthRatio(18) }

      if (isObstacleColliding_twins_1(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_1.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_twins_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_1.current.reset()
      }

    });
    // Obstacle Right Twins 1
    const obstacleListener_twins_1_divergence = obstaclePosition_twins_1_divergence.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, height: WidthRatio(24), width: WidthRatio(18) }

      if (isObstacleColliding_twins_1_divgergence(obj1, obj2)) {
        if (!hasUpdatedObstacle_twins_1.current) {
          crashes.current += 1;
          score.current = score.current - 25;
          hasUpdatedObstacle_twins_1.current = true;
          flashOouchOnCrash.current = true;
          setTimeout(() => {
            flashOouchOnCrash.current = false;
          }, 500)
        }
        obstacle_twins_1.current.reset()
      }

    });

    // AuxilliaryGreenHealth

    const auxilliaryGreenHealthListener = auxilliaryGreenHealth_Position.addListener((value) => {
      let obj2 = { x: value.x, y: value.y, width: WidthRatio(12), height: WidthRatio(12) }

      if (isAuxilliaryGreenHealth_Colliding(obj1, obj2)) {
        // console.log("UPGRADE COLLISION!!!!!!")
        if (!hasUpdatedAuxilliaryGreenHealth.current) {
          retainAuxilliaryGreenHealth.current = true;
          crashes.current -= 1;
          hasUpdatedAuxilliaryGreenHealth.current = true;
        }
        deployedGreenHealthOnGenerate.current = false;
        auxilliaryGreenHealth.current.reset();
      }
    });

    return () => {
      letterPosition.removeListener(wordBlockListener);
      obstaclePosition_0.removeListener(obstacleListener_0);
      obstaclePosition_1.removeListener(obstacleListener_1);
      obstaclePosition_right_angle_0.removeListener(obstacleListener_right_angle_0);
      obstaclePosition_right_angle_1.removeListener(obstacleListener_right_angle_1)
      obstaclePosition_twins_0.removeListener(obstacleListener_twins_0);
      obstaclePosition_twins_0_divergence.removeListener(obstacleListener_twins_0_divergence)

      obstaclePosition_twins_1.removeListener(obstacleListener_twins_1);
      obstaclePosition_twins_1_divergence.removeListener(obstacleListener_twins_1_divergence)

      auxilliaryGreenHealth_Position.removeListener(auxilliaryGreenHealthListener);
    }
  }, [obj1]);

  useEffect(() => {
    if (openGate) {
    let uniqueLetterPocket = Array.from(new Set(letterPocket));
    let letters = randomWord.split('');
    let uniqueLetters = Array.from(new Set(letters));

    const similarElements = uniqueLetterPocket.filter((element) => letters.includes(element));
    const wrongElements = letterPocket.filter((element) => !letters.includes(element));
    if (wrongElements.length > prevWrongElements) {
      console.log("#1 - - - - - - - - ")
      crashes.current += 1;
      score.current = score.current - 25;
      flashOouchOnCrash.current = true;
      setTimeout(() => {
        flashOouchOnCrash.current = false;
      }, 500)
    }

    if (similarElements.length > prevSimilarElements) {
      console.log("#2 - - - - - - - - ")
      score.current = score.current + 100;
      scoreFlash_100.current = true;
    }
    setPrevSimilarElements(similarElements.length)
    setPrevWrongElements(wrongElements.length)
    setTimeout(() => {
      scoreFlash_100.current = false;
    }, 500)

    if (!continuousEndGameCall) {
      if (letterPocket.length > 0 && similarElements.length === uniqueLetters.length) {
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
    if (letterPocket.length > 0 && isGameInProgress.current) {
      animation.current.reset()
    }
  }

  }, [letterPocket])

  useEffect(() => {
    setTimeout(() => {
      if (crashes.current < 2 && auxilliaryGreenHealth.current != null) {
        auxilliaryGreenHealth.current.stop();
        auxilliaryGreenHealth_Position.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedAuxilliaryGreenHealth.current = false;
        retainAuxilliaryGreenHealth.current = false;

      } else if (crashes.current >= 2 && deployedGreenHealthOnGenerate.current == false) {
        runAuxilliaryGreenHealth();
      }
      if (crashes.current >= 3 && !hideCrashesUntilUpdate.current) {
        endGame({
          continue: false,
          local: "b",
          crashes: crashes.current,
          score: score.current,
          level: level.current,
          letterPocket: letterPocket,
          wordPlusSeven: wordPlusSeven.current,
          displayLetters: displayLetters,
          letter_countValue: countRef.current
        });
      }
    }, 200);
  }, [crashes.current, level.current])

  const getBackgroundColor = (input) => {
    let uniqueLetterPocket = Array.from(new Set(letterPocket));
    if (uniqueLetterPocket.includes(input)) {
      return 'rgba(67, 188, 205, 0.65)';
    } else {
      return 'rgba(255, 255, 255, 0.65)';
    }
  }

  const pauseGame = () => {
    isGameInProgress.current = false;
    updatedPostResume.current = false;
    setDisplayPauseText(true)

    let uniqueLetterPocket = Array.from(new Set(letterPocket));

    setMainState({
      stage1: false,
      stage2: true,
      stage3: false,
      stage4: false,
      stage5: false,
      stage6: false,
      stage7: false,
      stage8: false,
      stage9: false,
      stage10: false,
      currentScore: score.current,
      currentLevel: level.current,
      currentCrashes: crashes.current,
      currentLetterPocket: uniqueLetterPocket,
      currentWordPlusSeven: wordPlusSeven.current,
      currentDisplayLetters: displayLetters,
      currentLetter_countValue: countRef.current,
      isGameInProgress: isGameInProgress.current
    })

    if (level.current >= 0 && animation.current != null) {
      animation.current.stop();
      letterPosition.setValue({ x: WidthRatio(500), y: 0 })
      hasUpdatedLetterBlock.current = false;

      if (obstacle_twins_1.current != null) {
        obstacle_twins_1.current.stop();

        obstaclePosition_twins_1.setValue({ x: WidthRatio(370), y: 0 })
        obstaclePosition_twins_1_divergence.setValue({ x: WidthRatio(370), y: 0 })

      }
      if (obstacle_0.current != null) {
        obstacle_0.current.stop();
        obstaclePosition_0.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedObstacle_0.current = false;
      }
      if (obstacle_1.current != null) {
        obstacle_1.current.stop();
        obstaclePosition_1.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedObstacle_1.current = false;

      }

      if (auxilliaryGreenHealth.current != null) {
        auxilliaryGreenHealth.current.stop();
        auxilliaryGreenHealth_Position.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedAuxilliaryGreenHealth.current = false;
      }
    }
    if (level.current >= 1 && obstacle_twins_0.current != null) {
      obstacle_twins_0.current.stop();
      obstaclePosition_twins_0.setValue({ x: WidthRatio(370), y: 0 })
      obstaclePosition_twins_0_divergence.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_twins_0.current = false;
    }
    if (level.current >= 2 && obstacle_right_angle_0.current != null) {
      obstacle_right_angle_0.current.stop();
      obstaclePosition_right_angle_0.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_right_angle_0.current = false;
    }

    if (level.current >= 3 && obstacle_right_angle_1.current != null) {
      obstacle_right_angle_1.current.stop();
      obstaclePosition_right_angle_1.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_right_angle_1.current = false;
    }

    setIsPaused(true)
    setResumeSelected(true)
    setTimeout(() => {
      setResumeSelected(false)
    }, 500)
  }

  const resumeGame = () => {
    setResumeSelected(true)
    setDisplayPauseText(false)

    setTimeout(() => {
      setIsPaused(false)
      pauseTimeout.current = true;
      isGameInProgress.current = true;

      setMainState({
        isGameInProgress: isGameInProgress.current
      })

      if (mainState.current.currentLevel >= 0) {
        letterAnimation();
        runObstacleAnimation_twins_1();
      }

      if (mainState.current.currentLevel >= 1) {
        runObstacleAnimation_twins_0();
      }

      if (mainState.current.currentLevel >= 2) {
        runObstacleAnimation_right_angle_0();
      }

      if (mainState.current.currentLevel >= 3) {
        runObstacleAnimation_right_angle_1();
      }

      setTimeout(() => {
        pauseTimeout.current = false;
        setResumeSelected(false)

      }, 15000)
    }, 500)

  }

  const saveAndContinueLater = async () => {
    await addSavedGame({
      variables: {
        userid: `${userByID?.user._id}`,
        stage: '2',
        score: `${mainState.current.currentScore}`,
        level: `${mainState.current.currentLevel}`,
        crashes: `${mainState.current.currentCrashes}`,
        letterPocket: `${mainState.current.currentLetterPocket}`,
        displayLetters: `${mainState.current.currentDisplayLetters}`,
        currentLetterCountValue: `${mainState.current.currentLetter_countValue}`
      }
    });
    setMainState({
      stage1: true,
      stage2: false,
      stage3: false,
      stage4: false,
      stage5: false,
      stage6: false,
      stage7: false,
      stage8: false,
      stage9: false,
      stage10: false,
      currentScore: 0,
      currentLevel: 0,
      currentCrashes: 0,
      isGameInProgress: false
    })
    props.nav.dispatch(resetActionHome);

    setTimeout(() => {
      setDisplayPauseText(!displayPauseText);
      isGameInProgress.current = false;
    }, 500)

  };

  const insertToken = async () => {

    if (userByID?.user.tokens > 0) {
      await updateTokenCount({
        variables: {
          remove: "true",
          add: "false",
          amount: "0"
        }
      });
      setGameOverModalVisible(!gameOverModalVisible);
      setTimeout(() => {
        continueGame();
      }, 1000)
    } else {
      setTokenWarning(true)
    }
  }

  const continueGame = () => {
    // console.log("CONTINUE GAME");
    // console.log("- - - - - -")
    // console.log(mainState.current.stage1)
    // console.log(mainState.current.stage2)
    // console.log(mainState.current.stage3)
    // console.log(mainState.current.currentScore)
    // console.log(mainState.current.currentLevel)
    // console.log(mainState.current.currentCrashes)
    // console.log(mainState.current.currentLetterPocket)
    // console.log(mainState.current.currentWordPlusSeven)
    // console.log(mainState.current.currentDisplayLetters)
    // console.log(mainState.current.currentLetter_countValue)
    // console.log("- - - - - -")

    score.current = mainState.current.currentScore;
    level.current = mainState.current.currentLevel;
    crashes.current = mainState.current.currentCrashes;
    setLetterPocket(mainState.current.currentLetterPocket)
    wordPlusSeven.current = mainState.current.currentWordPlusSeven;
    setDisplayLetters(mainState.current.currentDisplayLetters)
    countRef.current = mainState.current.currentLetter_countValue + 1;


    hideCrashesUntilUpdate.current = false;
    isGameInProgress.current = true;
    setHasGameBeenStarted(true)

    setMainState({
      isGameInProgress: isGameInProgress.current,
      gameOverScreen: false
    })

    if (mainState.current.currentLevel >= 0) {
      letterAnimation();
      runObstacleAnimation_twins_1();
    }

    if (mainState.current.currentLevel >= 1) {
      runObstacleAnimation_twins_0();
    }

    if (mainState.current.currentLevel >= 2) {
      runObstacleAnimation_right_angle_0();
    }

    if (mainState.current.currentLevel >= 3) {
      runObstacleAnimation_right_angle_1();
    }
  }

  // [END GAME] 
  // input.local "a" represents a continuance of gameplay
  // input.local "b" represents a loss of game
  // input.local "c" represents the user navigating away from the game
  const endGame = async (input) => {
    hideCrashesUntilUpdate.current = true;
    isGameInProgress.current = false;

    if (level.current >= 0 && animation.current != null) {
      animation.current.stop();
      letterPosition.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedLetterBlock.current = false;

      if (obstacle_twins_1.current != null) {
        obstacle_twins_1.current.stop();

        obstaclePosition_twins_1.setValue({ x: WidthRatio(370), y: 0 })
        obstaclePosition_twins_1_divergence.setValue({ x: WidthRatio(370), y: 0 })

      }
      if (obstacle_0.current != null) {
        obstacle_0.current.stop();
        obstaclePosition_0.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedObstacle_0.current = false;
      }
      if (obstacle_1.current != null) {
        obstacle_1.current.stop();
        obstaclePosition_1.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedObstacle_1.current = false;

      }

      if (auxilliaryGreenHealth.current != null) {
        auxilliaryGreenHealth.current.stop();
        auxilliaryGreenHealth_Position.setValue({ x: WidthRatio(370), y: 0 })
        hasUpdatedAuxilliaryGreenHealth.current = false;
      }
    }
    if (level.current >= 1 && obstacle_twins_0.current != null) {
      obstacle_twins_0.current.stop();
      obstaclePosition_twins_0.setValue({ x: WidthRatio(370), y: 0 })
      obstaclePosition_twins_0_divergence.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_twins_0.current = false;
    }
    if (level.current >= 2 && obstacle_right_angle_0.current != null) {
      obstacle_right_angle_0.current.stop();
      obstaclePosition_right_angle_0.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_right_angle_0.current = false;
    }

    if (level.current >= 3 && obstacle_right_angle_1.current != null) {
      obstacle_right_angle_1.current.stop();
      obstaclePosition_right_angle_1.setValue({ x: WidthRatio(370), y: 0 })
      hasUpdatedObstacle_right_angle_1.current = false;
    }

    // [HANDLE GAME RESTART]
    if (input.continue) {
      console.log(" - - - input.continue - - - ")
      console.log(input.level)
      setContinuousEndGameCall(true)
      setHasGameBeenStarted(false);

      if (input.level >= 4) {
        setLetter('');
        setRandomWord('');
        wordPlusSeven.current = [];
        setLetterPocket([]);
        setDisplayLetters([]);

        setTimeout(() => {
          score.current = score.current + 1000;
          scoreFlash_1000.current = true;
          setTimeout(() => {
            scoreFlash_1000.current = false;
          }, 1000)
        }, 501)

        setTimeout(() => {
          setMainState({
            stage1: false,
            stage2: false,
            stage3: true,
            stage4: false,
            stage5: false,
            stage6: false,
            stage7: false,
            stage8: false,
            stage9: false,
            stage10: false,
            currentScore: score.current,
            currentLevel: 0,
            currentCrashes: input.crashes,
            currentLetterPocket: [],
            currentWordPlusSeven: [],
            currentDisplayLetters: [],
            currentLetter_countValue: 0,
            gameOverScreen: false

          })
        }, 1700)

        return;
      } else {
        let localLevel = input.level + 1;
        level.current = localLevel;

        // [CLEAR/RESET] :: WORD, LETTERS, OBSTACLES, GAME LOGIC
        setLetter('');
        setRandomWord('');
        wordPlusSeven.current = [];
        setLetterPocket([]);
        setDisplayLetters([]);

        setMainState({
          currentScore: score.current,
          currentLevel: level.current,
          currentCrashes: input.crashes,
          currentLetterPocket: [],
          currentWordPlusSeven: [],
          currentDisplayLetters: [],
          currentLetter_countValue: 0
        })

        timeoutCallGenerateID = setTimeout(() => {
          Generate(input.crashes)
        }, 500)
      }



    } else {

      if (input.local == "b") {
        let localLevel = input.level + 1;
        setRecordedLevel(localLevel)
        setRecordedScore(input.score)

        setMainState({
          stage1: false,
          stage2: true,
          stage3: false,
          stage4: false,
          stage5: false,
          stage6: false,
          stage7: false,
          stage8: false,
          stage9: false,
          stage10: false,
          currentScore: input.score,
          currentLevel: input.level,
          currentCrashes: 0,
          currentLetterPocket: input.letterPocket,
          currentWordPlusSeven: input.wordPlusSeven,
          currentDisplayLetters: input.displayLetters,
          currentLetter_countValue: input.letter_countValue,
          isGameInProgress: isGameInProgress.current,
          gameOverScreen: true
        })
        await updateMaxScoreAndStage({
          variables: {
            maxstage: '2',
            highscore: `${input.score}`
          }
        });
        setTimeout(() => {
          refetch();
          setDisplayGameOverText(true)
          setTimeout(() => {
            setDisplayGameOverText(false)
            setGameOverModalVisible(true)
          }, 1000)


        }, 100);
      } else if (input.local == "c") {
        setContinuousEndGameCall(true)

        // [CLEAR/RESET] :: WORD, LETTERS, OBSTACLES, GAME LOGIC
        // - Letters
        setLetter('');
        setLetterPocket([]);
        setDisplayLetters([]);
        // -Word
        setRandomWord('');
        wordPlusSeven.current = [];

        // - Game Logic
        count.setValue(0)
        countRef.current = 0;
        level.current = 0;
      }
    }
  }


  return (
    <View>
      <>
        {displayPlaybutton &&
          <>
            <TouchableOpacity
              onPress={() => { Generate(mainState.current.currentCrashes); }}
              style={{
                position: 'absolute',
                zIndex: 15,
                left: windowWidth / 2 - HeightRatio(450),
                top: windowHeight / 2 - HeightRatio(450),
                zIndex: -5
              }}
            >
              <Image
                source={require('../../../assets/stage_transition_2.png')}
                style={{ height: HeightRatio(900), width: HeightRatio(900) }}
              />
            </TouchableOpacity>
          </>
        }
          <>
            {/* [PAUSE / RESUME] */}
            {isPaused && !resumeSelected ?
              <View style={{
                position: 'absolute',
                zIndex: -7,
                top: HeightRatio(20),
                left: HeightRatio(20)
              }}>
                <TouchableOpacity
                  onPress={() => {
                    resumeGame();
                  }}
                  style={{
                    height: HeightRatio(100),
                    width: HeightRatio(100),
                    // backgroundColor: 'red'
                  }}>
                  <Image
                    source={require('../../../assets/button_resume.png')}
                    style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                </TouchableOpacity>
              </View>
              :
              <>
                {!pauseTimeout.current && !resumeSelected ?
                  <View style={{
                    position: 'absolute',
                    zIndex: -7,
                    top: HeightRatio(20),
                    left: HeightRatio(20)
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        pauseGame();
                      }}
                      style={{
                        height: HeightRatio(100),
                        width: HeightRatio(100),
                        // backgroundColor: 'red'
                      }}>
                      <Image
                        source={require('../../../assets/button_pause.png')}
                        style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{
                    position: 'absolute',
                    zIndex: -7,
                    top: HeightRatio(20),
                    left: HeightRatio(20)
                  }}>
                    <Image
                      source={require('../../../assets/clock_icon.png')}
                      style={{ height: HeightRatio(100), width: HeightRatio(100) }} />
                  </View>
                }
              </>
            }
            {score.current != null ?
              <>
                <View style={{
                  position: 'absolute',
                  zIndex: -7,
                  top: windowHeight * 0.84,
                  left: HeightRatio(30),
                  backgroundColor: 'transparent',
                }}>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 1.0)',
                    fontSize: WidthRatio(12),
                    fontWeight: 'bold'
                  }}
                    allowFontScaling={false}
                  >Score: {score.current}</Text>
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
                      source={require('../../../assets/reward_100_points.png')}
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
                      source={require('../../../assets/reward_1000_points_0.png')}
                      style={{ height: HeightRatio(600), width: HeightRatio(600) }} />
                  </View>
                }
              </>
              :
              <>
                <View style={{
                  position: 'absolute',
                  zIndex: -7,
                  top: windowHeight * 0.84,
                  left: HeightRatio(30),
                  backgroundColor: 'transparent',
                }}>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 1.0)',
                    fontSize: WidthRatio(12),
                    fontWeight: 'bold'
                  }}
                    allowFontScaling={false}
                  >Score: 0</Text>
                </View>

              </>
            }
          </>

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
          <Text style={Styling.projectile_letter} allowFontScaling={false}>
            {letter.toUpperCase()}
          </Text>
          <Image
            source={require('../../../assets/block_keyboard_key.png')}
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
            source={require('../../../assets/projectile_asteroid_2.png')}
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
            source={require('../../../assets/projectile_asteroid_2.png')}
            style={{ height: WidthRatio(10), width: WidthRatio(10) }} />
        </Animated.View>

        {/* Right Angle 0 & 1 */}
        <Animated.View
          style={[Styling.projectile_obstacle_block,
          // { width: WidthRatio(24), height: WidthRatio(24), },
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
            source={require('../../../assets/projectile_red_ufo.png')}
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
            source={require('../../../assets/projectile_red_ufo.png')}
            style={{ height: WidthRatio(15), width: WidthRatio(24) }} />
        </Animated.View>

        {/* TWINS */}
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
            source={require('../../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(20) }} />
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
            source={require('../../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(20) }} />
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
            source={require('../../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(20) }} />
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
            source={require('../../../assets/projectile_enemy_4.png')}
            style={{ height: WidthRatio(24), width: WidthRatio(20) }} />
        </Animated.View>
        {/* - - - - - - - - - - */}

        {/* Auxilliary Green Health */}
        <Animated.View
          style={[
            Styling.projectile_obstacle_block,
            {
              transform: [{ translateX: auxilliaryGreenHealth_Position.x }, { translateY: auxilliaryGreenHealth_Position.y }],
            },
          ]}
        >
          <Image
            source={require('../../../assets/aux_green_plus.png')}  ///upgrade_to_special_0.png
            style={{ height: WidthRatio(12), width: WidthRatio(12) }} />
        </Animated.View>

        <View style={{ borderWidth: 3, borderColor: 'red', height: windowHeight, position: 'absolute', left: WidthRatio(-10) }} />
        {openGate &&
          <View style={{ left: (-WidthRatio(20)) + windowWidth / 2 - ((displayLetters.length * WidthRatio(30)) / 2) }}>
            {displayLetters.map((l, i) => (
              <View style={{
                width: WidthRatio(28),
                position: 'absolute',
                top: 10,
                left: ((((displayLetters.length * WidthRatio(30)) / windowWidth) * 100) + (i * WidthRatio(30))),
                height: WidthRatio(28),
                borderRadius: HeightRatio(20),
                backgroundColor: getBackgroundColor(l),
                justifyContent: 'center',
                alignItems: 'center'
              }}
                key={i}
              >
                <Text style={Styling.projectile_random_word_letter} allowFontScaling={false}>{l.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        }

        {crashes.current > 0 && !hideCrashesUntilUpdate.current &&
          <>
            {Array.from(Array(crashes.current).keys()).map((n, i) => (
              <View style={{
                position: 'absolute',
                zIndex: -7,
                top: windowHeight * 0.82,
                left: (windowWidth / 2 + WidthRatio(80) + (i * WidthRatio(25))),
                backgroundColor: 'transparent',
                width: HeightRatio(40)
              }}
                key={i}
              >
                <Image source={require('../../../assets/skull_0.png')} style={{ height: WidthRatio(22), width: WidthRatio(22) }} />
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
              source={require('../../../assets/warning_oouch.png')}
              style={{ height: WidthRatio(60), width: WidthRatio(60) }} />
          </View>
        }

        {/* SKULLS */}
        {Array.from(Array(skullPlaceholder.current).keys()).map((n, i) => (
          <View style={{
            position: 'absolute',
            zIndex: -7,
            top: windowHeight * 0.82,
            left: (windowWidth / 2 + WidthRatio(80) + (i * WidthRatio(25))),
            backgroundColor: 'transparent',
            width: HeightRatio(40)
          }}
            key={i}
          >
            <Image source={require('../../../assets/skull_0.png')} style={{ height: WidthRatio(22), width: WidthRatio(22), opacity: 0.4 }} />
          </View>
        ))}

        {/* GAME PAUSE MODAL */}
        {displayPauseText &&
          <View style={{
            position: 'absolute',
            zIndex: 25,
            top: HeightRatio(125),
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            // flex: 1,
            // width: '100%',
            width: windowWidth,
            alignSelf: 'center'
          }}>
            <Text style={{
              color: 'white',
              fontSize: HeightRatio(280),
              fontWeight: 'bold',
              // flexWrap: 'wrap',
              alignSelf: 'center',
              textAlign: 'center'
            }}
              allowFontScaling={false}
            >PAUSE</Text>
            <Text style={{
              color: 'white',
              fontSize: HeightRatio(50),
              fontWeight: 'bold',
              // flexWrap: 'wrap',
              alignSelf: 'center',
              textAlign: 'center'
            }}
              allowFontScaling={false}
            >Save and continue later?</Text>
            <TouchableOpacity
              onPress={() => saveAndContinueLater()}
              style={{ backgroundColor: '#03d81a', width: WidthRatio(50), borderRadius: HeightRatio(10), alignSelf: 'center', margin: HeightRatio(25) }}>
              <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', margin: HeightRatio(10) }}> Sure </Text>
            </TouchableOpacity>
          </View>
        }


        {/* GAME OVER MODAL */}
        {displayGameOverText &&
          <View style={{
            position: 'absolute',
            zIndex: 25,
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            flex: 1,
            width: '100%'
          }}>
            <Text style={{
              color: 'white',
              fontSize: HeightRatio(330),
              fontWeight: 'bold',
              flexWrap: 'wrap',
              alignSelf: 'center',
              textAlign: 'center'
            }}
              allowFontScaling={false}
            >GAME OVER</Text>
          </View>
        }

        {gameOverModalVisible &&
          <View style={{
            position: 'absolute',
            zIndex: 25,
            padding: HeightRatio(20),
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            height: windowHeight,
            width: windowWidth,
          }}>
            <Image
              source={require('../../../assets/game_over.png')}
              style={{
                alignSelf: 'center',
                height: WidthRatio(190),
                width: WidthRatio(375),
                marginTop: HeightRatio(10)
              }}
            />
            <Text style={{
              color: '#f6c878',
              fontSize: HeightRatio(60),
              fontWeight: 'bold',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 26,
              top: HeightRatio(150)
            }}
              allowFontScaling={false}>
              Your Current High Score: {userByID?.user.highscore}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 26,
              top: HeightRatio(210),
            }}>
              <View style={{
                alignSelf: 'center',
                width: WidthRatio(120),
                height: windowWidth / 4
              }}>

                <View
                  style={{
                    border: 'solid',
                    borderColor: 'white',
                    borderLeftWidth: HeightRatio(2),
                    borderBottomWidth: HeightRatio(2),
                    borderBottomLeftRadius: HeightRatio(20),
                    padding: HeightRatio(20),
                    width: WidthRatio(120),
                    flexDirection: 'column',
                    margin: HeightRatio(8),
                    backgroundColor: '#25698975',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: HeightRatio(50)
                  }}

                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{ color: '#f6c878', marginRight: HeightRatio(20), fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center' }}
                      allowFontScaling={false}
                    >Score</Text>

                    <Text
                      style={{ color: 'white', alignSelf: 'center', fontSize: HeightRatio(60), fontWeight: 'bold', width: WidthRatio(75), }}
                      allowFontScaling={false}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {recordedScore}
                    </Text>
                  </View>


                </View>
                <View
                  style={{
                    border: 'solid',
                    borderColor: 'white',
                    borderLeftWidth: HeightRatio(2),
                    borderBottomWidth: HeightRatio(2),
                    borderBottomLeftRadius: HeightRatio(20),
                    padding: HeightRatio(20),
                    width: WidthRatio(120),
                    flexDirection: 'column',
                    margin: HeightRatio(8),
                    backgroundColor: '#25698975',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: HeightRatio(50)
                  }}

                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{ color: '#f6c878', marginRight: 10, fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center' }}
                      allowFontScaling={false}
                    >Stage</Text>

                    <Text
                      style={{ color: 'white', alignSelf: 'center', fontSize: HeightRatio(60), fontWeight: 'bold', width: WidthRatio(75), }}
                      allowFontScaling={false}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      2
                    </Text>
                  </View>


                </View>
                <View
                  style={{
                    border: 'solid',
                    borderColor: 'white',
                    borderLeftWidth: HeightRatio(2),
                    borderBottomWidth: HeightRatio(2),
                    borderBottomLeftRadius: HeightRatio(20),
                    padding: HeightRatio(20),
                    width: WidthRatio(120),
                    flexDirection: 'column',
                    margin: HeightRatio(8),
                    backgroundColor: '#25698975',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: HeightRatio(50)
                  }}

                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{ color: '#f6c878', marginRight: HeightRatio(20), fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center' }}
                      allowFontScaling={false}
                    >Level</Text>

                    <Text
                      style={{ color: 'white', alignSelf: 'center', fontSize: HeightRatio(60), fontWeight: 'bold', width: WidthRatio(75), }}
                      allowFontScaling={false}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {recordedLevel}
                    </Text>
                  </View>


                </View>
              </View>
              <View style={{ margin: HeightRatio(40), alignSelf: 'center' }} />
              {!tokenWarning ?
                <View style={{
                  margin: HeightRatio(50),
                  alignSelf: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: HeightRatio(50),
                  width: WidthRatio(130),
                  height: windowWidth / 4
                }}>
                  <Text style={{
                    alignSelf: 'center',
                    color: '#00e5ff',
                    fontSize: HeightRatio(60),
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                    allowFontScaling={false}>
                    DO YOU WANT TO CONTINUE?
                  </Text>
                  <Text style={{
                    ...Styling.modal_text_style,
                    alignSelf: 'center',
                    fontSize: HeightRatio(50),
                    color: 'white',
                    marginTop: HeightRatio(8)
                  }}
                    allowFontScaling={false}>
                    USE A TOKEN
                  </Text>
                  <Text
                    style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                    allowFontScaling={false}>
                    {userByID?.user.tokens} remaining
                  </Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: HeightRatio(40) }}>
                    <TouchableOpacity
                      onPress={() => {
                        setTimeout(() => {
                          insertToken();
                        }, 500)
                      }}
                      style={{ backgroundColor: '#1a2135', padding: HeightRatio(10), margin: HeightRatio(8), borderRadius: HeightRatio(20), width: WidthRatio(100), borderWidth: HeightRatio(2), borderColor: 'white' }}>
                      <Text
                        style={{ color: '#00e5ff', fontSize: HeightRatio(60), fontWeight: 'bold', alignSelf: 'center' }}
                        allowFontScaling={false}>
                        YES
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>

                :
                <View style={{
                  margin: HeightRatio(40),
                  alignSelf: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: HeightRatio(40),
                  width: WidthRatio(130),
                  height: windowWidth / 4
                }}>
                  <Text style={{
                    ...Styling.modal_text_style,
                    alignSelf: 'center',
                    color: 'red'
                  }}
                    allowFontScaling={false}>
                    Unfortunately, you have run out of tokens!
                  </Text>
                </View>
              }

            </View>

            <TouchableOpacity
              onPress={() => {
                props.nav.dispatch(resetActionHome);
                setMainState({
                  stage1: true,
                  stage2: false,
                  stage3: false,
                  stage4: false,
                  stage5: false,
                  stage6: false,
                  stage7: false,
                  stage8: false,
                  stage9: false,
                  stage10: false,
                  currentScore: 0,
                  currentLevel: 0,
                  currentCrashes: 0, 
                  isGameInProgress: false
                })
                setTimeout(() => {
                  setGameOverModalVisible(!gameOverModalVisible);
                  isGameInProgress.current = false;
                }, 500)
              }}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                zIndex: 26,
                top: HeightRatio(670),
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                padding: HeightRatio(10),
                width: HeightRatio(180),
                borderRadius: HeightRatio(20),
                borderWidth: HeightRatio(2),
                borderColor: 'white'
              }}
            >
              <Text
                style={{ color: 'white', fontSize: HeightRatio(40), fontWeight: 'bold', alignSelf: 'center' }}
                allowFontScaling={false}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        }

      </>
    </View>
  );
};