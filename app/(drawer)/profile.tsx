import AppLayout from "@/components/app-layout/app-layout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Profile = () => {
  return (
    <AppLayout>
      <ThemedView>
        <ThemedText>Profile</ThemedText>
      </ThemedView>
    </AppLayout>
  );
};

export default Profile;
