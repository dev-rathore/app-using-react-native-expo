import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface ThemedTextInputProps extends TextInputProps {}

const ThemedTextInput:React.FC<ThemedTextInputProps> = ({
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const borderColor = isFocused ? Colors.common.yellow : Colors.common.gray;

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor,
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={'#EEEEEE'}
      {...props}
    />
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.common.gray300,
    borderRadius: 25,
    borderWidth: 1,
    color: 'white',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
