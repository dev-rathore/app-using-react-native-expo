import { Stack } from "expo-router";

const AuthStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'ios',
        headerShown: false,
      }}
    >
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthStackLayout;
