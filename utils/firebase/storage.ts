import { getStorage } from "firebase/storage";
import { FirebaseApp } from "./firebase";

export const FirebaseStorage = getStorage(FirebaseApp);
