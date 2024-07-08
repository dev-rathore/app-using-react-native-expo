import { Colors } from "@/constants/Colors";

import { useState } from "react";
import { Platform, StyleSheet, TextInput, TextInputProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ThemedTextInputProps extends TextInputProps {}

const ThemedTextInput:React.FC<ThemedTextInputProps> = ({
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderColor = isFocused ? Colors.common.yellow : Colors.common.gray;

  const colorScheme = useColorScheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor,
          color: Colors[colorScheme].tint,
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={Colors.common.gray}
      {...props}
    />
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'android' ? 8 : 14,
  },
});
