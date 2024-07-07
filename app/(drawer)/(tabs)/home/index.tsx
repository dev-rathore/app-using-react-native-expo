import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import { Colors } from '@/constants/Colors';
import UdemySection from '@/screens/home/udemy-section';
import YoutubeSection from '@/screens/home/youtube-section';
import ThemedTouchableHighlight from '@/components/touchable-highlight/touchable-highlight';

type HomeScreenProps = {};

const HOME_SCREEN_NAV_ITEMS = [
  {
    label: 'All',
  },
  {
    label: 'Live',
  },
  {
    label: 'JavaScript',
  },
  {
    label: 'Science Fiction',
  },
  {
    label: 'Cricket',
  },
];

const HomeScreen:React.FC<HomeScreenProps> = () => {
  const [selectedNavItem, setSelectedNavItem] = useState<string>('All');

  const navigation = useNavigation();

  return (
    <AppLayout>
      <ThemedView
        style={{
          flexDirection: 'row',
          gap: 8,
          padding: 16,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <View
            style={{
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }}
          >
            <Ionicons
              name='menu'
              size={28}
              style={[{
                color: 'white',
                marginBottom: -2,
              }]}
            />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          contentContainerStyle={{
            gap: 8,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            HOME_SCREEN_NAV_ITEMS.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => setSelectedNavItem(item.label)}
              >
                <View
                  style={{
                    backgroundColor: selectedNavItem === item.label ? Colors.common.green : 'transparent',
                    borderColor: selectedNavItem === item.label ? Colors.common.green : 'white',
                    borderRadius: 25,
                    borderWidth: 1,
                    minWidth: 60,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                  }}
                >
                  <ThemedText
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {item.label}
                  </ThemedText>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
      </ThemedView>
      <ScrollView
        style={{
          gap: 28,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <YoutubeSection />
        <UdemySection />
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 32,
          }}
        >
          <ThemedTouchableHighlight
            onPress={() => router.push("/(tabs)/home/infinite-scroll-screen")}
            alignSelf='center'
          >
            Infinite Scroll Screen
          </ThemedTouchableHighlight>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
