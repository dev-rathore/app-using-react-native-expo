import { Drawer } from "expo-router/drawer";
import DrawerContent from "@/components/drawer-content/drawer-content";

const DrawerLayout = () => {
  return (
    <Drawer
      backBehavior="history"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="teddy"
        options={{
          headerShown: true,
          title: 'Teddy',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="listing/[id]"
        options={{
          headerTitle: ''
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
