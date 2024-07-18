import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Providers
import { ThemeProvider } from '@react-navigation/native';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

/**
 * https://www.npmjs.com/package/react-native-keyboard-controller
 * import { KeyboardProvider } from 'react-native-keyboard-controller';
 *
 *  On Development build you can wrap the Stack into a KeyboardProvider to handle the keyboard avoiding the  screen to be pushed up by the keyboard.
 *
 *  NOTE: On Expo Go the KeyboardProvider is not working since you need to link it to native.
 *
 *  Install: pnpm add react-native-keyboard-controller
 *
 *  Wrap the Stack with the KeyboardProvider -
 * <KeyboardProvider statusBarTranslucent navigationBarTranslucent></KeyboardProvider>
 */

// Theme
import { NAV_THEME } from '@/theme';
import { useColorScheme } from 'nativewind';
import '../../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

const clerkApiKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme, setColorScheme } = useColorScheme();

  //initial colorScheme
  useEffect(() => {
    if (colorScheme === 'light') {
      setColorScheme('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        key={`root-status-bar-${colorScheme === 'dark' ? 'light' : 'dark'}`}
      />

      <ClerkProvider publishableKey={clerkApiKey} tokenCache={tokenCache}>
        <ThemeProvider value={NAV_THEME[colorScheme]}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <ClerkLoaded>
                <Stack screenOptions={{ animation: 'ios' }}>
                  <Stack.Screen name="(root)" options={{ headerShown: false }} />
                </Stack>
              </ClerkLoaded>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
}
