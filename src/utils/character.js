import { app } from "./firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export async function fetchCharactersByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  const result = snapshot.docs.map((doc) => doc.data());
  return result;
}
