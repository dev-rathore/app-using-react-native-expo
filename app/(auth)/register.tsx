import AppLayout from "@/components/app-layout/app-layout";
import PasswordTextInput from "@/components/text-input/password-text-input";
import ThemedTextInput from "@/components/text-input/text-input";
import ThemedButton from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { StyleSheet } from "react-native";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      useAuthStore.setState({ error: 'Passwords do not match' });
      return;
    }

    await register(name, email, password);
  };

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} fontWeight="fontMedium">Register</ThemedText>
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <ThemedTextInput
          onChangeText={setName}
          onFocus={clearError}
          placeholder='Name'
          value={name}
        />
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
        <PasswordTextInput
          onChangeText={setConfirmPassword}
          onFocus={clearError}
          placeholder="Confirm your password"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          isPasswordVisible={isConfirmPasswordVisible}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
        />
        <ThemedButton
          label='Register'
          onPress={handleRegister}
        />
      </ThemedView>
    </AppLayout>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
