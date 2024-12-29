import { Slot, Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/auth-store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutStack = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const token = useAuthStore((state) => state.token);

  const segments = useSegments();
  const router = useRouter();

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        useAuthStore.setState({ token: storedToken });
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    if (!appIsReady) {
      checkToken();
      return;
    }

    // const inAuthGroup = segments[0] === "(auth)";
    // const inMainGroup = segments[0] === "(main)";

    if (token) {
      setTimeout(() => {
        router.replace("/(main)/(tabs)/home");
      }, 3000);
    } else if (!token) {
      setTimeout(() => {
        router.replace("/(auth)/get-started");
      }, 3000);
    }
  }, [token, appIsReady]);

  return (
    <Stack>
      <Stack.Screen
        name="(main)"
        options={{ headerShown: false }}
      // redirect={!!token}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      // redirect={!!token}
      />
      <Stack.Screen
        name="(modals)"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(public)"
        options={{ headerShown: false }}
      />
    </Stack>
  )
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <GestureHandlerRootView>
        <RootLayoutStack />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
