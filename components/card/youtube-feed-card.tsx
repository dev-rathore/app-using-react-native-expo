import { Colors } from "@/constants/Colors";
import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

interface YoutubeFeedCardProps {
  channel: string;
  thumbnail: string;
  time: string;
  title: string;
  views: string;
}

const YoutubeFeedCard: React.FC<YoutubeFeedCardProps> = ({
  channel,
  thumbnail,
  time,
  title,
  views,
}) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={{
        backgroundColor: Colors[colorScheme].background,
        overflow: 'hidden',
      }}
    >
      <Image
        source={require('@/assets/images/lions.jpeg')}
        style={{
          height: 200,
          width: '100%',
        }}
      />
      <ThemedView
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <Image
          source={require('@/assets/images/lion.jpeg')}
          style={{
            borderRadius: 20,
            height: 34,
            width: 34,
          }}
        />
        <ThemedView
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              marginTop: -3,
            }}
            fontWeight="fontMedium"
            type="textSm"
          >
            {title}
          </ThemedText>
          <ThemedView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: 6,
            }}
          >
            <ThemedText
              style={styles.description}
              type="textXs"
            >
              {channel}
            </ThemedText>
            <Ionicons
              color={Colors.common.gray}
              name="disc"
              size={3}
            />
            <ThemedText
              style={styles.description}
              type="textXs"
            >
              {views} views
            </ThemedText>
            <Ionicons
              color={Colors.common.gray}
              name="disc"
              size={3}
            />
            <ThemedText
              style={styles.description}
              type="textXs"
            >
              {time}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <Ionicons
          color={Colors[colorScheme].tint}
          name="ellipsis-vertical"
          size={18}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default YoutubeFeedCard;

const styles = StyleSheet.create({
  title: {},
  description: {
    color: Colors.common.gray,
  },
});
