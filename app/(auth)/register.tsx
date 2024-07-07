import AppLayout from "@/components/app-layout/app-layout";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

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
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          onChangeText={setName}
          onFocus={clearError}
          placeholder='Name'
          placeholderTextColor={'grey'}
          style={styles.input}
          value={name}
        />
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
        <View style={styles.passwordInputContainer}>
          <TextInput
            onChangeText={setConfirmPassword}
            onFocus={clearError}
            placeholder="Confirm your password"
            placeholderTextColor={'grey'}
            secureTextEntry={!isConfirmPasswordVisible}
            style={styles.passwordInput}
            value={confirmPassword}
          />
          <TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility} style={styles.toggleButton}>
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="gray"
            />
          </TouchableWithoutFeedback>
        </View>
        <Button
          title='Register'
          onPress={handleRegister}
        />
      </View>
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
    color: 'white',
    fontSize: 24,
    textAlign: "center",
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
