import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { A, H6 } from '@expo/html-elements';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import { LoginForm } from './Login';
import { useAppFonts, H1 } from './Elements';

export default function App() {
  let [appState, setAppState] = useState('SPLASH');
  let [isLoaded] = useAppFonts();

  if (!isLoaded) {
    return <AppLoading />;
  }

  switch (appState) {
    case 'SPLASH':
      return (
        <View style={styles.container}>
          <A
            onPress={() => {
              setAppState('LOGIN');
            }}>
            <H1>Format</H1>
          </A>
        </View>
      );
    case 'LOGIN':
    default:
      return (
        <View style={styles.container}>
          <LoginForm />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
