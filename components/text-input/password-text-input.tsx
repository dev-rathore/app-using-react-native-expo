import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface PasswordTextInputProps extends TextInputProps {
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: ((event: GestureResponderEvent) => void) | undefined;
};

const PasswordTextInput: React.FC<PasswordTextInputProps> = ({
  isPasswordVisible,
  togglePasswordVisibility,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderColor = isFocused ? Colors.common.yellow : Colors.common.gray;
  
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.passwordInputContainer,
        {
          borderColor,
        }
      ]}
    >
      <TextInput
        style={[
          styles.passwordInput,
          {
            color: Colors[colorScheme].tint,
          }
        ]}
        placeholderTextColor={Colors.common.gray}
        textContentType={'oneTimeCode'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableWithoutFeedback onPress={togglePasswordVisibility} style={styles.toggleButton}>
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={20}
          color={'gray'}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PasswordTextInput;

const styles = StyleSheet.create({
  passwordInput: {
    flex: 1,
  },
  passwordInputContainer: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'android' ? 8 : 14,
  },
  toggleButton: {
    paddingHorizontal: 5,
  },
});
