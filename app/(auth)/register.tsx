import React, { useState, useEffect, useCallback, useRef } from "react";
import { KeyboardAvoidingView, Keyboard, Platform, StyleSheet, Animated } from "react-native";
import AppLayout from "@/components/app-layout/app-layout";
import PasswordTextInput from "@/components/text-input/password-text-input";
import ThemedTextInput from "@/components/text-input/text-input";
import ThemedButton from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store/auth-store";
import LottieView from "lottie-react-native";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const register = useAuthStore((state) => state.register);
  const registerError = useAuthStore((state) => state.registerError);
  const clearError = useAuthStore((state) => state.clearError);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        Animated.timing(translateY, {
          toValue: -200,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
          setIsKeyboardVisible(false);
        });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY, opacity]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prevState) => !prevState);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }, []);

  const handleRegister = useCallback(async () => {
    if (password !== confirmPassword) {
      useAuthStore.setState({ registerError: 'Passwords do not match' });
      return;
    }

    await register(name, email, password);
  }, [name, email, password, confirmPassword, register]);

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        {!isKeyboardVisible && (
          <Animated.View style={[styles.lottieContainer, { transform: [{ translateY }], opacity }]}>
            <LottieView
              source={require('@/assets/animations/thinking-robot.json')}
              autoPlay
              style={styles.lottie}
              loop
            />
          </Animated.View>
        )}
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
        >
          <ThemedText style={styles.title} fontWeight="fontMedium">Register</ThemedText>
          {registerError && <ThemedText style={styles.registerError}>{registerError}</ThemedText>}
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
            alignSelf="stretch"
            label='Register'
            onPress={handleRegister}
          />
        </KeyboardAvoidingView>
      </ThemedView>
    </AppLayout>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    width: '100%',
    height: 300,
  },
  keyboardAvoidingView: {
    gap: 16,
    marginBottom: Platform.OS === 'android' ? 20 : 40,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  registerError: {
    color: 'red',
    textAlign: 'center',
  },
});
