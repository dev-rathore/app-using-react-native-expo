import { useStorageState } from "@/hooks";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useRouter } from "expo-router";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { User } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseAuth, FirestoreDB } from "@/utils/firebase";

interface AuthContextProps {
  getUser: (userId: string) => Promise<User | null>;
  isLoading: boolean;
  session?: string | null;
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  signUp: (name: string, email: string, password: string) => void;
  updateUser: (userId: string, user: Partial<User>) => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  getUser: () => Promise.resolve(null),
  isLoading: false,
  session: null,
  signIn: (email: string, password: string) => null,
  signOutUser: () => null,
  signUp: (name: string, email: string, password: string) => null,
  updateUser: () => Promise.resolve(),
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[isLoading, session], setSession] = useStorageState("id");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    if (session) {
      const userDocRef = doc(FirestoreDB, "users", session);

      const unsubscribe = onSnapshot(userDocRef, (userSnap) => {
        if (userSnap.exists()) {
          const userData = {
            ...(userSnap.data() as User),
            id: userSnap.id as string,
          };
          setUser(userData);
        } else {
          console.error("User not found");
        }
      });

      return unsubscribe;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      setSession(userCredential.user.uid);

      // For existing users, redirect to the main dashboard screen.
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );

      await setDoc(doc(FirestoreDB, "users", userCredential.user.uid), {
        name,
        email,
        phoneNumber: "",
        profileImage: "",
        settings: {
          emailNotifications: true,
          pushNotifications: true,
          theme: "light",
        },
      });

      setSession(userCredential.user.uid);

      // For non-existing users, redirect to the onboarding screen.
      router.replace("/onboard");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const signOutUser = () => {
    signOut(FirebaseAuth)
      .then(() => {
        setSession("");

        router.replace("/pre-signin");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const getUser = async (userId: string): Promise<User | null> => {
    const userRef = doc(FirestoreDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = {
        ...(userSnap.data() as User),
        id: userSnap.id as string,
      };
      setUser(userData);
      return userData;
    }

    return null;
  };

  const updateUser = async (
    userId: string,
    user: Partial<User>
  ): Promise<void> => {
    const userRef = doc(FirestoreDB, "users", userId);

    await updateDoc(userRef, {
      ...user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        getUser,
        isLoading,
        session,
        signIn,
        signOutUser,
        signUp,
        updateUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
