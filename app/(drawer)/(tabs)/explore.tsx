import AppLayout from '@/components/app-layout/app-layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
      </ThemedView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({});
