import AppLayout from "@/components/app-layout/app-layout";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

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
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          keyboardType='email-address'
          onChangeText={setEmail}
          onFocus={clearError}
          placeholder='Email'
          placeholderTextColor={'grey'}
          style={styles.input}
          value={email}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            onChangeText={setPassword}
            onFocus={clearError}
            placeholder="Enter your password"
            placeholderTextColor={'grey'}
            secureTextEntry={!isPasswordVisible}
            style={styles.passwordInput}
            value={password}
          />
          <TouchableWithoutFeedback onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="gray"
            />
          </TouchableWithoutFeedback>
        </View>
        <Button
          title='Login'
          onPress={handleLogin}
        />
      </View>
    </AppLayout>
  );
};

export default Login;

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
  error: {
    color: 'red',
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'white',
    padding: 8,
  },
  passwordInput: {
    color: 'white',
    flex: 1,
    paddingVertical: 8,
  },
  passwordInputContainer: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  toggleButton: {
    padding: 5,
  },
});
