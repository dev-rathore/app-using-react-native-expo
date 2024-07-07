import AppLayout from '@/components/app-layout/app-layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedTouchableHighlight from '@/components/touchable-highlight/touchable-highlight';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Explore() {
  return (
    <AppLayout>
      <ThemedView
        style={{
          padding: 8,
        }}
      >
        <ThemedText>Explore</ThemedText>
        <ThemedTouchableHighlight
          onPress={() => router.push("/(tabs)/home/infinite-scroll-screen")}
          alignSelf='center'
        >
          Infinite Scroll Screen
        </ThemedTouchableHighlight>
      </ThemedView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({});
