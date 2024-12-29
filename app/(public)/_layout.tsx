import { Stack } from "expo-router";

const PublicStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'ios',
      }}
    >
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default PublicStackLayout;
