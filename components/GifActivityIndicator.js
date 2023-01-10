import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const GifActivityIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (

      <Image source={require('../assets/projectile_fire_ball.gif')} style={styles.gif} />

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 110,
    height: 48,
  },
});

