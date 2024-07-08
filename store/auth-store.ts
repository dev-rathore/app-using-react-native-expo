import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { router } from 'expo-router';
import { emailSchema, nameSchema, passwordSchema } from '@/utils/validators';
import { z } from 'zod';

interface AuthState {
  user: any;
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      login: async (email, password) => {
        try {
          emailSchema.parse(email); // Validate email using Zod
          passwordSchema.parse(password); // Validate password using Zod

          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          await AsyncStorage.setItem('token', token);
          set({ user: userCredential.user, token, error: null });

          router.replace('/(drawer)/(tabs)/home');
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map(err => err.message).join('\n');
            set({ error: errorMessage });
          } else {
            set({ error: error.message });
          }
        }
      },
      register: async (name, email, password) => {
        try {
          nameSchema.parse(name); // Validate name using Zod
          emailSchema.parse(email); // Validate email using Zod
          passwordSchema.parse(password); // Validate password using Zod

          // Check if user already exists in Firestore
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            throw new Error('A user with this email already exists');
          }

          // If user doesn't exist, create a new user with Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const token = await userCredential.user.getIdToken();
          await AsyncStorage.setItem('token', token);

          // Add user to Firestore
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            name,
            email,
          });

          set({ user: userCredential.user, token, error: null });

          router.push('/(auth)/login');
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map(err => err.message).join('\n');
            set({ error: errorMessage });
          } else {
            set({ error: error.message });
          }
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
          await AsyncStorage.removeItem('token');
          set({ user: null, token: null, error: null });

          router.replace('/');
        } catch (error: any) {
          set({ error: error.message });
        }
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
