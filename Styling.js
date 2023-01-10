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
    backgroundColor: "#3aff0050",
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#84ff4e',
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
    width: HeightRatio(50),
    height: HeightRatio(50),
    borderRadius: 10,
    // backgroundColor: '#1b263b',
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
    color: 'black',
    alignSelf: 'center',
    position: 'absolute',
    top: HeightRatio(-20),
    left: WidthRatio(0),
    zIndex: 12,
  },
  projectile_random_word_letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

  // MODAL STUFF
  modal_centered_view: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modal_view: {
    margin: 20,
    width: windowWidth - WidthRatio(400),
    backgroundColor: "rgba(38, 178, 106, 0.90)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#c5ffff",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 20
  },
  modal_button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#3517bf',
    width: WidthRatio(100)

  },
  modal_button_open: {
    backgroundColor: "#F194FF",
  },
  modal_button_close: {
    backgroundColor: "#2196F3",
  },
  modal_text_style: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modal_text: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold'
  },

  // Powers
  power_block: {}
  

});