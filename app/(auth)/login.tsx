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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const login = useAuthStore((state) => state.login);
  const loginError = useAuthStore((state) => state.loginError);
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

  const handleLogin = useCallback(async () => {
    await login(email, password);
  }, [email, password, login]);

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        {!isKeyboardVisible && (
          <Animated.View style={[styles.lottieContainer, { transform: [{ translateY }], opacity }]}>
            <LottieView
              source={require('@/assets/animations/walking-robot.json')}
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
          <ThemedText style={styles.title} fontWeight="fontMedium">Login</ThemedText>
          {loginError && <ThemedText style={styles.loginError}>{loginError}</ThemedText>}
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
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    width: '100%',
    height: 360,
  },
  keyboardAvoidingView: {
    gap: 16,
    marginBottom: Platform.OS === 'android' ? 20 : 40,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  loginError: {
    color: 'red',
    textAlign: 'center',
  },
});
