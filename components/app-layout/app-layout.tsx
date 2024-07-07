import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

const AppLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const isAndroid = Platform.OS === "android";
  const lightColor = Colors.light.background;
  const darkColor = Colors.dark.background;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        paddingTop: isAndroid ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
};

export default AppLayout;
