import { ActivityIndicator, View } from 'react-native';

const StartScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StartScreen;
