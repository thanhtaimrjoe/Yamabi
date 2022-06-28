import { app } from "./firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
export async function checkUser(collectionName, user) {
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
