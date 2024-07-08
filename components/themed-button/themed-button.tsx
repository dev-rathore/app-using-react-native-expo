import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureResponderEvent, Platform, Text, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View, ViewProps } from "react-native";

interface ThemedButtonProps extends ViewProps, TouchableWithoutFeedbackProps {
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  label?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  alignSelf = 'center',
  label,
  onPress,
  ...props
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View
        style={{
          alignSelf,
          backgroundColor: Colors[colorScheme].tint,
          borderRadius: 25, 
          paddingHorizontal: 30,
          paddingVertical: Platform.OS === 'android' ? 8 : 14,
        }}
        {...props}
      >
        {
          label ? (
            <Text
              style={{
                color: Colors[colorScheme].background,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              {label}
            </Text>
          ) : (
            <>
              {props.children}
            </>
          )
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ThemedButton;
