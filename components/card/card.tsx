import { StyleSheet, View } from 'react-native';

import { ThemedText } from '../ThemedText';
import { ReactElement } from 'react';

export type CardProps = {
  actualPrice: number;
  instructor: string;
  rating: number;
  salePrice: number;
  tag?: string;
  thumbnail: ReactElement;
  title: string;
  totalRatings: number;
};

export default function Card({
  actualPrice,
  instructor,
  rating,
  salePrice,
  tag,
  thumbnail,
  title,
  totalRatings,
}: CardProps) {
  return (
    <View
      style={{
        width: 230,
        gap: 2,
      }}
    >
      {thumbnail}
      <ThemedText type="textBase" fontWeight='fontBold'>{title}</ThemedText>
      <ThemedText type="textXs">{instructor}</ThemedText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <ThemedText
          type="textXs"
          fontWeight='fontMedium'
        >
          {rating}
        </ThemedText>
        <ThemedText
          type="textXs"
        >
          ({totalRatings.toLocaleString()})
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 6,
        }}
      >
        <ThemedText
          type="textBase"
          fontWeight="fontMedium"
        >
          ${salePrice}
        </ThemedText>
        <ThemedText
          type="textXs"
          style={{textDecorationLine: 'line-through'}}
        >
          ${actualPrice.toLocaleString()}
        </ThemedText>
      </View>
      {tag ? (
        <View
          style={{
            backgroundColor: '#FFD700',
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 2,
            alignSelf: 'flex-start'
          }}
        >
          <ThemedText type='textXs' fontWeight='fontMedium'>
            {tag}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}
