import { Colors } from "@/constants/Colors";
import { Text, TouchableHighlight, TouchableHighlightProps } from "react-native";

interface ThemedTouchableHighlightProps extends TouchableHighlightProps {
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

const ThemedTouchableHighlight: React.FC<ThemedTouchableHighlightProps> = ({
  alignSelf = 'center',
  ...props
}) => {
  return (
    <TouchableHighlight
      style={{
        alignSelf,
        backgroundColor: Colors.common.green,
        borderRadius: 25, 
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      underlayColor={Colors.common.green}
      {...props}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {props.children}
      </Text>
    </TouchableHighlight>
  );
};

export default ThemedTouchableHighlight;
