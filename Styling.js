import { StyleSheet, Dimensions, StatusBar, PixelRatio } from 'react-native';

// - - - - - - - - - - - - - - -  -
// * * * * * * * * * * * * * * * * *
// HEIGHT AND WIDTH HAVE BEEN REVERSED 
// TO ACCOMIDATE PORTAIT VS LANDSCAPE TRANSITIONS
// * * * * * * * * * * * * * * * * *
// - - - - - - - - - - - - - - -  -


export const windowWidth = Dimensions.get('window').height;
export const windowHeight = Dimensions.get('window').width;

const {
  width: SCREEN_HEIGHT,
  height: SCREEN_WIDTH,
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

export const CustomWidthRatio = (size, width) => {
  const scaleWidth = width / 360;
  const newSize = size * scaleWidth;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const CustomHeightRatio = (size, height) => {
  const scaleHeight = height / 800;
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const Styling = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#240046',

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
    width: HeightRatio(120),
    height: HeightRatio(120),
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
    width: WidthRatio(24),
    height: WidthRatio(24),
    // borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  projectile_letter: {
    fontSize: HeightRatio(55),
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    position: 'absolute',
    top: HeightRatio(-20),
    left: WidthRatio(0),
    zIndex: 12,
  },
  projectile_random_word_letter: {
    fontSize: HeightRatio(70),
    fontWeight: 'bold',
    color: 'black',
  },

  // MODAL STUFF
  modal_centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: HeightRatio(-30)
    // marginTop: 22,
  },
  modal_view: {
    margin: HeightRatio(20),
    width: '100%',
    backgroundColor: "rgba(0, 0, 0, 1.0)",
    // borderRadius: 20,
    padding: HeightRatio(35),
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
    fontSize: HeightRatio(50),
    fontWeight: "bold",
    textAlign: "left",
    marginTop: HeightRatio(5)
  },
  modal_text: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold'
  },

  // Special
  special_block: {
    position: 'absolute',
    zIndex: -5,
    top: HeightRatio(140),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white'
  },

  // WORDLIT 
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  label: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  section: {
    marginVertical: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 50
  },
  newcontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  circlecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  circle: {
    width: HeightRatio(40),
    height: HeightRatio(40),
    borderRadius: 20,
    margin: 10,
  },
  difficultyButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
    margin: 10,
    width: windowWidth / 3 - 1,
    height: windowHeight / 12,
    flexDirection: 'row'
  },
  difficultyText: {
    color: '#001219',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 4,
    borderColor: 'white',
    color: 'white',
    width: windowWidth - 80,
    alignSelf: 'center',
    height: windowHeight / 3,
    borderRadius: 10,
    padding: 30
  },
  sendButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 40,
    alignSelf: 'center',
    margin: 10,
    width: windowWidth - 80,
    flexDirection: 'row'
  },
  sendButtonText: {
    color: '#001219',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  gridBlock: {
    height: windowWidth * 0.14,
    width: windowWidth * 0.14,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  modalDivisionLine: {
    borderColor: '#4cc9f0',
    borderBottomWidth: 1,
    width: WidthRatio(320),
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#d90429'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#4361ee",
    borderRadius: 10,
    padding: 20
  },
  textStyle: {
    color: "white",
    fontSize: HeightRatio(25),
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
    fontSize: HeightRatio(30),
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // container: {
  //   flex: 1,
  //   // backgroundColor: 'black',
  //   // marginTop: 30
  // },
  scrollContainer: {
    // paddingTop: StatusBar.currentHeight,
  },
  flatlistContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight - 20 || 0,
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderBottomLeftRadius: 25,
    padding: 10,
    width: windowWidth - 20,
    flexDirection: 'column',
    margin: 10,
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 15,
    marginTop: 2
  },
  title: {
    fontSize: 32,
  },
  letters: {
    alignSelf: 'center',
    fontSize: HeightRatio(44),
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  textInputStyle: {
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: HeightRatio(40),
    border: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: HeightRatio(80),
    alignSelf: 'center',
    margin: HeightRatio(20),
    width: WidthRatio(160)
  },
  profileContainer: {
    // paddingTop: StatusBar.currentHeight,
  },
  profileScrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: -20,
    alignSelf: "center",
    width: 450,
    // height: '100%',
    marginTop: 10
  },
  modalWordButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 40,
    alignSelf: 'center',
    // margin: 10,
    width: 350,
    flexDirection: 'row'
  },
  modalWordButtonText: {
    color: '#001219',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  modalFontAwesomeIcons: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10
  },
  profileDivisionLine: {
    borderColor: 'white',
    borderBottomWidth: 2,
    width: WidthRatio(150),
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  gameScrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: -20,
  },
  gameCenteredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  guessBlock: {
    height: WidthRatio(60),
    width: WidthRatio(60),
    // margin: 2,
    marginLeft: WidthRatio(4),
    marginRight: WidthRatio(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00b4d8',
    borderWidth: WidthRatio(4),
    borderRadius: WidthRatio(5)
  },
  guessBlocks: {
    height: WidthRatio(30),
    width: WidthRatio(30),
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth - 20,
    height: windowHeight - 80
  },
  modalContentHeader: {
    color: '#4cc9f0',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContent: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  modalScoringVarText: {
    color: 'white',
    fontSize: HeightRatio(80),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row'
  },
  telePadButtonSelected: {
    padding: 6,
    margin: 2,
    borderWidth: 0.5,
    borderColor: '#aaf683',
    width: WidthRatio(100),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  telePadButton: {
    padding: 6,
    margin: 2,
    borderWidth: 0.5,
    borderColor: 'white',
    width: WidthRatio(100),
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  telePadButtonText: {
    fontSize: HeightRatio(20),
    color: 'white'
  }
});



