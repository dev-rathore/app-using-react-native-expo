import AppLayout from "@/components/app-layout/app-layout";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const GetStarted: React.FC = () => {
  const router = useRouter();

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Get Started</Text>
        <Button
          title='Register'
          onPress={() => router.push("/(auth)/register")}
        />
        <Button
          title='Login'
          onPress={() => router.push("/(auth)/login")}
        />
      </View>
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
    color: 'white',
    fontSize: 24,
    textAlign: "center",
  },
});
