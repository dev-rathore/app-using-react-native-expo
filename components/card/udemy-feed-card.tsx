import { ThemedText } from '../ThemedText';
import { ReactElement } from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '../ThemedView';

export type UdemyFeedCardProps = {
  actualPrice: number;
  instructor: string;
  rating: number;
  salePrice: number;
  tag?: string;
  thumbnail: ReactElement;
  title: string;
  totalRatings: number;
};

const UdemyFeedCard = ({
  actualPrice,
  instructor,
  rating,
  salePrice,
  tag,
  thumbnail,
  title,
  totalRatings,
}: UdemyFeedCardProps) => {
  return (
    <ThemedView
      style={{
        width: 230,
        gap: 2,
      }}
    >
      {thumbnail}
      <ThemedText type="textBase" fontWeight='fontBold'>{title}</ThemedText>
      <ThemedText type="textXs">{instructor}</ThemedText>
      <ThemedView
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
        }}
      >
        <ThemedText
          fontWeight='fontMedium'
          type="textXs"
        >
          {rating}
        </ThemedText>
        <ThemedText
          type="textXs"
        >
          ({totalRatings.toLocaleString()})
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
        }}
      >
        <ThemedText
          fontWeight="fontMedium"
          type="textBase"
        >
          ${salePrice}
        </ThemedText>
        <ThemedText
          type="textXs"
          style={{textDecorationLine: 'line-through'}}
        >
          ${actualPrice.toLocaleString()}
        </ThemedText>
      </ThemedView>
      {tag ? (
        <ThemedView
          style={{
            alignSelf: 'flex-start',
            backgroundColor: Colors.common.green,
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}
        >
          <ThemedText
            type='textXs'
            fontWeight='fontMedium'
            style={{
              color: Colors.common.white,
              paddingHorizontal: 4,
              paddingVertical: 2,
            }}
          >
            {tag}
          </ThemedText>
        </ThemedView>
      ) : null}
    </ThemedView>
  );
};

export default UdemyFeedCard;
