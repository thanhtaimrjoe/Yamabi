import { app } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteImageFromStorage, uploadImageToStorage } from "./storage";

export async function fetchAllProduct(collectionName) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  //set categoryName
  const result = await Promise.all(
    snapshot.docs.map(async (doc) => {
      var data = doc.data();
      var categoryName = await findCategoryNameByID(
        "category",
        data.categoryID
      );
      data.categoryName = categoryName;
      return data;
    })
  );
  return result;
}

async function findCategoryNameByID(collectionName, categoryID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("id", "==", categoryID));
  const snapshot = await getDocs(queryCol);
  var data = snapshot.docs[0].data();
  return data.name;
}

export async function fetchProductInfoByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  var data = snapshot.docs[0].data();
  data.docID = snapshot.docs[0].id;
  var categoryName = await findCategoryNameByID("category", data.categoryID);
  data.categoryName = categoryName;
  return data;
}

export async function addNewProduct(collectionName, product, file) {
  const db = getFirestore(app);
  //upload to storage
  const imageURL = await uploadImageToStorage(file, "products");
  product.image = imageURL;
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, product);
  //set docID
  product.docID = docRef.id;
  //set categoryName
  var categoryName = await findCategoryNameByID("category", product.categoryID);
  product.categoryName = categoryName;
  return product;
}

export async function deleteProduct(collectionName, product) {
  const db = getFirestore(app);
  //delete old image from storage
  deleteImageFromStorage(product.image);
  //delete doc from firestore
  const ref = doc(db, collectionName, product.docID);
  await deleteDoc(ref, product);
}

export async function updateProduct(collectionName, product, file) {
  const db = getFirestore(app);
  if (file) {
    //delete old image from storage
    deleteImageFromStorage(product.image);
    //upload to storage
    const imageURL = await uploadImageToStorage(file, "products");
    product.image = imageURL;
  }
  const ref = doc(db, collectionName, product.docID);
  await updateDoc(ref, product);
  return product;
}
