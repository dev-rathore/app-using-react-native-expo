import AppLayout from '@/components/app-layout/app-layout';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

type ReelScreenProps = {};

const ReelScreen: React.FC<ReelScreenProps> = (props) => {
  return (
    <AppLayout>
      <View
        style={styles.container}
      >
        <ImageBackground
          resizeMode='cover'
          source={require('@/assets/images/animated-monkey.jpeg')}
          style={styles.image}
        >
          <View
            style={styles.cameraContainer}
          >
            <Ionicons
              color='white'
              name='camera-outline'
              size={30}
            />
          </View>
          <View
            style={styles.iconsContainer}
          >
            <View
              style={styles.iconContainer}
            >
              <Ionicons
                color='white'
                name='heart-outline'
                size={30}
              />
              <Text
                style={styles.iconText}
              >
                110 k
              </Text>
            </View>
            <View
              style={styles.iconContainer}
            >
              <Ionicons
                color='white'
                name='chatbubbles-outline'
                size={30}
              />
              <Text
                style={styles.iconText}
              >
                2,812
              </Text>
            </View>
            <View
              style={styles.iconContainer}
            >
              <Ionicons
                color='white'
                name='paper-plane-outline'
                size={30}
              />
              <Text
                style={
                  styles.iconText
                }
              >
                10 k
              </Text>
            </View>
            <View>
              <Ionicons
                color='white'
                name='ellipsis-horizontal'
                size={30}
              />
            </View>
          </View>
          <View
            style={styles.textContainer}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <Ionicons
                color='white'
                name='person-circle-outline'
                size={30}
              />
              <Text
                style={styles.iconText}
              >
                @thisismyusername
              </Text>
              <View
                style={{
                  borderColor: 'white',
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  Follow
                </Text>
              </View>
            </View>
            <Text
              style={styles.iconText}
            >
              This is some description
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <Ionicons
                color='white'
                name='musical-notes-outline'
                size={20}
              />
              <ScrollView
                contentContainerStyle={{
                  gap: 8,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Text
                  style={styles.iconText}
                >
                  I am the name of the song
                </Text>
                <Text
                  style={styles.iconText}
                >
                  I am the artist of this song
                </Text>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </AppLayout>
  );
};

export default ReelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    bottom: 0,
    gap: 16,
    left: 0,
    padding: 16,
    paddingBottom: 24,
    position: 'absolute',
    width: '85%',
  },
  cameraContainer: {
    padding: 16,
    paddingTop: 28,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  iconsContainer: {
    bottom: 0,
    gap: 28,
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  iconContainer: {
    gap: 8,
  },
  iconText: {
    color: 'white',
  }
});
