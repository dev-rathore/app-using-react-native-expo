import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { router } from "expo-router";
import { emailSchema, nameSchema, passwordSchema } from "@/utils/validators";
import { z } from "zod";
import { FirebaseAuth, FirestoreDB } from "@/utils/firebase";

interface AuthState {
  clearError: () => void;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginError: string | null;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  registerError: string | null;
  token: string | null;
  user: any;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      error: null,
      loginError: null,
      registerError: null,
      login: async (email, password) => {
        try {
          emailSchema.parse(email); // Validate email using Zod
          passwordSchema.parse(password); // Validate password using Zod

          const userCredential = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          const token = await userCredential.user.getIdToken();
          await AsyncStorage.setItem("token", token);
          set({ user: userCredential.user, token, loginError: null });

          router.replace("/(main)/(tabs)/home");
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.errors
              .map((err) => err.message)
              .join("\n");
            set({ loginError: errorMessage });
          } else {
            set({ loginError: error.message });
          }
        }
      },
      register: async (name, email, password) => {
        try {
          nameSchema.parse(name); // Validate name using Zod
          emailSchema.parse(email); // Validate email using Zod
          passwordSchema.parse(password); // Validate password using Zod

          // Check if user already exists in Firestore
          const usersRef = collection(FirestoreDB, "users");
          const q = query(usersRef, where("email", "==", email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            throw new Error("A user with this email already exists");
          }

          // If user doesn't exist, create a new user with Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          const token = await userCredential.user.getIdToken();
          await AsyncStorage.setItem("token", token);

          // Add user to Firestore
          await setDoc(doc(FirestoreDB, "users", userCredential.user.uid), {
            name,
            email,
          });

          set({ user: userCredential.user, token, registerError: null });

          router.push("/(auth)/login");
        } catch (error: any) {
          if (error instanceof z.ZodError) {
            const errorMessage = error.errors
              .map((err) => err.message)
              .join("\n");
            set({ registerError: errorMessage });
          } else {
            set({ registerError: error.message });
          }
        }
      },
      logout: async () => {
        try {
          await signOut(FirebaseAuth);
          await AsyncStorage.removeItem("token");
          set({ user: null, token: null, error: null });

          router.replace("/(auth)/get-started");
        } catch (error: any) {
          set({ error: error.message });
        }
      },
      clearError: () => {
        set({ error: null, loginError: null, registerError: null });
      },
      token: null,
      user: null,
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
