import { app } from "../config/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export async function fetchAllProduct(collectionName) {
  const db = getFirestore(app);

  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);

  const result = snapshot.docs.map((doc) => {
    return doc.data();
  });
  return result;
}
