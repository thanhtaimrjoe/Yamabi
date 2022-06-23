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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function getAllDocsByCollection(collectionName) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const colList = snapshot.docs.map((doc) => doc.data());
  return colList;
}

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

export async function fetchAllProduct(collectionName) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
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

export async function findCategoryNameByID(collectionName, categoryID) {
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
  return data;
}

export async function fetchEpisodesByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  const result = snapshot.docs.map((doc) => doc.data());
  return result;
}

export async function fetchCharactersByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  const result = snapshot.docs.map((doc) => doc.data());
  return result;
}

async function uploadImageToStorage(file) {
  var result = null;
  const storage = getStorage();
  const storageRef = ref(storage, `/categories/${uuidv4()}`);
  const snapshot = await uploadBytes(storageRef, file);
  result = getDownloadURL(snapshot.ref);
  return result;
}

function deleteImageFromStorage(imgURL) {
  const storage = getStorage();
  const storageRef = ref(storage, imgURL);
  deleteObject(storageRef);
}

export async function updateCategory(collectionName, category, file) {
  const db = getFirestore(app);
  if (file) {
    //delete old image from storage
    deleteImageFromStorage(category.image);
    //upload to storage
    const imageURL = await uploadImageToStorage(file);
    category.image = imageURL;
  }
  const ref = doc(db, collectionName, category.docID);
  await updateDoc(ref, category);
  return category;
}

export async function addNewCategory(collectionName, category, file) {
  const db = getFirestore(app);
  //upload to storage
  const imageURL = await uploadImageToStorage(file);
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
