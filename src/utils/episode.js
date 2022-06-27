import { app } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { deleteImageFromStorage, uploadImageToStorage } from "./storage";

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

export async function addNewEpisode(collectionName, episode, file, docID) {
  const db = getFirestore(app);
  //upload to storage
  const imageURL = await uploadImageToStorage(file);
  episode.image = imageURL;
  const ref = doc(db, collectionName, docID);
  await setDoc(ref, episode);
  //set docID
  episode.docID = docID;
  return episode;
}

export async function deleteEpisode(collectionName, episode) {
  const db = getFirestore(app);
  //delete old image from storage
  deleteImageFromStorage(episode.image);

  //delete doc from firestore
  const ref = doc(db, collectionName, episode.docID);
  await deleteDoc(ref, episode);
  return episode;
}
