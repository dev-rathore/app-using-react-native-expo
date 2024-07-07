import { Drawer } from "expo-router/drawer";
import DrawerContent from "@/components/drawer-content/drawer-content";

const DrawerLayout = () => {
  return (
    <Drawer
      backBehavior="history"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="wishlist"
        options={{
          headerShown: true,
          title: 'Wishlist',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
