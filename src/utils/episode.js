import { app } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { uploadImageToStorage } from "./storage";

export async function fetchEpisodesByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  const result = snapshot.docs.map((doc) => doc.data());
  return result;
}

export async function addNewEpisode(collectionName, episode, file) {
  const db = getFirestore(app);
  //upload to storage
  const imageURL = await uploadImageToStorage(file);
  episode.image = imageURL;
  const ref = doc(db, collectionName, episode.docID);
  await setDoc(ref, episode);
  return episode;
}
