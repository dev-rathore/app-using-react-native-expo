import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import Card from '@/components/card/card';
import { Image, ScrollView, StyleSheet } from 'react-native';

export default function TabThreeScreen() {
  return (
    <AppLayout>
      <ThemedView
        style={{
          padding: 8,
        }}
      >
        <ThemedView
          style={{
            gap: 8,
          }}
        >
          <ThemedText type="textXl" fontWeight='fontBold'>Recommended for you</ThemedText>
          <ScrollView
            contentContainerStyle={{
              gap: 8,
            }}
            horizontal={true}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                actualPrice={2999}
                instructor="Robin & Jesper"
                rating={4.5}
                salePrice={499}
                thumbnail={
                  <Image
                    source={require('@/assets/images/card-image.jpeg')}
                    style={{
                      width: 230,
                      height: 140,
                    }}
                  />
                }
                title="The Complete Digital Marketing Guide - 25 Courses in 1"
                totalRatings={33612}
                tag='Bestseller'
              />
            ))}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({});
