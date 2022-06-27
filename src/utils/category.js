import { app } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { deleteImageFromStorage, uploadImageToStorage } from "./storage";

export async function fetchAllCategory(collectionName) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  var result = [];
  // eslint-disable-next-line
  snapshot.docs.map((doc, index) => {
    result[index] = doc.data();
    result[index].docID = doc.id;
  });
  return result;
}

export async function updateCategory(collectionName, category, file) {
  const db = getFirestore(app);
  if (file) {
    //delete old image from storage
    deleteImageFromStorage(category.image);
    //upload to storage
    const imageURL = await uploadImageToStorage(file, "categories");
    category.image = imageURL;
  }
  const ref = doc(db, collectionName, category.docID);
  await updateDoc(ref, category);
  return category;
}

export async function addNewCategory(collectionName, category, file) {
  const db = getFirestore(app);
  //upload to storage
  const imageURL = await uploadImageToStorage(file, "categories");
  category.image = imageURL;
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, category);
  category.docID = docRef.id;
  return category;
}

export async function deleteCategory(collectionName, category) {
  const db = getFirestore(app);
  //delete old image from storage
  deleteImageFromStorage(category.image);
  //delete doc from firestore
  const ref = doc(db, collectionName, category.docID);
  await deleteDoc(ref, category);
  return category;
}
