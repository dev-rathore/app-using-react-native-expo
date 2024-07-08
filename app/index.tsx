import AppLayout from "@/components/app-layout/app-layout";
import ThemedButton from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Platform, StyleSheet } from "react-native";

const GetStarted: React.FC = () => {
  const router = useRouter();

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        <ThemedView
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <LottieView
            source={require('@/assets/animations/man-cycling.json')}
            autoPlay
            style={{
              width: '100%',
              height: 320,
            }}
            loop
          />
        </ThemedView>
        <ThemedView
          style={{
            gap: 16,
            marginBottom: Platform.OS === 'android' ? 20 : 40,
          }}
        >
          <ThemedText style={styles.title} fontWeight="fontMedium">Get Started</ThemedText>
          <ThemedButton
            alignSelf="stretch"
            label='Register'
            onPress={() => router.push("/(auth)/register")}
          />
          <ThemedButton
            alignSelf="stretch"
            label='Login'
            onPress={() => router.push("/(auth)/login")}
          />
        </ThemedView>
      </ThemedView>
    </AppLayout>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
