import { FirestoreDB } from "@/utils/firebase/db";
import { doc, getDoc } from "firebase/firestore";

export const getUserProfile = async (userId: string) => {
  try {
    const userDocRef = doc(FirestoreDB, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      // Ensure to filter out sensitive information like password if present
      if (userData && userData.password) {
        delete userData.password;
      }
      return userData;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
