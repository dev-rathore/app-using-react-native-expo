import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { auth } from '@/config/firebase';
import { getUserProfile } from '@/services/user-service';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import { Colors } from '@/constants/Colors';

const Settings: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(auth.currentUser?.uid || '');
        setProfile(profileData);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AppLayout>
      <ThemedView
        style={styles.container}
        darkColor={Colors.dark.background}
      >
        {profile ? (
          <>
            <Text style={{ color: 'white' }}>Name: {profile.name}</Text>
            <Text style={{ color: 'white' }}>Email: {profile.email}</Text>
          </>
        ) : (
          <Text style={{ color: 'white' }}>Loading...</Text>
        )}
        <Button title="Logout" onPress={logout} />
      </ThemedView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Settings;
