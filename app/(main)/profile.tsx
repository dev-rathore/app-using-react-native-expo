import AppLayout from "@/components/app-layout/app-layout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FirebaseAuth } from '@/utils/firebase/auth';
import { getUserProfile } from '@/services/user-service';
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Alert, Platform, View } from "react-native";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(FirebaseAuth.currentUser?.uid || '');
        setProfile(profileData);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AppLayout>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: Platform.OS === 'android' ? 24 : 48,
        }}
      >
        {profile ? (
          <View>
            <ThemedView style={{ flexDirection: 'row' }}>
              <ThemedText type='textLg'>Hi {profile.name},</ThemedText>
            </ThemedView>
            <ThemedView style={{ flexDirection: 'row' }}>
              <ThemedText type='textLg'>Your Email Id is {profile.email}.</ThemedText>
            </ThemedView>
          </View>
        ) : (
          <ThemedText>Loading...</ThemedText>
        )}
      </View>
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <LottieView
          source={require('@/assets/animations/pokemon.json')}
          autoPlay
          style={{
            width: '100%',
            height: 360,
          }}
          loop
        />
      </ThemedView>
    </AppLayout>
  );
};

export default Profile;
