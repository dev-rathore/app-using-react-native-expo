import { Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/auth-store";
import { useColorScheme } from "@/hooks/useColorScheme";

interface DrawerContentProps {}

const DRAWER_CONTENT_TABS = [
  {
    href: '/home',
    label: 'Home',
  },
  {
    href: '/explore',
    label: 'Explore',
  },
  {
    href: '/reel',
    label: 'Reel',
  },
  {
    href: '/teddy',
    label: 'Teddy',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
];

const DrawerContent: React.FC<DrawerContentProps> = () => {
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();
  const logout = useAuthStore((state) => state.logout);
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme].background,
      }}
    >
      <DrawerContentScrollView>
        <View
          style={{
            flex: 1,
            gap: 6,
          }}
        >
          <View>
            <ThemedText
              style={{
                paddingHorizontal: 24,
                paddingTop: 8,
                paddingBottom: 16,
              }}
              fontWeight="fontBold"
              type="textXl"
            >
              React Native App
            </ThemedText>
          </View>
          <View
            style={{
              gap: 8,
            }}
          >
            {
              DRAWER_CONTENT_TABS.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    router.push(tab.href);
                  }}
                  style={[
                    styles.drawerContentTab,
                    {
                      backgroundColor: pathname === tab.href ? Colors.common.green : Colors[colorScheme].accent300,
                    }
                  ]}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ThemedText
                      darkColor={pathname === tab.href ? Colors.common.white : Colors[colorScheme].tint}
                      lightColor={pathname === tab.href ? Colors.common.white : Colors[colorScheme].tint}
                    >
                      {tab.label}
                    </ThemedText>
                    <Ionicons
                      name={"chevron-forward"}
                      size={24}
                      color={pathname === tab.href ? Colors.common.white : Colors[colorScheme].tint}
                    />
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </DrawerContentScrollView>
      <TouchableWithoutFeedback
        onPress={logout}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: bottom + Platform.OS === 'android' ? 24 : 64,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
            }}
          >
            <ThemedText
              darkColor={Colors.common.white}
              lightColor={Colors.common.green}
            >
              Logout
            </ThemedText>
            <Ionicons
              name='log-out'
              size={24}
              color={colorScheme === 'dark' ? Colors.common.white : Colors.common.green}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContentTab: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  }
});

export default DrawerContent;
