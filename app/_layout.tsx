import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ModalHeaderText from '@/screens/explore/ModalHeaderText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

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
    checkToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && loaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, loaded]);

  if (!appIsReady || !loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
        onLayout={onLayoutRootView}
      >
        <Stack
          screenOptions={{
            animation: 'ios',
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
          <Stack.Screen
            name="(modals)/booking"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerTransparent: true,
              headerTitle: (props) => <ModalHeaderText />,
              headerLeft: () => (
                Platform.OS === 'ios' && (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                      backgroundColor: '#fff',
                      borderColor: Colors.common.gray,
                      borderRadius: 20,
                      borderWidth: 1,
                      padding: 4,
                    }}
                  >
                    <Ionicons name="close-outline" size={22} />
                  </TouchableOpacity>
                )
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
