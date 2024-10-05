import { getFirestore } from "firebase/firestore";
import { FirebaseApp } from "./firebase";

export const FirestoreDB = getFirestore(FirebaseApp);
