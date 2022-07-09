import { app } from "../config/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export async function fetchAllProductByCategoryID(collectionName, categoryID) {
  const db = getFirestore(app);

  const col = collection(db, collectionName);
  const queryCol = query(col, where("categoryID", "==", categoryID));
  const snapshot = await getDocs(queryCol);

  const result = snapshot.docs.map((doc) => {
    return doc.data();
  });
  return result;
}
