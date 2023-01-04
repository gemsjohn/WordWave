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
  joystick_container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    // marginTop: 10,
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 0
  },
  joystick_knob: {
    backgroundColor: "rgba(111, 245, 122, 0.5)",
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    top: 0
  },
  joystick_inner_container: {
    position: 'absolute', 
    bottom: HeightRatio(windowHeight), 
    left: WidthRatio(151), 
    zIndex: 20, top: 0
  },

  // Blocks, Obstacles
  projectile_word_block: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1b263b',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
  },
  projectile_obstacle_block: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  projectile_letter: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#e0e1dd',
    alignSelf: 'center'
  },
  projectile_random_word_letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

  // MODAL STUFF
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});