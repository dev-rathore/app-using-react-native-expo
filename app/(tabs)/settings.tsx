import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function TabFiveScreen() {
  return (
    <ThemedView
      style={{
        padding: 8,
      }}
    >
      <ThemedText>Settings</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
