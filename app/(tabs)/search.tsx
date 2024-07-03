import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ThemedView
      style={{
        padding: 8,
      }}
    >
      <ThemedText>Search</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
