import UdemyFeedCard from "@/components/card/udemy-feed-card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UDEMY_FEED_CARDS } from "@/constants/udemy-feed-cards";
import { Image, ScrollView } from "react-native";

const UdemySecion = () => {
  return (
    <ThemedView
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <ThemedView
        style={{
          gap: 16,
        }}
      >
        <ThemedText type="textXl" fontWeight='fontBold'>Recommended for you</ThemedText>
        <ScrollView
          contentContainerStyle={{
            gap: 8,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {UDEMY_FEED_CARDS.map((data, index) => (
            <UdemyFeedCard
              key={index}
              actualPrice={data.actualPrice}
              instructor={data.instructor}
              rating={data.rating}
              salePrice={data.salePrice}
              thumbnail={
                <Image
                  source={require('@/assets/images/card-image.jpeg')}
                  style={{
                    width: 230,
                    height: 140,
                  }}
                />
              }
              title={data.title}
              totalRatings={data.totalRatings}
              tag={data.tag}
            />
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
};

export default UdemySecion;
