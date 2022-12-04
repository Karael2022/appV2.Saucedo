import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Game, GameOver, StartGame } from './screens/index';
import React, { useState } from 'react';

import { Header } from './components';
import colors from './constants/colors';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
  })
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);

  const onStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const onRestart = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  const onGameOver = (rounds) => {
    setGuessRounds(rounds);
   }

  let content =  <StartGame onStartGame={onStartGame} />

  const getTitle = () => {
    let title;
    if(userNumber && guessRounds <= 0) {
      title = 'Guess a Number';
    } else if (guessRounds > 0) {
      title = 'Game Over';
    } else {
      title = 'Welcome';
    }
    return title;
  }

  if (userNumber && guessRounds <= 0) {
    content = <Game selectedNumber={userNumber} onGameOver={onGameOver} />
  } else if (guessRounds > 0) {
    content = <GameOver rounds={guessRounds} selectedNumber={userNumber} onRestart={onRestart} />
  }

  if (!loaded) {
    return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size='large' color={colors.primary} />
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={getTitle()}/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  }
});