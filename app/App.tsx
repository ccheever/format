import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { A } from '@expo/html-elements';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginForm } from './Login';
import { useAppFonts, H1, H2, H3, H4, H5, H6, P } from './Elements';

let Stack = createStackNavigator();

function HeadersDemoScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <H1>Heading One</H1>
      <H2>Heading Two</H2>
      <H3>Heading Three</H3>
      <H4>Heading Four</H4>
      <H5>Heading Five</H5>
      <H6>Heading Six</H6>
      <P>Paragraph Text</P>
    </View>
  );
}

export default function App() {
  // console.log('render');
  let [appState, setAppState] = useState('SPLASH');
  let [isLoaded] = useAppFonts();

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HeadersDemoScreen}
          options={{
            title: 'Style Showcase',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return <HeadersDemoScreen />;

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
