import AppLayout from "@/components/app-layout/app-layout";
import ThemedButton from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const GetStarted: React.FC = () => {
  const router = useRouter();

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} fontWeight="fontMedium">Get Started</ThemedText>
        <ThemedButton
          label='Register'
          onPress={() => router.push("/(auth)/register")}
        />
        <ThemedButton
          label='Login'
          onPress={() => router.push("/(auth)/login")}
        />
      </ThemedView>
    </AppLayout>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
