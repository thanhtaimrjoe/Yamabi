import { app } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteImageFromStorage, uploadImageToStorage } from "./storage";

export async function fetchCharactersByID(collectionName, productID) {
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

export async function addNewCharacter(collectionName, character, file, docID) {
  const db = getFirestore(app);

  //upload to storage
  const imageURL = await uploadImageToStorage(file, "characters");
  character.image = imageURL;

  const ref = doc(db, collectionName, docID);
  await setDoc(ref, character);

  //set docID
  character.docID = docID;
  return character;
}

export async function deleteCharacter(collectionName, character) {
  const db = getFirestore(app);

  //delete old image from storage
  deleteImageFromStorage(character.image);

  const ref = doc(db, collectionName, character.docID);
  await deleteDoc(ref, character);

  return character;
}

export async function updateCharacter(collectionName, character, file) {
  const db = getFirestore(app);

  if (file) {
    //delete old image from storage
    deleteImageFromStorage(character.image);
    //upload to storage
    const imageURL = await uploadImageToStorage(file, "characters");
    character.image = imageURL;
  }

  const ref = doc(db, collectionName, character.docID);
  await updateDoc(ref, character);

  return character;
}
