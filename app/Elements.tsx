import React from 'react';
import { StyleSheet } from 'react-native';
import * as HE from '@expo/html-elements';
import { useFonts } from '@use-expo/font';

export function useAppFonts() {
  return useFonts({
    'Inter-BlackItalic': require('./assets/fonts/Inter/Inter-BlackItalic.otf'),
    'Inter-Black': require('./assets/fonts/Inter/Inter-Black.otf'),
    'Inter-BoldItalic': require('./assets/fonts/Inter/Inter-BoldItalic.otf'),
    'Inter-Bold': require('./assets/fonts/Inter/Inter-Bold.otf'),
    'Inter-ExtraBoldItalic': require('./assets/fonts/Inter/Inter-ExtraBoldItalic.otf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter/Inter-ExtraBold.otf'),
    'Inter-ExtraLightItalic': require('./assets/fonts/Inter/Inter-ExtraLightItalic.otf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter/Inter-ExtraLight.otf'),
    'Inter-Italic': require('./assets/fonts/Inter/Inter-Italic.otf'),
    'Inter-LightItalic': require('./assets/fonts/Inter/Inter-LightItalic.otf'),
    'Inter-Light': require('./assets/fonts/Inter/Inter-Light.otf'),
    'Inter-MediumItalic': require('./assets/fonts/Inter/Inter-MediumItalic.otf'),
    'Inter-Medium': require('./assets/fonts/Inter/Inter-Medium.otf'),
    'Inter-Regular': require('./assets/fonts/Inter/Inter-Regular.otf'),
    'Inter-SemiBoldItalic': require('./assets/fonts/Inter/Inter-SemiBoldItalic.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter/Inter-SemiBold.otf'),
    'Inter-ThinItalic': require('./assets/fonts/Inter/Inter-ThinItalic.otf'),
    'Inter-Thin': require('./assets/fonts/Inter/Inter-Thin.otf'),
  });
}

export function H1(props, context) {
  return <HE.H1 {...props} style={[{ fontFamily: 'Inter-Black' }, props.style]} />;
}
