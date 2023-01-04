import React, { useState } from 'react';
import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';
import { Game } from './Game/Game';

const language = 'en'
export const HomeScreen = ({ navigation, route }) => {
  return (
    <Home nav={navigation} lang={language}  />
  )
}
export const GameScreen = ({ navigation, route }) => {
  return (
    <Game nav={navigation} lang={language}  />
  )
}
export const ProfileScreen = ({ navigation, route }) => {
  return (
    <Profile nav={navigation} lang={language} />
  );
}

