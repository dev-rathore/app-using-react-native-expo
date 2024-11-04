import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import LottieView from 'lottie-react-native';
import { ThemedText } from '@/components/ThemedText';

const Settings: React.FC = () => {
  return (
    <AppLayout>
      <ThemedText
        type='textXl'
        fontWeight='fontBold'
        style={{
          textAlign: 'center',
          paddingTop: 40,
        }}
      >
        Settings
      </ThemedText>
      <ThemedText
        type='textBase'
        style={{
          textAlign: 'center',
          paddingTop: 40,
        }}
      >
        Work in Progress...
      </ThemedText>
      <ThemedView
        style={{
          paddingTop: 60,
          paddingHorizontal: 40,
          flex: 1,
        }}
      >
        <LottieView
          source={require('@/assets/animations/cow.json')}
          autoPlay
          style={{
            width: '100%',
            height: 320,
          }}
          loop
        />
      </ThemedView>
    </AppLayout>
  );
};

export default Settings;

const styles = StyleSheet.create({});
