import AppLayout from "@/components/app-layout/app-layout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LottieView from "lottie-react-native";
import { Platform, View } from "react-native";

const Teddy = () => {
  return (
    <AppLayout>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: Platform.OS === 'android' ? 24 : 48,
        }}
      >
        <View>
          <ThemedView style={{ flexDirection: 'row', paddingHorizontal: 30 }}>
            <ThemedText type='textLg' style={{ textAlign: 'center' }}>Hi, I am Teddy. Nice to meet you. Have a Great Day :)</ThemedText>
          </ThemedView>
        </View>
      </View>
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <LottieView
          source={require('@/assets/animations/teddy.json')}
          autoPlay
          style={{
            width: '100%',
            height: 360,
          }}
          loop
        />
      </ThemedView>
    </AppLayout>
  );
};

export default Teddy;
