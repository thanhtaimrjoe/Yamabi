import { app } from "../config/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export async function fetchEpisodesByID(collectionName, productID) {
  const db = getFirestore(app);

  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);

  const result = [];
  // eslint-disable-next-line
  snapshot.docs.map((doc, index) => {
    result[index] = doc.data();
    result[index].docID = doc.id;
  });
  return result;
}
