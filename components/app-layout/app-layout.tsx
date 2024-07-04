import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const AppLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const isAndroid = Platform.OS === "android";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: isAndroid ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

export default AppLayout;
