import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Game, StartGame } from './screens/index';
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
  const onStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  let content =  <StartGame onStartGame={onStartGame} />
  const title = userNumber ? "Mayor o menor?" : 'Bienvenidos';

  if (userNumber) {
    content = <Game selectedNumber={userNumber} />
  }

  if (!loaded) {
    return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size='large' color={colors.primary} />
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header title={title}/>
      {content}
    </View>
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