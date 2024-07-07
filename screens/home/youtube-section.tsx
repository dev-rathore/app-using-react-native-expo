import YoutubeFeedCard from "@/components/card/youtube-feed-card";
import { YOUTUBE_FEED_CARDS } from "@/constants/youtube-feed-cards";
import { View } from "react-native";

const YoutubeSection = () => {
  return (
    <View
      style={{
        gap: 16,
      }}
    >
      {
        YOUTUBE_FEED_CARDS.map((data, index) => (
          <YoutubeFeedCard
            time={data.time}
            key={index}
            channel={data.channel}
            thumbnail={data.thumbnail}
            title={data.title}
            views={data.views}
          />
        ))
      }
    </View>
  );
};

export default YoutubeSection;
