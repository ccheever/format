import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export function useFonts(fontMap) {
  let [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync(fontMap);
      setFontsLoaded(true);
    })();
  });
  return [fontsLoaded];
}
