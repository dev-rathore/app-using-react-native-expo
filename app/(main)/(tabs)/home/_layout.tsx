import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'ios',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="infinite-scroll"
        options={{
          headerBackTitleVisible: false,
          title: 'Infinite Scroll',
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
