import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <View
      style={{
        backgroundColor: Colors.common.dark,
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
      <View
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
        <View
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
          <View
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
          </View>
        </View>
        <Ionicons
          color={Colors.common.white}
          name="ellipsis-vertical"
          size={18}
        />
      </View>
    </View>
  );
};

export default YoutubeFeedCard;

const styles = StyleSheet.create({
  title: {},
  description: {
    color: Colors.common.gray,
  },
});
