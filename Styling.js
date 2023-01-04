import { StyleSheet, Dimensions, StatusBar, PixelRatio } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scaleWidth = SCREEN_WIDTH / 360;
const scaleHeight = SCREEN_HEIGHT / 800;

export const WidthRatio = (size) => {
  const newSize = size * scaleWidth;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const HeightRatio = (size) => {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const Styling = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    // backgroundColor: '#240046',
    marginTop: 30
  },
  joyStickContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 0
  },
  joyStickKnob: {
    backgroundColor: "rgba(111, 245, 122, 0.5)",
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    top: 0
  },
  joyStickInnerContainer: {
    position: 'absolute', 
    bottom: HeightRatio(windowHeight), 
    left: WidthRatio(151), 
    zIndex: 20, top: 0
  },

  // Blocks, Obstacles
  block: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1b263b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
  },
  obstacleBlock: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  wordBox: {
    width: 300, position: 'absolute', top: -40, left: 550,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#43bccd',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: ''
  },
  letter: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#e0e1dd',
    alignSelf: 'center'
  },
  randomWordLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

});