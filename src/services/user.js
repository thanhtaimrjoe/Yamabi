import { app } from "../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export async function signIn(collectionName, user) {
  const db = getFirestore(app);

  const col = collection(db, collectionName);
  const queryCol = query(col, where("username", "==", user.username));
  const snapshot = await getDocs(queryCol);

  if (snapshot.docs.length > 0) {
    var userData = snapshot.docs[0].data();
    if (userData.password === user.password) {
      return snapshot.docs[0].data();
    } else {
      return "Not Found";
    }
  } else {
    return "Not Found";
  }
}

export async function signUp(collectionName, newUser) {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  await addDoc(ref, newUser);
  return newUser;
}
