import AppLayout from '@/components/app-layout/app-layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function TabFiveScreen() {
  return (
    <AppLayout>
      <ThemedView
        style={{
          padding: 8,
        }}
      >
        <ThemedText>Settings</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({});
