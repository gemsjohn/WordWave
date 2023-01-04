import React, { useState, useRef, useEffect } from 'react';
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
  let charHeight = 42;

  setTimeout(() => {
    setLoadingComplete(true)
  }, 1000)


  const CharacterAndJoystick = () => {

    const objectPosition = useRef({ x: 0, y: 0 });
    let yInit = [];

    const [posY, setPosY] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const dx = new Animated.Value(0);
    const dy = new Animated.Value(0);

    dx.setValue(
      pan.x.interpolate({
        // inputRange: [-Infinity, 0, Infinity],
        // outputRange: [0, 0, pan.x],
        inputRange: [0, 0],
        outputRange: [0, 0],
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
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: 0,
            y: pan.y._value
          });
        },
        onPanResponderMove: (e, gestureState) => {
          newY = gestureState.moveY - yInit[0];
          if (newY <= 0) {
            newY = 0;
          } else if (newY >= 360) {
            newY = 360;
          }

          // Update the object's position in state
          objectPosition.current = { x: 0, y: newY };
          setPosY(Math.trunc(objectPosition.current.y));


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
      <View style={Styling.joyStickContainer}>
        {/* <HandleScore score={score._value} /> */}
        <View style={Styling.joyStickInnerContainer}>
          <Animated.View
            style={{
              transform: [{ translateX: 480 }, { translateY: posY }]

            }}
            {...panResponder.panHandlers}
          >
            {/* <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: posY, left: -windowWidth }} /> */}
            <View style={{ right: windowWidth - 100, top: 0, flexDirection: 'row' }} >
              <Image source={require('../../assets/Char_0.png')} style={{ height: charHeight, width: 62 }} />
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 4, height: 23, width: 29, borderRadius: 10, left: -95, top: 16 }}>
                <Text style={{ color: '#ccff33', fontSize: 10 }}>{posY}</Text>
              </View>
            </View>
            <View style={Styling.joyStickKnob} />

          </Animated.View>

        </View>
        <AnimateBlocks charY={posY} charHeight={charHeight} />
        {/* {startGame && <AnimateBlocks charY={posY} />} */}


      </View>
    );
  }


  const AnimateBlocks = (props) => {
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
        duration: 1800,
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
  
    
  
    useEffect(() => {
      if (wordPlusSeven.length > 0) {
        runObstacleAnimation_0();
        runAnimation();
        // runObstacleAnimation_1();
      }
    }, [wordPlusSeven])
  
    useEffect(() => {
      const wordBlockListener = position.addListener((value) => {
        if (value.value <= 96 &&
          value.value > -5) {
          setLetterInXRange(true)
        } else {
          setLetterInXRange(false)
        }
      });
      const obstacleListener_0 = obstaclePosition_0.addListener((value) => {
        if (value.value <= 96 &&
          value.value > -5) {
            // console.log("TRUE!!!!!!!!!!!!!TRUE!!!!!!!!!!!!!!!!!TRUE")
            setObstacleInXRange_0(true)
        } else {
          // console.log("xxxxxxxFLASExxxxxxxxxxFALSExxxxxxxxxxxFALSE")
          setObstacleInXRange_0(false)
        }
      });
      // const obstacleListener_1 = obstaclePosition_1.addListener((value) => {
      //   if (value.value <= 96 &&
      //     value.value > -5) {
      //       setObstacleInXRange_1(true)
      //   } else {
      //     setObstacleInXRange_1(false)
      //   }
      // });
  
      return () => {
        position.removeListener(wordBlockListener);
        obstaclePosition_0.removeListener(obstacleListener_0)
        // obstaclePosition_1.removeListener(obstacleListener_1)
      }
    }, []);
  
    useEffect(() => {
        try {
          if (letterInXRange) {
            if (props.charY >= yPos - yCalibrated && props.charY <= yPos + 50 + yCalibrated) {
              setLetterPocket(prevItems => [...prevItems, letter])
              animation.current.reset()
            }
          }
        } catch {
          console.log("MISS")
        }
    }, [letterInXRange])
    useEffect(() => {
      try {
        if (obstacleInXRange_0) {
          if (props.charY >= obstacleYPos_0 - props.charHeight && props.charY <= obstacleYPos_0+50) {
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
  // useEffect(() => {
  //   try {
  //     if (obstacleInXRange_1) {
  //       if (props.charY >= obstacleYPos_1 - yCalibrated && props.charY <= yPos + 50 + yCalibrated) {
  //         let setCrashNum = prevCrashes.current + wrongElements.length + 1;
  //         crashes.current = setCrashNum;
  //         animation.current.reset()
  //       }
  //     }
  //   } catch {
  //     console.log("MISS")
  //   }
  // }, [obstacleInXRange_1])
  
    
  
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
          
          <TouchableOpacity onPress={() => { Generate() }} style={{ position: 'absolute', left: windowWidth/2 - 25, top: -5 }}>
            <Image source={require('../../assets/button_play.png')} style={{ height: 50, width: 50 }}></Image>
          </TouchableOpacity>
          {score.current > 0 ?
          <View style={{position: 'absolute', bottom: - windowHeight + 100, left: windowWidth/2 - 50}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 40}}>Score: {score.current}</Text>
          </View>
          :
          <View style={{position: 'absolute', bottom: - windowHeight + 100, left: windowWidth/2 - 50}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 40}}>Score: 0</Text>
          </View>
          }
  
          {/* <TouchableOpacity onPress={() => {animation.stop(); isRunning.current = false;}} style={{ position: 'absolute', left: 450, top: -30 }}>
              <Image source={require('../../assets/pauseBTN.png')} style={{ height: 50, width: 50 }}></Image>
            </TouchableOpacity> */}
  
          {/* Letter Blocks */}
          <Animated.View
            style={[
              Styling.block,
              {
                // transform: [{ translateX: position }, { translateY: yPos + yCalibrated }],
                transform: [
                  { translateX: position }, 
                  { translateY: yPos + yCalibrated }
                ],

              },
            ]}
          >
            <Text ref={letterRef} style={Styling.letter}>
              {letter.toUpperCase()}
            </Text>
          </Animated.View>
          
          {/* Obstacles */}
          {/* <Animated.View
            style={[
              Styling.obstacleBlock,
              {
                transform: [{ translateX: obstaclePosition_0 }, { translateY: obstacleYPos_0 }],
              },
            ]}
          >
          </Animated.View> */}

          {/* <Animated.View
            style={[
              Styling.obstacleBlock,
              {
                transform: [{ translateX: obstaclePosition_1 }, { translateY: obstacleYPos_1 + yCalibrated }],
              },
            ]}
          >
          </Animated.View> */}
  
          {/* <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', position: 'absolute', zIndex: -7, top: obstacleYPos_0, left: 12, height: 50, width: windowWidth}} >
            <Text style={{color: 'white'}}>{obstacleYPos_0}</Text>
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
              <Text style={Styling.randomWordLetter}>{l.toUpperCase()}</Text>
            </View>
          ))}
          {crashes.current > 0 ?
          <>
          {Array.from(Array(crashes.current).keys()).map((n, i) => (
            <View style={{
              width: 40, position: 'absolute', top: windowHeight - 60, left: (windowWidth/2 + 200 + (i * 50)),
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
            <View style={{ backgroundColor: 'white', height: 1, width: windowWidth, position: 'absolute', zIndex: -5, top: windowHeight / 2 }} />
            <View style={{ backgroundColor: 'white', width: 1, height: windowHeight, position: 'absolute', zIndex: -5, left: windowWidth / 2 }} />
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