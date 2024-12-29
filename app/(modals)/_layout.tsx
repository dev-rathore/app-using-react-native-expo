import { Stack, useRouter } from "expo-router";
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ModalHeaderText from '@/screens/explore/ModalHeaderText';
import { Colors } from '@/constants/Colors';

const ModalsStackLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="booking"
        options={{
          presentation: 'modal',
          animation: 'fade',
          headerTransparent: true,
          headerTitle: (props) => <ModalHeaderText />,
          headerLeft: () => (
            Platform.OS === 'ios' && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: '#fff',
                  borderColor: Colors.common.gray,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            )
          ),
        }}
      />
    </Stack>
  );
};

export default ModalsStackLayout;
