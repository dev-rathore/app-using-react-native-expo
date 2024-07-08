import AppLayout from "@/components/app-layout/app-layout";
import PasswordTextInput from "@/components/text-input/password-text-input";
import ThemedTextInput from "@/components/text-input/text-input";
import ThemedButton from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store/auth-store";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    await login(email, password);
  };

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
            source={require('@/assets/animations/walking-robot.json')}
            autoPlay
            style={{
              width: '100%',
              height: 360,
            }}
            loop
          />
        </ThemedView>
        <KeyboardAvoidingView behavior="padding"
          style={{
            gap: 16,
            marginBottom: Platform.OS === 'android' ? 20 : 40,
          }}
        >
          <ThemedText style={styles.title} fontWeight="fontMedium">Login</ThemedText>
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
          <ThemedTextInput
            keyboardType='email-address'
            onChangeText={setEmail}
            onFocus={clearError}
            placeholder='Email'
            value={email}
          />
          <PasswordTextInput
            onChangeText={setPassword}
            onFocus={clearError}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <ThemedButton
            alignSelf="stretch"
            label='Login'
            onPress={handleLogin}
          />
        </KeyboardAvoidingView>
      </ThemedView>
    </AppLayout>
  );
};

export default Login;

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
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
