import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    href: '/wishlist',
    label: 'Wishlist',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
];

const DrawerContent: React.FC<DrawerContentProps> = () => {
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.common.dark,
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
                paddingVertical: 8,
              }}
              fontWeight="fontBold"
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
                      backgroundColor: pathname === tab.href ? Colors.common.green : Colors.common.gray300,
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
                    <ThemedText>{tab.label}</ThemedText>
                    <Ionicons
                      name={"chevron-forward"}
                      size={24}
                      color={Colors.common.white}
                    />
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          backgroundColor: Colors.common.gray300,
          marginBottom: bottom + 20,
          paddingHorizontal: 24,
          paddingVertical: 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <ThemedText>Logout</ThemedText>
          <Ionicons
            name='log-out'
            size={24}
            color={Colors.common.white}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContentTab: {
    backgroundColor: 'gray',
    paddingHorizontal: 24,
    paddingVertical: 24,
  }
});

export default DrawerContent;
